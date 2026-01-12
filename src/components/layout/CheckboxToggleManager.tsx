'use client';

import { useEffect } from 'react';

export function CheckboxToggleManager() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find the closest element with the checkbox toggle attribute
      const trigger = (e.target as HTMLElement).closest('[data-target-checkbox-id]');
      if (!trigger) return;

      // Get the checkbox ID
      const checkboxId = trigger.getAttribute('data-target-checkbox-id');
      if (!checkboxId) return;

      // Find the checkbox
      const checkbox = document.getElementById(checkboxId);
      if (!checkbox || !(checkbox instanceof HTMLInputElement)) return;

      // Uncheck the checkbox
      checkbox.checked = false;
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}