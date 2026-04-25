import { getFileExtension } from "../utils/treeUtils";

/**
 * Renders a contextual SVG icon based on file/folder type.
 */
export default function FileIcon({ node, isExpanded, size = 16 }) {
  if (node.type === "folder") {
    return isExpanded ? (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M3 7C3 5.9 3.9 5 5 5H10L12 7H19C20.1 7 21 7.9 21 9V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 11H21" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ) : (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M3 7C3 5.9 3.9 5 5 5H10L12 7H19C20.1 7 21 7.9 21 9V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    );
  }

  const ext = getFileExtension(node.name).toLowerCase();

  if (ext === "pdf") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-red-400">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12H16M8 8H16M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="4" y="22" fontSize="5" fill="currentColor" fontWeight="bold"></text>
      </svg>
    );
  }
  if (["png", "jpg", "jpeg", "svg", "gif", "webp"].includes(ext)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-purple-400">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
        <path d="M21 15L16 10L11 15L8 12L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (["xlsx", "xls", "csv"].includes(ext)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-emerald-400">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 10H16M8 14H16M8 18H16M12 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (["docx", "doc"].includes(ext)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-blue-400">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 8H16M8 12H16M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (["yaml", "yml", "json", "js", "ts", "py"].includes(ext)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-orange-400">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 8L11 12L8 16M13 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (["txt", "md", "log"].includes(ext)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-slate-400">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 8H16M8 12H16M8 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (["ttf", "otf", "woff"].includes(ext)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-indigo-400">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 8H17M12 8V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }

  // Generic file
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 text-slate-400">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}
