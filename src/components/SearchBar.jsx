/**
 * SearchBar — Filters the visible tree in real time.
 * Matching folders are auto-expanded via searchTree utility.
 */
export default function SearchBar({ query, onChange, theme }) {
  return (
    <div className="relative">
      <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textMuted}`}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search files..."
        className={[
          "w-full pl-8 pr-8 py-2 text-xs font-mono rounded-md border outline-none",
          "transition-all duration-150 placeholder:opacity-40",
          "focus:ring-1 focus:ring-current",
          theme.searchBg,
        ].join(" ")}
        aria-label="Search files and folders"
      />
      {query && (
        <button
          onClick={() => onChange("")}
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${theme.textMuted} hover:${theme.text} transition-colors`}
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
