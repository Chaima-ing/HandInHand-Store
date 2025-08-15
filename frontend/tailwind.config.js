/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in src
        "./public/index.html", // Include any HTML files if applicable
    ],
    theme: {
        extend: {
            colors: {
                // Add custom colors used in your components if needed
                'green-700': '#047857', // Matches bg-green-700
                'green-800': '#065f46', // Matches text-green-800
                'emerald-700': '#047857', // Matches text-emerald-700
            },
        },
    },
    plugins: [],
};