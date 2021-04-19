module.exports = {
  // purge: [],
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
// purge: {
//   enabled: process.env.NODE_ENV !== 'development',
//   content: [
//     './static/**/*.html',
//     './components/**/*.vue',
//     './components/**/*.html',
//     './layouts/**/*.vue',
//     './layouts/**/*.html',
//     './pages/**/*.vue',
//     './pages/**/*.html',
//     path.resolve(
//       __dirname,
//       './node_modules/vue-tailwind-picker/dist/*.js'
//     ),
//     path.resolve(__dirname, './node_modules/vue-tailwind-picker/**/*.js'),
//   ],
// },
