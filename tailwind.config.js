/** @type {import('tailwindcss').Config} */
const { hairlineWidth } = require('nativewind/theme');

module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        highlighted: '#cbd5e1',
        alert: '',
        nawaiaRed: '#be1e2d',
        /** ShadCN */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
        thin: '1px',
      },
      textColor: { colorMain: '#3e4b5e' },
      borderColor: { colorThin: '#a3a3a3', colorAlert: '#be1e2d' },
      width: { perc90: '90vw' },

      animation: {
        'ping-slow-interval': 'ping-with-pause 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        //SHADCN
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      gap: {},
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
        // SHADCN
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
    // SHADCN
    future: {
      hoverOnlyWhenSupported: true,
    },
    fontFamily: {
      Kufi: ['Kufi'],
      Playwrite: ['Playwrite DE Grund Thin'],
    },
  },
  plugins: [require('tailwindcss-animate')], // SHADCN
};
