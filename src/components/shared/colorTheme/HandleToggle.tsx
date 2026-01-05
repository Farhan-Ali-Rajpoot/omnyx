"use client";
import { useEffect } from "react";

export default function HandleThemeToggle() {
  useEffect(() => {
    const btn = document.getElementById("theme-toggle-button");
    if (!btn) return;

    const clickHandler = () => {
      const html = document.documentElement;
      const isDark = html.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      html.classList.add("no-transition");
      requestAnimationFrame(() => html.classList.remove("no-transition"));
    };

    btn.addEventListener("click", clickHandler);
    return () => btn.removeEventListener("click", clickHandler);
  }, []);

  return null;
}
