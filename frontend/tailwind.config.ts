import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "radium-red": "#f70505",
        "radium-green": "#00FF0D",
        "radium-blue": "#0630FA",
        "background-tile": "rgb(20 21 27 / <alpha-value>)",
        "background-tile-top": "rgb(32 33 39 / <alpha-value>)",
        "trade-text-color": "rgb(150 159 175 / <alpha-value>);",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
