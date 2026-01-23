import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        // Use CSS variables from next/font for optimized loading
        barlow: ["var(--font-barlow)", "system-ui", "sans-serif"],
        "barlow-condensed": ["var(--font-barlow-condensed)", "Arial Narrow", "sans-serif"],
      },
      fontSize: {
        // Display/Hero sizes
        "display": ["clamp(3.5rem, 10vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-lg": ["clamp(4rem, 12vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.02em", fontWeight: "900" }],
        // Heading sizes
        "h1": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "800" }],
        "h2": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "800" }],
        "h3": ["1.5rem", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "700" }],
        "h4": ["1.25rem", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "700" }],
        // Label sizes
        "label": ["0.75rem", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "600" }],
        "label-lg": ["0.875rem", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "600" }],
      },
      spacing: {
        "section": "var(--space-section)",
        "section-mobile": "var(--space-section-mobile)",
      },
      colors: {
        border: "hsl(var(--border))",
        "border-subtle": "hsl(var(--border-subtle))",
        "border-nav": "hsl(var(--border-nav))",
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
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
        // Brand colors
        forge: {
          orange: "hsl(var(--forge-orange))",
          "orange-dark": "hsl(var(--forge-orange-dark))",
          "orange-glow": "hsl(var(--forge-orange-glow))",
          dark: "hsl(var(--forge-dark))",
          gray: "hsl(var(--forge-gray))",
          "gray-light": "hsl(var(--forge-gray-light))",
          "gray-dark": "hsl(var(--forge-gray-dark))",
        },
        // Surface depth system
        surface: {
          0: "hsl(var(--surface-0))",
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
          4: "hsl(var(--surface-4))",
        },
        // Text hierarchy
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-tertiary": "hsl(var(--text-tertiary))",
        "text-quaternary": "hsl(var(--text-quaternary))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: "0",
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
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 30px rgba(255,102,0,0.2)" },
          "50%": { boxShadow: "0 0 50px rgba(255,102,0,0.3)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 12s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
