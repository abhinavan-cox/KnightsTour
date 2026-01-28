/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                husain: {
                    bg: '#121212',       // Deep ink black
                    card: '#1E1E1E',     // Soft charcoal
                    canvas: '#E5DCC5',   // Raw canvas beige (Light Square)
                    earth: '#8D6E63',    // Terra cotta / Earth (Dark Square)
                    saffron: '#FF9800',  // Vibrant Orange/Saffron (Accent)
                    crimson: '#D50000',  // Bold Red (Knight/Path)
                    charcoal: '#37474F', // Blue-grey lines
                }
            }
        },
    },
    plugins: [],
}
