module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            rampart: ['Rampart One', 'cursive'],
            jura: ['Jura', 'sans-serif'],
            sunrise: ['Waiting for the Sunrise', 'cursive'],
        },
        extend: {
            colors: {
                primary: '#4b24bf',
                secondary: '#f41368',
                tertiary: '#2ccae6',
                danger: 'crimson',
                moderate: 'goldenrod',
                darkgray: '#6B7280',
                facebook: '#3C5A9A',
                mildgray: '#1d1c1c',
                bglight: '#1F1F23',
                bgdark: '#0E0E10',
                'custom-cyan': '#07AABD',
                'notes-pink': '#EAB3C3',
                'notes-seablue': '#AFCCD4',
                'notes-yellow': '#DDCB8A',
                'notes-green': '#A5BF97',
                'notes-gray': '#CBCBD5',
            },
            backgroundImage: {
                'signin-cover': "url('./assets/signin_cover.jpg')",
                'forgotPassword-cover':
                    "url('./assets/forgotPassword_cover.jpg')",
            },
            animation: {
                shake: 'shake 1s ease-in-out',
            },
            keyframes: {
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0,0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0,0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0,0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0,0)' },
                },
            },
        },
    },
    variants: {
        extend: {
            rotate: ['active', 'group-hover'],
            scale: ['active', 'group-hover'],
        },
    },
    plugins: [],
};
