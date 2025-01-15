export const applyTheme = () => {
	window.getThemePreference = () => {
		const localItem = typeof localStorage !== 'undefined' && localStorage.getItem('theme')
		if (localItem) return localItem
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}

	const isDark = window.getThemePreference() === 'dark'
	document.documentElement.classList.toggle('dark', isDark)
}
