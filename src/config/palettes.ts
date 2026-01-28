export type PaletteName = 'rembrandt' | 'picasso' | 'ravivarma' | 'caravaggio' | 'monet';

export interface ColorPalette {
    name: PaletteName;
    displayName: string;
    artist: string;
    description: string;
    colors: {
        bg: string;
        card: string;
        canvas: string;
        earth: string;
        saffron: string;
        crimson: string;
        charcoal: string;
    };
}

export const palettes: Record<PaletteName, ColorPalette> = {
    rembrandt: {
        name: 'rembrandt',
        displayName: 'Rembrandt',
        artist: 'Rembrandt van Rijn',
        description: 'Deep chiaroscuro with warm earth tones and golden highlights',
        colors: {
            bg: '#121212',
            card: '#1E1E1E',
            canvas: '#E5DCC5',
            earth: '#8D6E63',
            saffron: '#FF9800',
            crimson: '#D50000',
            charcoal: '#37474F',
        },
    },
    picasso: {
        name: 'picasso',
        displayName: 'Picasso',
        artist: 'Pablo Picasso',
        description: 'Cool blues and geometric precision from the Blue Period',
        colors: {
            bg: '#0A1929',
            card: '#1E293B',
            canvas: '#D1D9E6',
            earth: '#4A6FA5',
            saffron: '#2196F3',
            crimson: '#00BCD4',
            charcoal: '#546E7A',
        },
    },
    ravivarma: {
        name: 'ravivarma',
        displayName: 'Ravi Varma',
        artist: 'Raja Ravi Varma',
        description: 'Rich jewel tones inspired by Indian classical art',
        colors: {
            bg: '#1A1464',
            card: '#2D1B4E',
            canvas: '#FFF8DC',
            earth: '#C1666B',
            saffron: '#FF6F00',
            crimson: '#D81B60',
            charcoal: '#B8860B',
        },
    },
    caravaggio: {
        name: 'caravaggio',
        displayName: 'Caravaggio',
        artist: 'Michelangelo Merisi da Caravaggio',
        description: 'Dramatic baroque with theatrical lighting and high contrast',
        colors: {
            bg: '#000000',
            card: '#1C1C1C',
            canvas: '#F5E6D3',
            earth: '#654321',
            saffron: '#E97451',
            crimson: '#C80815',
            charcoal: '#3E3E3E',
        },
    },
    monet: {
        name: 'monet',
        displayName: 'Monet',
        artist: 'Claude Monet',
        description: 'Soft impressionist pastels from the gardens of Giverny',
        colors: {
            bg: '#2C3E50',
            card: '#3A4F5C',
            canvas: '#FFE4E1',
            earth: '#8FBC8F',
            saffron: '#FF69B4',
            crimson: '#87CEEB',
            charcoal: '#6B8E23',
        },
    },
};

export const DEFAULT_PALETTE: PaletteName = 'rembrandt';
