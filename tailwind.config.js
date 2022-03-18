const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				innerBtn: 'inset 2px 4px 2px rgba(0, 0, 0, 0.25)',
			},
			keyframes: {
				'bounce-rev': {
					'0%, 100%': {
						transform: 'translateY(0)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
					},
					'50%': {
						transform: 'translateY(-25%)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
					},
				},
			},
			animation: {
				'bounce-rev': 'bounce-rev 1s infinite',
			},
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.zinc,
			emerald: colors.emerald,
			indigo: colors.indigo,
			yellow: colors.yellow,
			error: '#cb2c30',
			red: {
				100: '#fee2e2',
				DEFAULT: '#cb2c30',
			},
		},
	},
	plugins: [],
};
