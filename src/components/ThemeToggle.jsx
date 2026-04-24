import { THEMES } from "../hooks/useTheme";

/**
 * ThemeToggle — Cycles through available themes.
 */
export default function ThemeToggle({ themeName, setThemeName, theme }) {
  const themeKeys = Object.keys(THEMES);

  return (
    <div className="flex items-center gap-1">
      {themeKeys.map((key) => (
        <button
          key={key}
          onClick={() => setThemeName(key)}
          title={THEMES[key].label}
          className={[
            "w-7 h-7 rounded-md text-xs font-mono transition-all duration-150 border",
            themeName === key
              ? `${theme.textAccent} border-current bg-current/10`
              : `${theme.textMuted} border-transparent hover:border-current/30`,
          ].join(" ")}
          aria-label={`Switch to ${THEMES[key].label} theme`}
          aria-pressed={themeName === key}
        >
          {THEMES[key].icon}
        </button>
      ))}
    </div>
  );
}
