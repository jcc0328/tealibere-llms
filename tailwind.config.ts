import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        trust: {
          blue: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
