'use client';

import { useEffect } from 'react';

const AHandleToggle = () => {
    useEffect(() => {
        const checkbox = document.getElementById('menu-toggle') as HTMLInputElement | null;
        const toggleButtons = Array.from(document.querySelectorAll('.toggle-menu'));

        if (checkbox) {
            checkbox.checked = window.innerWidth > 768;
        }

        const closeMenu = () => {
            if (checkbox && checkbox.checked && window.innerWidth < 768) {
                checkbox.checked = false;
            }
        };

        toggleButtons.forEach((btn) => btn.addEventListener('click', closeMenu));
        return () => {
            toggleButtons.forEach((btn) => btn.removeEventListener('click', closeMenu));
        };
    }, []);

    return null; // No UI needed
};

export default AHandleToggle;
