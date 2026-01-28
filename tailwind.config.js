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
                    bg: 'rgb(var(--color-bg) / <alpha-value>)',
                    card: 'rgb(var(--color-card) / <alpha-value>)',
                    canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
                    earth: 'rgb(var(--color-earth) / <alpha-value>)',
                    saffron: 'rgb(var(--color-saffron) / <alpha-value>)',
                    crimson: 'rgb(var(--color-crimson) / <alpha-value>)',
                    charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
                }
            }
        },
    },
    plugins: [],
}
