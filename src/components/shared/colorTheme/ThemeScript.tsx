export const ThemeScript = () => {
  const script = `(function(){var t=localStorage.getItem("theme"),d=!(t!="dark");document.documentElement.classList.toggle("dark",d)})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};