/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Date } from '@/interfaces/date'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface DashboardTableDatesProps {
	numberOfDates: number
	nameSort: boolean
	dateSort: boolean
	timeSort: boolean
	statusSort: boolean
	search?: string | null
}

export function useDashboardTableDates({
	numberOfDates,
	nameSort,
	dateSort,
	timeSort,
	statusSort,
	search = null,
}: DashboardTableDatesProps) {
	const [length, setLength] = useState<number | null>(null)
	const [loading, setLoading] = useState(true)
	const [dates, setDates] = useState<Date[]>([])
	const [datesShowing, setDatesShowing] = useState(numberOfDates)
	const [searching, setSearching] = useState(false)

	useEffect(() => {
		setLoading(true)

		const fetchData = async () => {
			const res = await fetch('/api/get-all-dates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const { data, error }: { data: Date[]; error: any } = await res.json()

			if (error) {
				console.error('Error fetching dates:', error)
			}

			setLength(data.length)
			if (search) {
				setDates(data.filter((date) => date.name.toLowerCase().includes(search.toLowerCase())))
			} else {
				setDates(data)
			}
		}

		fetchData()
		setLoading(false)
	}, [datesShowing, search])

	const sortOrderDates = useMemo(() => {
		const datesCopy = [...dates]
		const { setValue } = useLocalStorage('date_order_sort')
		setValue(statusSort)

		if (statusSort) datesCopy.sort((a, b) => a.name.localeCompare(b.name))
		else datesCopy.sort((a, b) => b.name.localeCompare(a.name))

		if (nameSort) datesCopy.sort((a, b) => b.name.localeCompare(a.name))
		if (timeSort) datesCopy.sort((a, b) => b.time.localeCompare(b.time))

		return datesCopy
	}, [nameSort, dateSort, timeSort, dates, search])

	return {
		dates: sortOrderDates,
		datesShowing,
		setDatesShowing,
		loading,
		searching,
		setSearching,
		length,
	}
}
