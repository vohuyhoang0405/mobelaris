/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui")
const typography = require("@tailwindcss/typography")
const animatecsstaid = require("tailwind-animatecss")
module.exports = {
  content: [
    "./content/**/*.json",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sale: "#dc9d2d",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        title: ["var(--font-title)"],
        heading: ["var(--font-heading)"],
        button: ["var(--font-button)"],
      },
      container: {
        center: true,

        padding: "2rem",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      maxWidth: {
        "8xl": "100rem",
        page: "1264px",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
    },
  },
  plugins: [
    daisyui,
    typography,
    animatecsstaid,
    function groupPeer({ addVariant }) {
      let pseudoVariants = [
        // ... Any other pseudo variants you want to support.
        // See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
        "checked",
      ].map((variant) =>
        Array.isArray(variant) ? variant : [variant, `&:${variant}`]
      )

      for (let [variantName, state] of pseudoVariants) {
        addVariant(`group-peer-${variantName}`, (ctx) => {
          let result = typeof state === "function" ? state(ctx) : state
          return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &")
        })
      }
    },
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f90",
          secondary: "#31c4a3",
          accent: "#000000",
          neutral: "#535353",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-content": "#535353",
          "--rounded-box": "0rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25", // duration of animation when you click on button
          "--btn-text-case": "uppercase", // set default text transform for buttons
          // "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--rounded-btn": "0rem", // border radius rounded-box utility class, used in card and other large boxes
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0rem", // border radius of tabs

          "--btn-focus-scale": "1",
          "--animation-btn": "0",
          "--animation-input": "0",
        },
      },
    ],
  },
}
