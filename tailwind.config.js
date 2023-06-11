/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#C1E4FF",
        "secondary-color": "#E7DDF2",
        "text-primary": "#D0D0D0",
        "btn-color": "#83D39D",
      },
    },
  },
  plugins: [],
};
