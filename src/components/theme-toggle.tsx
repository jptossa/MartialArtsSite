"use client";

// Flips the data-theme attribute on <html> and remembers the choice.
// There is deliberately no React state: the initial theme is set before first
// paint by THEME_INIT_SCRIPT (layout.tsx), and which label shows is decided by
// CSS from that attribute, so the server and client markup always match.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works this visit.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
    >
      <span className="theme-to-light">Light</span>
      <span className="theme-to-dark">Dark</span>
    </button>
  );
}
