// tabs-media-query.js
// Isolated media query function specifically for the Tabs component.
// Matches your Sass breakpoint: @media (min-width: 641px)

export function tabsMediaQuery() {
  return window.matchMedia("(min-width: 641px)").matches
    ? "desktop"
    : "mobile";
}
