import { useEffect } from 'preact/hooks'
import { useRef } from 'preact/hooks'
import { useState } from 'preact/hooks'

export function useSearch() {
	const [search, setSearch] = useState<string | null>(null)
	const [error, setError] = useState<string | null>()
	const isFirstInput = useRef(true)

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = search === ''
			return
		}

		if (search === null) {
			setError('Insert a value!')
			return
		}

		if (search.match(/^\d+$/)) {
			setError('Movie may not contain numbers!')
			return
		}

		if (search.length < 3) {
			setError('Atleast 3 characters, please!')
			return
		}

		setError(null)
	}, [search])

	return { search, setSearch, error }
}
