export const ThemeScript = () => {
  const script = `(function() {
    try {
      var t = localStorage.getItem("theme");
      var supportDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var activeTheme = t || (supportDark ? "dark" : "light");
      
      document.documentElement.setAttribute("data-theme", activeTheme);
    } catch (e) {}
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};