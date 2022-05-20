const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
