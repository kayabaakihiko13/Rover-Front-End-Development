// composables/useTheme.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useTheme() {
    const theme = ref('system')
    const appliedTheme = ref('light')
    const isClient = typeof window !== 'undefined'
    let mediaQuery = null

    if (isClient) {
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    }

    const getSystemTheme = () => isClient ? (mediaQuery?.matches ? 'dark' : 'light') : 'light'

    const applyTheme = (mode) => {
        const actual = mode === 'system' ? getSystemTheme() : mode
        appliedTheme.value = actual

        if (isClient) {
            document.documentElement.classList.toggle('dark', actual === 'dark')
        }
    }

    const setTheme = (newTheme) => {
        theme.value = newTheme
        if (isClient) localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
    }

    const handleSystemChange = () => {
        if (theme.value === 'system') applyTheme('system')
    }

    onMounted(() => {
        if (!isClient) return
        const saved = localStorage.getItem('theme') || 'system'
        theme.value = saved
        applyTheme(saved)
        mediaQuery?.addEventListener('change', handleSystemChange)
    })

    onUnmounted(() => {
        mediaQuery?.removeEventListener('change', handleSystemChange)
    })

    return { theme, appliedTheme, setTheme }
}