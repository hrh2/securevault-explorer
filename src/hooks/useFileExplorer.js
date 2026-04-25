import { useState, useCallback, useRef } from "react";
import { flattenVisibleTree, findAncestors, searchTree, collectAllFolderIds } from "../utils/treeUtils";
import fileSystem from "../data/fileSystem";

/**
 * Central state management hook for the file explorer.
 * Manages: expanded folders, selected file, focused node, search query.
 */
export function useFileExplorer() {
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [selectedId, setSelectedId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const nodeRefs = useRef({});

  // Derive the active tree (filtered or full)
  const activeTree = searchQuery ? searchTree(fileSystem, searchQuery) : fileSystem;

  // When searching, auto-expand all matching folder parents
  const searchExpandedIds = searchQuery
    ? collectAllFolderIds(activeTree)
    : expandedIds;

  const effectiveExpandedIds = searchQuery ? searchExpandedIds : expandedIds;

  // Toggle a folder open/closed
  const toggleFolder = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Select a file and reveal its path
  const selectFile = useCallback((node) => {
    setSelectedId(node.id);
    setFocusedId(node.id);
    // Expand all ancestors to reveal the file
    const ancestors = findAncestors(fileSystem, node.id);
    if (ancestors?.length) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        ancestors.forEach((id) => next.add(id));
        return next;
      });
    }
  }, []);

  // Full keyboard navigation handler
  const handleKeyDown = useCallback(
    (e) => {
      const visibleNodes = flattenVisibleTree(activeTree, effectiveExpandedIds);
      const currentIndex = visibleNodes.findIndex((n) => n.id === focusedId);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex = Math.min(currentIndex + 1, visibleNodes.length - 1);
          const nextNode = visibleNodes[nextIndex];
          if (nextNode) {
            setFocusedId(nextNode.id);
            nodeRefs.current[nextNode.id]?.scrollIntoView({ block: "nearest" });
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prevIndex = Math.max(currentIndex - 1, 0);
          const prevNode = visibleNodes[prevIndex];
          if (prevNode) {
            setFocusedId(prevNode.id);
            nodeRefs.current[prevNode.id]?.scrollIntoView({ block: "nearest" });
          }
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          const rightNode = visibleNodes[currentIndex];
          if (rightNode?.type === "folder" && !effectiveExpandedIds.has(rightNode.id)) {
            if (!searchQuery) toggleFolder(rightNode.id);
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const leftNode = visibleNodes[currentIndex];
          if (leftNode?.type === "folder" && effectiveExpandedIds.has(leftNode.id)) {
            if (!searchQuery) toggleFolder(leftNode.id);
          }
          break;
        }
        case "Enter": {
          e.preventDefault();
          const enterNode = visibleNodes[currentIndex];
          if (enterNode?.type === "file") selectFile(enterNode);
          else if (enterNode?.type === "folder" && !searchQuery) toggleFolder(enterNode.id);
          break;
        }
        default:
          break;
      }
    },
    [focusedId, effectiveExpandedIds, activeTree, searchQuery, toggleFolder, selectFile]
  );

  return {
    fileSystem,
    activeTree,
    expandedIds,
    effectiveExpandedIds,
    selectedId,
    focusedId,
    searchQuery,
    nodeRefs,
    setSearchQuery,
    toggleFolder,
    selectFile,
    setFocusedId,
    handleKeyDown,
  };
}
