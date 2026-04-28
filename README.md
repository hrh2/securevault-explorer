# SecureVault Explorer

> A production-grade enterprise file explorer UI built with React + Tailwind CSS, featuring recursive tree rendering, full keyboard navigation, dynamic breadcrumbs, live search, and a 4-theme system.

---

## Design File

Figma: https://www.figma.com/design/hvRFeZXsl9YUi5PNosBs3n/securevault-Explorer?node-id=0-1&t=EVxYS24ZR2qF7518-1

Includes:
- Typography scale
- Color palette
- Spacing system
- Component states
- Dark mode design system

## Features

| Feature | Description |
|---|---|
| **Recursive Tree** | Infinite-depth folder nesting via self-calling `FileNode` component |
| **Keyboard Navigation** | Full Arrow / Enter key navigation with flattened visible tree |
| **Breadcrumb Navigation** | Live path display — updates instantly on file selection |
| **Live Search** | Filters tree in real time, auto-expands matching folders, highlights matches |
| **File Details Panel** | Name, type, size, ID, full path, and security status |
| **4 Themes** | Dark (default), Light, Midnight (indigo), Matrix (green) |
| **Accessible** | ARIA roles (tree, treeitem), aria-expanded, aria-selected, focus management |
| **Modular Architecture** | Clean separation: components / hooks / utils / data |

---

## Setup

```bash
# 1. Unzip and enter the project
cd securevault-explorer

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser → http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Tech Stack

- **React 18** — Functional components + Hooks
- **Vite** — Lightning-fast build tool
- **Tailwind CSS v3** — Utility-first styling (no component libraries)
- **JetBrains Mono** + **DM Sans** — Typography
- No UI libraries. No Bootstrap. No MUI. Pure custom code.

---

## Project Structure

```
src/
├── components/
│   ├── FileNode.jsx       ← CORE recursive component
│   ├── FileTree.jsx       ← Root list wrapper + keyboard handler
│   ├── FileIcon.jsx       ← SVG icons per file type
│   ├── FileDetails.jsx    ← Metadata panel (right sidebar)
│   ├── Breadcrumb.jsx     ← Dynamic path display
│   ├── SearchBar.jsx      ← Live filter input
│   └── ThemeToggle.jsx    ← 4-theme switcher
├── hooks/
│   ├── useFileExplorer.js ← Central state (expand, select, focus, search)
│   └── useTheme.js        ← Theme definitions + switcher
├── utils/
│   └── treeUtils.js       ← Pure recursive utilities
└── data/
    └── fileSystem.js      ← JSON data (mirrors data.json)
```

---

## Recursive Strategy

The heart of the app is `FileNode` in `src/components/FileNode.jsx`.

```jsx
export default function FileNode({ node, depth, ...props }) {
  return (
    <li>
      <div style={{ paddingLeft: depth * 16 }}>
        {node.name}
      </div>
      {node.type === "folder" && isExpanded && (
        <ul>
          {node.children.map(child => (
            <FileNode key={child.id} node={child} depth={depth + 1} {...props} />
          ))}
        </ul>
      )}
    </li>
  );
}
```

- No hardcoded levels — depth is a number incremented per recursive call
- Children only render when folder is expanded (performance)
- `paddingLeft: depth * 16px` creates visual indentation automatically

Supporting recursive utilities in `treeUtils.js`:
- `flattenVisibleTree()` — walks expanded tree into a flat list for keyboard nav
- `buildBreadcrumbPath()` — finds path from root to any target node
- `findAncestors()` — collects parent IDs to expand when revealing a file
- `searchTree()` — filters nodes recursively, preserving matched subtrees

---

## Keyboard Navigation

Implemented in `useFileExplorer.js` using the flatten-then-index approach:

1. `flattenVisibleTree()` collapses the visible tree into a linear array
2. `focusedId` tracks which node has the cursor
3. Arrow keys find the current index in the flat list and move it
4. `nodeRefs` stores DOM references so `scrollIntoView()` keeps focused nodes visible

| Key   | Action                        |
|-------|-------------------------------|
| `↑`   | Move to previous visible node |
| `↓`   | Move to next visible node     |
| `→`   | Expand focused folder         |
| `←`   | Collapse focused folder       |
| `↵`   | Select file / toggle folder   |
| `Tab` | Move Selector                 |

---

## Breadcrumb Navigation (Wildcard Feature)

Shows the full path to the selected file at all times.

```
Home / 01_Legal_Department / Active_Cases / Doe_vs_MegaCorp_Inc / Leak_Evidence.png
```

Uses `buildBreadcrumbPath()` which recursively traverses the tree, accumulating node names until it finds the target ID. The result is rendered as a `/`-separated trail with the final segment highlighted.

**UX benefit:** In deeply nested trees, users lose spatial context. Breadcrumbs provide persistent orientation — you always know where you are, even after navigating with keyboard or search.

---

## Theme System

Four themes in `useTheme.js`, each a plain object of Tailwind class strings:

| Theme | Vibe |
|---|---|
| `dark` | Cyber-secure dark blue (default) |
| `light` | Clean white for bright environments |
| `midnight` | Deep indigo premium dark |
| `matrix` | Terminal green for hackers |

Adding a new theme = adding one object to `THEMES`. No CSS variables needed.

---

## Future Improvements

- Right-click context menu (copy path, rename, delete)
- Drag-and-drop reordering
- Multi-select (Shift+Click, Ctrl+Click)
- Virtual scrolling for 10,000+ file trees
- Persistent state via localStorage
- Inline file preview for images, PDFs, and text
- Sort by name, size, or type
- Collaborative multi-user cursors

## Business Impact

This file explorer is designed for high-security enterprise environments where users manage deeply nested sensitive documents.

Key improvements:
- Faster navigation through large datasets (recursive tree + keyboard control)
- Reduced cognitive load with breadcrumb orientation
- Efficient file discovery using live search
- Accessible interface for power users

These features directly improve productivity for professionals handling large volumes of structured files.