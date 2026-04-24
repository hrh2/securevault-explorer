# SecureVault Explorer

> A production-grade enterprise file explorer UI built with React + Tailwind CSS, featuring recursive tree rendering, full keyboard navigation, dynamic breadcrumbs, live search, and a 4-theme system.

---

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
