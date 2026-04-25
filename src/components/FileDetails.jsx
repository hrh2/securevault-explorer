import { getFileExtension, getFileTypeColor, buildBreadcrumbPath } from "../utils/treeUtils";
import fileSystem from "../data/fileSystem";

function StatRow({ label, value, theme }) {
  return (
    <div className={`flex items-start justify-between py-3 border-b ${theme.divider} last:border-0`}>
      <span className={`text-xs uppercase tracking-widest font-sans ${theme.textMuted}`}>{label}</span>
      <span className={`text-sm font-mono ${theme.text} text-right ml-4 break-all`}>{value}</span>
    </div>
  );
}

/**
 * FileDetails Panel — Shows metadata of the selected file.
 * Updates dynamically whenever selection changes.
 */
export default function FileDetails({ selectedNode, theme }) {
  if (!selectedNode) {
    return (
      <div className={`h-full flex flex-col items-center justify-center gap-4 p-8 ${theme.textMuted}`}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.3">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M12 18V12M9 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="text-xs font-mono text-center">Select a file to view details</p>
      </div>
    );
  }

  const ext = getFileExtension(selectedNode.name);
  const typeColor = getFileTypeColor(selectedNode.name);
  const path = buildBreadcrumbPath(fileSystem, selectedNode.id) || [];
  const pathString = ["Home", ...path.map((p) => p.name)].join(" / ");

  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* File header */}
      <div className={`p-5 border-b ${theme.divider}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg border ${typeColor} shrink-0`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className={`font-mono font-semibold text-sm break-all leading-tight ${theme.text}`}>
              {selectedNode.name}
            </h3>
            <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border font-mono ${typeColor}`}>
              .{ext}
            </span>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-5 flex-1">
        <p className={`text-xs uppercase tracking-widest font-sans mb-3 ${theme.textMuted}`}>Metadata</p>
        <div>
          <StatRow label="Name" value={selectedNode.name} theme={theme} />
          <StatRow label="Type" value={`.${ext} File`} theme={theme} />
          <StatRow label="Size" value={selectedNode.size || "—"} theme={theme} />
          <StatRow label="ID" value={selectedNode.id} theme={theme} />
        </div>

        {/* Path */}
        <div className="mt-6">
          <p className={`text-xs uppercase tracking-widest font-sans mb-2 ${theme.textMuted}`}>Full Path</p>
          <div className={`text-xs font-mono p-3 rounded-lg break-all ${theme.badge} leading-relaxed`}>
            {pathString}
          </div>
        </div>

        {/* Security badge */}
        <div className={`mt-6 p-3 rounded-lg border ${theme.divider} flex items-center gap-3`}>
          <div className="text-emerald-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-mono text-emerald-400">Verified & Encrypted</p>
            <p className={`text-xs font-sans ${theme.textMuted} mt-0.5`}>AES-256 protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
