/**
 * Recursively flattens the visible tree into a linear list for keyboard navigation.
 * Only includes nodes whose parent folders are expanded.
 *
 * @param {Array} nodes - Array of tree nodes
 * @param {Set} expandedIds - Set of expanded folder IDs
 * @param {number} depth - Current depth level
 * @returns {Array} Flat list of visible nodes with depth info
 */
export function flattenVisibleTree(nodes, expandedIds, depth = 0) {
  const result = [];
  for (const node of nodes) {
    result.push({ ...node, depth });
    if (node.type === "folder" && expandedIds.has(node.id) && node.children?.length) {
      const childNodes = flattenVisibleTree(node.children, expandedIds, depth + 1);
      result.push(...childNodes);
    }
  }
  return result;
}

/**
 * Recursively builds the breadcrumb path to a target node.
 *
 * @param {Array} nodes - Array of tree nodes
 * @param {string} targetId - ID of the target node
 * @param {Array} path - Accumulated path (used in recursion)
 * @returns {Array|null} Array of {id, name} objects, or null if not found
 */
export function buildBreadcrumbPath(nodes, targetId, path = []) {
  for (const node of nodes) {
    const currentPath = [...path, { id: node.id, name: node.name }];
    if (node.id === targetId) return currentPath;
    if (node.type === "folder" && node.children?.length) {
      const found = buildBreadcrumbPath(node.children, targetId, currentPath);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Recursively collects all ancestor folder IDs needed to reveal a target node.
 *
 * @param {Array} nodes - Array of tree nodes
 * @param {string} targetId - ID of the node to reveal
 * @param {Array} ancestors - Accumulated ancestor IDs
 * @returns {Array|null} Array of ancestor IDs, or null if not found
 */
export function findAncestors(nodes, targetId, ancestors = []) {
  for (const node of nodes) {
    if (node.id === targetId) return ancestors;
    if (node.type === "folder" && node.children?.length) {
      const found = findAncestors(node.children, targetId, [...ancestors, node.id]);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Recursively searches nodes by name, returning matching nodes
 * and folders that contain matches.
 *
 * @param {Array} nodes - Array of tree nodes
 * @param {string} query - Search query string
 * @returns {Array} Filtered nodes with matching subtrees
 */
export function searchTree(nodes, query) {
  if (!query.trim()) return nodes;
  const q = query.toLowerCase();
  const result = [];
  for (const node of nodes) {
    const nameMatch = node.name.toLowerCase().includes(q);
    if (node.type === "folder") {
      const filteredChildren = searchTree(node.children || [], query);
      if (nameMatch || filteredChildren.length > 0) {
        result.push({ ...node, children: filteredChildren, _matchedSelf: nameMatch });
      }
    } else {
      if (nameMatch) result.push({ ...node, _matchedSelf: true });
    }
  }
  return result;
}

/**
 * Recursively collects all folder IDs from a node list (for "expand all matching").
 */
export function collectAllFolderIds(nodes) {
  const ids = new Set();
  for (const node of nodes) {
    if (node.type === "folder") {
      ids.add(node.id);
      const childIds = collectAllFolderIds(node.children || []);
      childIds.forEach((id) => ids.add(id));
    }
  }
  return ids;
}

/**
 * Returns file extension from filename.
 */
export function getFileExtension(name) {
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "FILE";
}

/**
 * Maps file extension to a color class for the file type badge.
 */
export function getFileTypeColor(name) {
  const ext = getFileExtension(name).toLowerCase();
  const map = {
    pdf: "text-red-400 bg-red-400/10 border-red-400/20",
    docx: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    doc: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    xlsx: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    xls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    png: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    jpg: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    svg: "text-pink-400 bg-pink-400/10 border-pink-400/20",
    txt: "text-slate-400 bg-slate-400/10 border-slate-400/20",
    yaml: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    yml: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    ttf: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  };
  return map[ext] || "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
}
