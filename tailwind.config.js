/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#6d6d6d",
        otherGrey: "#acacac",
        darkGrey: "#2e2e2e",
        green: "#00BD6F",
      },
    },
  },
  plugins: [],
};
