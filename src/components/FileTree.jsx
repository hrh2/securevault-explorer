import FileNode from "./FileNode";

/**
 * FileTree — Wraps the root list and handles keyboard events.
 * Renders top-level nodes, each of which recursively renders its children.
 */
export default function FileTree({
  nodes,
  expandedIds,
  selectedId,
  focusedId,
  nodeRefs,
  searchQuery,
  theme,
  onToggle,
  onSelect,
  onFocus,
  onKeyDown,
}) {
  return (
    <ul
      role="tree"
      aria-label="File system tree"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none py-1"
    >
      {nodes.length === 0 ? (
        <li className={`px-4 py-6 text-xs font-mono text-center ${theme.textMuted}`}>
          No results found
        </li>
      ) : (
        nodes.map((node) => (
          <FileNode
            key={node.id}
            node={node}
            depth={0}
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
        ))
      )}
    </ul>
  );
}
