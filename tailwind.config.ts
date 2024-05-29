import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        primary: '#009460'
      }
    },
  },
  plugins: [],
}
export default config
