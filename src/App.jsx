import { useMemo } from "react";
import { useFileExplorer } from "./hooks/useFileExplorer";
import { useTheme } from "./hooks/useTheme";
import FileTree from "./components/FileTree";
import FileDetails from "./components/FileDetails";
import Breadcrumb from "./components/Breadcrumb";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";

function findNodeById(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.type === "folder" && node.children?.length) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function countFiles(nodes) {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "file") count++;
    if (node.type === "folder" && node.children) count += countFiles(node.children);
  }
  return count;
}

export default function App() {
  const {
    fileSystem, activeTree, effectiveExpandedIds,
    selectedId, focusedId, searchQuery, nodeRefs,
    setSearchQuery, toggleFolder, selectFile, setFocusedId, handleKeyDown,
  } = useFileExplorer();

  const { themeName, setThemeName, theme } = useTheme();

  const selectedNode = useMemo(
    () => (selectedId ? findNodeById(fileSystem, selectedId) : null),
    [selectedId, fileSystem]
  );

  const totalFiles = useMemo(() => countFiles(fileSystem), [fileSystem]);
  const visibleFiles = useMemo(() => countFiles(activeTree), [activeTree]);

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden font-sans ${theme.root} transition-colors duration-200`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-5 py-3 border-b ${theme.header} backdrop-blur-md z-10 shrink-0`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 ${theme.textAccent}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-mono font-bold tracking-tight text-sm">SecureVault</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded font-mono ${theme.badge}`}>Enterprise</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle themeName={themeName} setThemeName={setThemeName} theme={theme} />
          <div className={`h-5 w-px ${theme.divider}`} />
          <span className={`text-xs font-mono ${theme.textMuted}`}>
            {searchQuery ? `${visibleFiles} / ${totalFiles} files` : `${totalFiles} files`}
          </span>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-72 flex flex-col border-r shrink-0 ${theme.sidebar} transition-colors duration-200`}>
          <div className={`p-3 border-b ${theme.divider} shrink-0`}>
            <SearchBar query={searchQuery} onChange={setSearchQuery} theme={theme} />
          </div>
          <div className={`px-4 py-2.5 flex items-center justify-between border-b ${theme.divider} shrink-0`}>
            <span className={`text-xs uppercase tracking-widest font-sans ${theme.textMuted}`}>Explorer</span>
            <span className={`text-xs font-mono ${theme.textMuted}`}>↑↓ ←→ nav</span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-1">
            <FileTree
              nodes={activeTree}
              expandedIds={effectiveExpandedIds}
              selectedId={selectedId}
              focusedId={focusedId}
              nodeRefs={nodeRefs}
              searchQuery={searchQuery}
              theme={theme}
              onToggle={toggleFolder}
              onSelect={selectFile}
              onFocus={setFocusedId}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={`px-4 py-2 border-t ${theme.divider} shrink-0`}>
            <p className={`text-xs font-mono ${theme.textMuted} truncate`}>
              {selectedNode ? `Selected: ${selectedNode.name}` : "No file selected"}
            </p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Breadcrumb selectedId={selectedId} theme={theme} />
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-8">
              {selectedNode ? (
                <div className="max-w-md w-full text-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${theme.divider} ${theme.textMuted} text-sm font-mono`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    File selected
                  </div>
                  <h2 className={`text-2xl font-mono font-bold ${theme.text} mb-2 break-all`}>{selectedNode.name}</h2>
                  <p className={`text-sm font-sans ${theme.textMuted}`}>View full metadata in the details panel →</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className={`${theme.textMuted} mb-6 opacity-30`}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto">
                      <path d="M3 7C3 5.9 3.9 5 5 5H10L12 7H19C20.1 7 21 7.9 21 9V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className={`text-xl font-mono font-semibold ${theme.text} mb-2`}>SecureVault Explorer</h2>
                  <p className={`text-sm font-sans ${theme.textMuted} max-w-xs mx-auto`}>Browse and select files from the tree. Use keyboard arrows to navigate.</p>
                  <div className={`mt-8 grid grid-cols-2 gap-3 max-w-xs mx-auto text-xs font-mono ${theme.textMuted}`}>
                    {[["↑ ↓","Navigate"],["→","Expand folder"],["←","Collapse folder"],["↵","Select file"]].map(([key,label]) => (
                      <div key={key} className={`flex items-center gap-2 px-3 py-2 rounded border ${theme.divider}`}>
                        <span className={`${theme.textAccent} font-bold`}>{key}</span>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <aside className={`w-72 border-l shrink-0 ${theme.panel} transition-colors duration-200`}>
              <div className={`px-5 py-3 border-b ${theme.divider}`}>
                <span className={`text-xs uppercase tracking-widest font-sans ${theme.textMuted}`}>File Details</span>
              </div>
              <div className="overflow-auto" style={{height: "calc(100% - 45px)"}}>
                <FileDetails selectedNode={selectedNode} theme={theme} />
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Status bar */}
      <footer className={`flex items-center justify-between px-5 py-1.5 border-t ${theme.divider} shrink-0`}>
        <div className="flex items-center gap-4">
          <span className={`text-xs font-mono ${theme.textMuted}`}>
            <span className="text-emerald-400">●</span> SecureVault v2.4.1 &copy; 2026 Hope HIRWA RUKUNDO
          </span>
          {searchQuery && (
            <span className={`text-xs font-mono ${theme.textMuted}`}>
              Showing {visibleFiles} of {totalFiles} files
            </span>
          )}
        </div>
        <span className={`text-xs font-mono ${theme.textMuted} capitalize`}>Theme: {themeName}</span>
      </footer>
    </div>
  );
}
