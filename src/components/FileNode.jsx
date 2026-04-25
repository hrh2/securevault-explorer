import { useRef, useEffect } from "react";
import FileIcon from "./FileIcon";

/**
 * FileNode — The core recursive component.
 *
 * This component renders a single file or folder node.
 * For folders, it recursively renders its children by calling
 * FileNode again for each child — enabling infinite nesting depth
 * with zero hardcoded levels.
 *
 * Recursion pattern:
 *   FileNode (folder) → maps children → FileNode (child) → ...
 */
export default function FileNode({
  node,
  depth,
  expandedIds,
  selectedId,
  focusedId,
  nodeRefs,
  searchQuery,
  theme,
  onToggle,
  onSelect,
  onFocus,
}) {
  const isFolder = node.type === "folder";
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const isFocused = focusedId === node.id;
  const ref = useRef(null);

  // Register this DOM node so keyboard nav can scroll to it
  useEffect(() => {
    if (ref.current) nodeRefs.current[node.id] = ref.current;
    return () => { delete nodeRefs.current[node.id]; };
  }, [node.id, nodeRefs]);

  // Highlight matching search text
  const renderName = () => {
    if (!searchQuery || !node._matchedSelf) return node.name;
    const q = searchQuery.toLowerCase();
    const idx = node.name.toLowerCase().indexOf(q);
    if (idx === -1) return node.name;
    return (
      <>
        {node.name.slice(0, idx)}
        <mark className="bg-yellow-400/30 text-yellow-300 rounded px-0.5 not-italic">
          {node.name.slice(idx, idx + searchQuery.length)}
        </mark>
        {node.name.slice(idx + searchQuery.length)}
      </>
    );
  };

  const handleClick = () => {
    onFocus(node.id);
    if (isFolder) onToggle(node.id);
    else onSelect(node);
  };

  const paddingLeft = depth * 16 + 8;

  return (
    <li className="select-none list-none">
      {/* Node row */}
      <div
        ref={ref}
        role={isFolder ? "treeitem" : "treeitem"}
        aria-selected={isSelected}
        aria-expanded={isFolder ? isExpanded : undefined}
        tabIndex={isFocused ? 0 : -1}
        className={[
          "flex items-center gap-2 py-[5px] pr-3 cursor-pointer rounded-sm transition-all duration-100",
          "text-sm font-mono",
          theme.nodeHover,
          isSelected ? theme.nodeSelected : "",
          isFocused && !isSelected ? theme.nodeFocused : "",
          !isSelected && !isFocused ? "border-l-2 border-transparent" : "",
        ].join(" ")}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={handleClick}
        onFocus={() => onFocus(node.id)}
      >
        {/* Expand/collapse chevron for folders */}
        {isFolder ? (
          <span
            className={[
              "transition-transform duration-150 shrink-0 opacity-60",
              isExpanded ? "rotate-90" : "rotate-0",
            ].join(" ")}
            style={{ fontSize: 10 }}
          >
            ▶
          </span>
        ) : (
          <span className="w-[10px] shrink-0" />
        )}

        {/* Icon */}
        <span className={isFolder ? theme.textAccent : ""}>
          <FileIcon node={node} isExpanded={isExpanded} size={15} />
        </span>

        {/* Name */}
        <span
          className={[
            "truncate leading-none",
            isFolder ? `font-semibold ${theme.text}` : theme.text,
            isSelected ? theme.textAccent : "",
          ].join(" ")}
        >
          {renderName()}
        </span>

        {/* File size badge */}
        {!isFolder && node.size && (
          <span className={`ml-auto text-xs px-1.5 py-0.5 rounded font-sans shrink-0 ${theme.badge}`}>
            {node.size}
          </span>
        )}

        {/* Empty folder indicator */}
        {isFolder && (!node.children || node.children.length === 0) && (
          <span className={`ml-auto text-xs ${theme.textMuted} font-sans`}>empty</span>
        )}
      </div>

      {/* ↓ RECURSION: Render children if folder is expanded */}
      {isFolder && isExpanded && node.children?.length > 0 && (
        <ul role="group" className="relative">
          {/* Vertical indent guide line */}
          <div
            className={`absolute top-0 bottom-0 border-l ${theme.divider} opacity-40`}
            style={{ left: `${paddingLeft + 13}px` }}
          />
          {node.children.map((child) => (
            <FileNode
              key={child.id}
              node={child}
              depth={depth + 1}   /* ← increment depth for next level */
              expandedIds={expandedIds}
              selectedId={selectedId}
              focusedId={focusedId}
              nodeRefs={nodeRefs}
              searchQuery={searchQuery}
              theme={theme}
              onToggle={onToggle}
              onSelect={onSelect}
              onFocus={onFocus}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
