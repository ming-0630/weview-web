/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'sans': ["Rubik", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: '#40AF93',
        gray: {
          dark: '#1E1E1E'
        },
        white: {
          DEFAULT: '#F5F5F5'
        }
      },
      height: {
        minusNav: 'calc(100vh - 7rem)'
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#40AF93",
          "secondary": "#D926AA",
          "accent": "#1FB2A5",
          "neutral": "#1E1E1E",
          "base-100": "#2A303C",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
