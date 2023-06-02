const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        raleway: ["Raleway", "sans-serif"],
        crimson: ["Crimson Text", "serif"],
        playfair: ["Playfair", "serif"],
      },
      colors: {
        primary: {
          0: "#000000",
          100: "#332000",
          200: "#664100",
          300: "#996100",
          400: "#cc8200",
          500: "#ffa300",
          600: "#ffb532",
          700: "#ffc765",
          800: "#ffda99",
          900: "#feeccc",
          950: "#fff5e5",
          990: "#fffdf9",
          1000: "#ffffff",
        },
        secondary: {
          0: "#000000",
          100: "#00332a",
          200: "#006655",
          300: "#009980",
          400: "#00ccaa",
          500: "#00ffd5",
          600: "#32ffdd",
          700: "#65ffe6",
          800: "#99ffee",
          900: "#ccfef6",
          950: "#e5fffa",
          990: "#f9fffe",
          1000: " #ffffff",
        },
        tertiary: {
          0: "#000000",
          100: "#201512",
          200: "#412b24",
          300: "#624036",
          400: "#835648",
          500: "#a46b5a",
          600: "#b6897b",
          700: "#c8a69c",
          800: "#dac4bd",
          900: "#ece1de",
          950: "#f5f0ee",
          990: "#fdfcfb",
          1000: "#ffffff",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
