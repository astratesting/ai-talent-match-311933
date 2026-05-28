import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        cloud: '#f8fafc',
        brand: '#2563eb',
        mint: '#10b981',
        amber: '#f59e0b'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

export default config
