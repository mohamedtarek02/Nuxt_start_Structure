/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,vue}",
    "./components/**/*.{js,ts,vue}",
    "./layouts/**/*.{js,ts,vue}",
    "./app.vue",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-combo":
          "0px 1px 2px 0px #0A0D120D, inset 0px -2px 0px 0px #0A0D120D, inset 0px 0px 0px 1px #0A0D122E",
        "plan-shadow": "0px 1px 2px -1px #0A0D121A, 0px 1px 3px 0px #0A0D121A",
        "planBtb-shadow":
          "0px 1px 2px 0px #0A0D120D, inset 0px -2px 0px 0px #0A0D120D, inset 0px 0px 0px 1px #0A0D122E",
      },
      fontSize: {
        sm: "0.75rem", // 12px
        md: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.75rem", // 28px
        "4xl": "2rem", // 32px
        "5xl": "2.25rem", // 36px
        "6xl": "2.5rem", // 40px
        "7xl": "2.75rem", // 44px
        "8xl": "3rem", // 48px
        "9xl": "3.25rem", // 52px
      },
      colors: {
        primary: {
          500: "#3e2cc7",
        },
        danger: {
          700: "#a50000",
          600: "#F64C4C",
        },
        gray: {
          900: "#181D27",
          800: "#717680",
          700: "#535862",
          600: "#414651",
          400: "#E9EAEB",
        },
        darkBlue: "#181D27",
        gray: "#717680",
        lightGray: "#efefef",
        darkGray: "#535862",
        sky: "#90A9D5",
        white: "#ffffff",
        CloudWhite: "#E9EAEB",
        black: "#000000",
      },
    },
    screens: {
      xs: "388px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
      "3xl": "1680px",
      "4xl": "1800px",
    },
  },
  plugins: [],
};
