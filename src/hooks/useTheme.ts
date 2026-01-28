import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { palettes } from '../config/palettes';

// Convert hex to RGB format for CSS variables
const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
        : '0 0 0';
};

export const useTheme = () => {
    const selectedPalette = useGameStore(state => state.settings.selectedPalette);

    useEffect(() => {
        const palette = palettes[selectedPalette];
        const root = document.documentElement;

        // Apply CSS custom properties to the root element in RGB format
        root.style.setProperty('--color-bg', hexToRgb(palette.colors.bg));
        root.style.setProperty('--color-card', hexToRgb(palette.colors.card));
        root.style.setProperty('--color-canvas', hexToRgb(palette.colors.canvas));
        root.style.setProperty('--color-earth', hexToRgb(palette.colors.earth));
        root.style.setProperty('--color-saffron', hexToRgb(palette.colors.saffron));
        root.style.setProperty('--color-crimson', hexToRgb(palette.colors.crimson));
        root.style.setProperty('--color-charcoal', hexToRgb(palette.colors.charcoal));

        // Also set data-theme attribute for CSS selectors
        root.setAttribute('data-theme', selectedPalette);
    }, [selectedPalette]);
};
