import { buildBreadcrumbPath } from "../utils/treeUtils";
import fileSystem from "../data/fileSystem";

/**
 * Breadcrumb Navigation
 *
 * Dynamically computes the full path from root to the selected file
 * using recursive tree traversal. Updates instantly on any selection.
 *
 * UX benefit: In deeply nested structures, users can lose track of
 * where a file lives. Breadcrumbs provide constant spatial orientation.
 */
export default function Breadcrumb({ selectedId, theme }) {
  if (!selectedId) {
    return (
      <div className={`flex items-center gap-1.5 text-xs font-mono px-4 py-2 border-b ${theme.divider} ${theme.textMuted}`}>
        <span>Home</span>
      </div>
    );
  }

  const path = buildBreadcrumbPath(fileSystem, selectedId) || [];

  return (
    <div className={`flex items-center gap-1 text-xs font-mono px-4 py-2 border-b ${theme.divider} overflow-x-auto whitespace-nowrap`}>
      <span className={theme.textMuted}>Home</span>
      {path.map((segment, i) => (
        <span key={segment.id} className="flex items-center gap-1">
          <span className={`mx-1 ${theme.textMuted}`}>/</span>
          <span
            className={
              i === path.length - 1
                ? `${theme.textAccent} font-semibold`
                : theme.textMuted
            }
          >
            {segment.name}
          </span>
        </span>
      ))}
    </div>
  );
}
