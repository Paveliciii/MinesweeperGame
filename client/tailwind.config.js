/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        tg: {
          bg: "var(--tg-theme-bg-color)",
          text: "var(--tg-theme-text-color)",
          hint: "var(--tg-theme-hint-color)",
          link: "var(--tg-theme-link-color)",
          button: "var(--tg-theme-button-color)",
          "button-text": "var(--tg-theme-button-text-color)",
          "secondary-bg": "var(--tg-theme-secondary-bg-color)"
        },
        cell: {
          unrevealed: "var(--tg-theme-secondary-bg-color, #e0e0e0)",
          revealed: "color-mix(in srgb, var(--tg-theme-bg-color) 80%, transparent)",
          hover: "color-mix(in srgb, var(--tg-theme-button-color) 10%, var(--tg-theme-secondary-bg-color))",
          number: {
            "1": "#2563eb", // синий
            "2": "#059669", // зеленый
            "3": "#dc2626", // красный
            "4": "#4f46e5", // фиолетовый
            "5": "#b91c1c", // темно-красный
            "6": "#0d9488", // бирюзовый
            "7": "#000000", // черный
            "8": "#4b5563"  // серый
          }
        },
        background: "var(--tg-theme-bg-color, hsl(var(--background)))",
        foreground: "var(--tg-theme-text-color, hsl(var(--foreground)))",
        primary: {
          DEFAULT: "var(--tg-theme-button-color, #64748b)",
          light: "var(--tg-theme-button-color, #94a3b8)",
          dark: "var(--tg-theme-button-color, #475569)"
        },
        surface: {
          DEFAULT: "var(--tg-theme-secondary-bg-color, #f1f5f9)",
          dark: "var(--tg-theme-secondary-bg-color, #e2e8f0)"
        },
        accent: {
          blue: "var(--tg-theme-button-color, #3b82f6)",
          green: "var(--tg-theme-button-color, #22c55e)",
          red: "#ef4444"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      boxShadow: {
        'neumorphic': 'var(--shadow-elevation-low)',
        'neumorphic-inset': 'var(--shadow-elevation-medium)',
        'neumorphic-pressed': 'var(--shadow-elevation-high)',
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        'glass-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.25)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
        'button-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.25)',
        'inner-sm': 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        'inner-md': 'inset 0 2px 4px rgba(0, 0, 0, 0.15)',
        'inner-lg': 'inset 0 4px 6px rgba(0, 0, 0, 0.2)',
        'glow-sm': '0 0 10px rgba(var(--tg-theme-button-color-rgb), 0.1)',
        'glow-md': '0 0 15px rgba(var(--tg-theme-button-color-rgb), 0.15)',
        'glow-lg': '0 0 20px rgba(var(--tg-theme-button-color-rgb), 0.2)',
        'float-sm': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'float-md': '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
        'float-lg': '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'glass': '8px',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'gradient-button': 'linear-gradient(135deg, var(--tg-theme-button-color, #3b82f6), rgba(59, 130, 246, 0.9))',
        'gradient-fade': 'linear-gradient(180deg, rgba(var(--tg-theme-button-color-rgb), 0.1) 0%, rgba(var(--tg-theme-button-color-rgb), 0) 100%)',
        'gradient-radial': 'radial-gradient(circle, rgba(var(--tg-theme-button-color-rgb), 0.1) 0%, rgba(var(--tg-theme-button-color-rgb), 0) 100%)',
        'gradient-shine': 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        reveal: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        press: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'bounce-in': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0'
          },
          '50%': {
            transform: 'scale(1.2)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'reveal': 'reveal 0.2s ease-out',
        'press': 'press 0.2s ease-in-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'bounce-in': 'bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      },
    },
  },
  plugins: [],
};
