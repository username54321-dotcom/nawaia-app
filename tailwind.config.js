import { Platform } from 'react-native';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      animation: {
        'ping-slow-interval': 'ping-with-pause 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'ping-with-pause': {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          // The animation happens in the first 33.33% of the total 3s duration
          '20%': {
            transform: 'scale(1.5)',
            opacity: '5',
          },
          // The animation holds its final state for the remaining 66.67% (the 2s pause)
          '100%': {
            transform: 'scale(2.5)',
            opacity: '0',
          },
        },
      },
    },
    fontFamily: {
      AtomicAge: ['AtomicAge', 'sans-serif'],
      Kufi: ['Kufi'],
      Playwrite: ['Playwrite DE Grund Thin'],
      PlayywrightHandwritten: ['PlaywriteHandWritten'],
      Boggle: ['Boggle'],
    },
  },
  plugins: [],
};
