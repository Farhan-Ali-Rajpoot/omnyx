'use client';

import { useEffect } from "react";

export function InitAccordion() {
  useEffect(() => {
    const container = document.querySelector('aside');
    if (!container) {
      console.warn("Not found");
      return;
    }

    const detailsList = container.querySelectorAll<HTMLDetailsElement>("details");

    detailsList.forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (detail.open) {
          // Close all other details
          detailsList.forEach((other) => {
            if (other !== detail) {
              other.removeAttribute("open");
            }
          });
        }
      });
    });

    // Cleanup function to remove listeners if component unmounts
    return () => {
      detailsList.forEach((detail) => {
        detail.removeEventListener("toggle", () => {});
      });
    };
  }, []);

  return null;
}
