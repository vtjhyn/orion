import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color1' : '#053B50',
        'color2' : '#176B87',
        'color3' : '#64CCC5',
        'color4' : '#EEEEEE'
      },
    },
  },
  plugins: [],
}
export default config
