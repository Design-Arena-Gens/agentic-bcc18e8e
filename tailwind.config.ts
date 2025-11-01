import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        tennis: {
          green: '#0B8F3C',
          yellow: '#F2E205'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
export default config
