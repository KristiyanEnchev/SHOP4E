/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      colors: {
        primary: '#324d67',
        secondary: '#f02d34',
      },
      boxShadow: {
        auth: '1px 2px 8px rgba(0, 0, 0, 0.65)',
      },
      backgroundColor: {
        'auth-gradient': 'linear-gradient(to right, #ff6368, #f02d34)',
        'nav-bg': '#324d67',
        'btn-primary': '#f02d34',
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'gray-50': '#F9FAFB',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
      keyframes: {
        moveUpDown: {
          '0%, 50%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(20px)' },
          '75%': { transform: 'translateY(-20px)' },
        },
        loader: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(0px)' },
          '75%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'move-up-down': 'moveUpDown 3s ease-in-out infinite',
        loader: 'loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        bounce: 'bounce 3s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in',
      },
      maxWidth: {
        layout: '1400px',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
};
