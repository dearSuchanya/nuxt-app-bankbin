import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        wastebank: {
          'primary': 'oklch(0.541 0.281 293.009)',
          'primary-content': '#ffffff',
          'secondary': '#6b7280',
          'secondary-content': '#ffffff',
          'accent': '#10b981',
          'accent-content': '#ffffff',
          'neutral': '#1f2937',
          'neutral-content': '#f3f4f6',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          'base-content': '#1f2937',
          'info': '#3b82f6',
          'success': '#22c55e',
          'warning': '#f59e0b',
          'error': '#ef4444',
        },
      },
      {
        wastebankDark: {
          'primary': 'oklch(0.541 0.281 293.009)',
          'primary-content': 'oklch(1 0 0)',
          'secondary': 'oklch(0.704 0.022 261.325)',
          'secondary-content': 'oklch(0.21 0.034 264.665)',
          'accent': 'oklch(0.696 0.17 162.48)',
          'accent-content': 'oklch(1 0 0)',
          'neutral': 'oklch(0.373 0.034 259.733)',
          'neutral-content': 'oklch(0.967 0.003 264.542)',
          'base-100': 'oklch(0.21 0.034 264.665)',
          'base-200': 'oklch(0.178 0.032 264.695)',
          'base-300': 'oklch(0.153 0.028 265.638)',
          'base-content': 'oklch(0.967 0.003 264.542)',
          'info': 'oklch(0.623 0.214 259.815)',
          'success': 'oklch(0.648 0.2 142.495)',
          'warning': 'oklch(0.769 0.188 70.08)',
          'error': 'oklch(0.637 0.237 25.331)',
        },
      },
    ],
  },
} satisfies Config
