const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');

const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: [
        join(__dirname, '../../../apps/**/*.{ts,tsx,html}'),
        join(__dirname, '../../../libs/**/*.{ts,tsx,html}'),
        ...createGlobPatternsForDependencies(__dirname)
    ],
    theme: {
        extend: {}
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['dark']
    }
};
