/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "860px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1200px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        // grey: "#6d6d6d",
        otherGrey: "#acacac",
        textLightGrey: "#9CA3AF",
        lighterGrey: "#fbfbfb",
        lightGrey: "#EFEFEF",
        textGrey: "#8B8B94",
        darkGrey: "#2e2e2e",
        darkGreen: "#00BD6F",
        navGreen: "#dbf9ec",
        green: "#00BD6F",
        lightGreen: "#f5fffb",
        lightGrey: "#efefef",
        red: "#ff1717",
        darkRed: "#C81E1E",
      },
    },
  },
  plugins: [],
};
