/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    standard: '#004077',
                    light: '#214779'
                },
                secondary: {
                    standard: '#5d87b7',
                    light: '#7f9cb7'
                },
                tertiary: {
                    standard: '#0b1239',
                    light: '#24263f'
                },
                neutral: {
                    standard: '#8d8d8d',
                    dark: '#606060'
                },
                disabled: '#a9a9a9',
                error: '#c1121f',
                on: {
                    primary: '#ffffff',
                    secondary: '#ffffff',
                    container: '#ffffff'
                },
            },
        },
    },
    plugins: [],
}
