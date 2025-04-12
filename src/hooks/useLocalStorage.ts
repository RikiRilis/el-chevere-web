export function useLocalStorage(key: string) {
	const setValue = (keySet: string = key, item: unknown) => {
		try {
			window.localStorage.setItem(keySet, JSON.stringify(item))
		} catch (error) {
			console.log(error)
		}
	}

	const getValue = (keyGet: string = key) => {
		try {
			const value = window.localStorage.getItem(keyGet)
			return value ? JSON.parse(value) : null
		} catch (error) {
			console.log(error)
		}
	}

	const removeValue = (keyRemove: string = key) => {
		try {
			window.localStorage.removeItem(keyRemove)
		} catch (error) {
			console.log(error)
		}
	}

	const checkKey = (keyCheck: string = key) => {
		try {
			return window.localStorage.getItem(keyCheck) !== null
		} catch (error) {
			console.log(error)
		}

		return false
	}

	return { setValue, getValue, removeValue, checkKey }
}
