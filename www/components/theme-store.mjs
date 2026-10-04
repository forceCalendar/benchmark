// Read the same theme class used by the pre-hydration script and chart observer.
// A stable false server snapshot keeps hydration deterministic.
export const getServerThemeSnapshot = () => false;
export const getThemeSnapshot = () => document.documentElement.classList.contains('dark');

export function subscribeToThemeChange(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}
