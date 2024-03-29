/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
    './node_modules/flowbite/**/*.js' //flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    'flowbite/plugin'
  ]
}

