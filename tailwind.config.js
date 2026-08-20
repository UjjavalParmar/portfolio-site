/**
 * Tailwind is kept for layout utilities only. Every design decision — colour,
 * type, spacing, borders — lives in the token layer in src/index.css, and this
 * config just points Tailwind at the same custom properties so a utility can
 * never drift from a token.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        line: 'var(--line)',
        line2: 'var(--line2)',
        fg: 'var(--fg)',
        fg2: 'var(--fg2)',
        fg3: 'var(--fg3)',
        accent: 'var(--accent)',
        'accent-fg': 'var(--accent-fg)',
        ok: 'var(--ok)',
        bad: 'var(--bad)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        none: '0',
      },
      screens: {
        // The design's two breakpoints, as max-width variants.
        'lap-down': { max: '1080px' },
        'mob-down': { max: '760px' },
      },
    },
  },
  plugins: [],
}
