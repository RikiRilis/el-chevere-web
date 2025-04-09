export function useLocalStorage(key: string) {
	const setValue = (item: unknown) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(item))
		} catch (error) {
			console.log(error)
		}
	}

	const getValue = () => {
		try {
			const value = window.localStorage.getItem(key)
			console.log(value)
			return value ? JSON.parse(value) : null
		} catch (error) {
			console.log(error)
		}
	}

	const removeValue = () => {
		try {
			window.localStorage.removeItem(key)
		} catch (error) {
			console.log(error)
		}
	}

	return { setValue, getValue, removeValue }
}
