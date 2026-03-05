import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon-red': '0 0 10px #FF003C, 0 0 20px #FF003C',
        'neon-blue': '0 0 10px #0064FF, 0 0 20px #0064FF',
      },
      colors: {
        darkBg: '#0A0A0A',
        darkCard: '#111827',
        neonRed: '#FF003C',
        neonBlue: '#0064FF',
      }
    },
  },
  plugins: [],
};
export default config;

