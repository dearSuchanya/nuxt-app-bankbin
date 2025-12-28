export interface ThemeOption {
  id: string
  name: string
  icon: string
}

export const useTheme = () => {
  const themes: ThemeOption[] = [
    { id: 'wastebank', name: 'Light', icon: '☀️' },
    { id: 'wastebankDark', name: 'Dark', icon: '🌙' },
  ]

  const currentTheme = useState<string>('theme', () => 'wastebank')

  const setTheme = (theme: string) => {
    currentTheme.value = theme
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }

  const initTheme = () => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme') || 'wastebank'
      currentTheme.value = savedTheme
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }

  return {
    themes,
    currentTheme,
    setTheme,
    initTheme,
  }
}
