import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fadeBackground": {
          '0%': { backgroundColor: '#fff' },
          '50%': { backgroundColor: '#efeff0' },
          '100%': { backgroundColor: '#fff' },
        },
    
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-to-message": "fadeBackground 1s ease-out"
      },
      boxShadow:{
        'custom': '0 1.2px 1.92251px rgba(0,0,0,.02),0 2px 3.68135px rgba(0,0,0,.04),0 1px 5px rgba(0,0,0,.05)',
        'custom-2': '0 .14px 2.29266px rgba(0,0,0,.032),0 .37px 4.42626px rgba(0,0,0,.048),0 3px 7px rgba(0,0,0,.09)'
      },
      height: {
        'calc-80px': 'calc(100vh - 138px)',
        'calc-side-bar-inbox': 'calc(100vh - 260px)',
        'scroll-area-height': 'calc(100vh - 370px)',
        'search-sidebar': 'calc(100vh - 230px)'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config