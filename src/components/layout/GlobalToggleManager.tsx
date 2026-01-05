"use client";
import { useEffect } from "react";

export function GlobalToggleManager() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.hasAttribute("data-toggle-target-id")) {
        const targetId = target.getAttribute("data-toggle-target-id");
        if (targetId) {
          const element = document.getElementById(targetId);
          element?.toggleAttribute("open");
        }
        return;
      }

      const trigger = target.closest("[data-toggle-target-id]");
      if (!trigger) return;

      const targetId = trigger.getAttribute("data-toggle-target-id");
      if (!targetId) return;

      const element = document.getElementById(targetId);
      element?.toggleAttribute("open");
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
