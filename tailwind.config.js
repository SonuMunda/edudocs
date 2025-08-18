/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Firefox */
          "scrollbar-width": "none",
          /* Chrome, Edge, and Safari */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-default": {
          /* Firefox */
          "scrollbar-width": "auto",
          /* Chrome, Edge, and Safari */
          "&::-webkit-scrollbar": {
            display: "block",
          },
        },
      });
    },
  ],
};
