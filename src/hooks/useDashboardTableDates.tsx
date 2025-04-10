/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Date } from '@/interfaces/date'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { getI18N } from '@/languages/index'

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
	const [loading, setLoading] = useState(true)
	const [dates, setDates] = useState<Date[]>([])
	const [datesShowing, setDatesShowing] = useState(numberOfDates)
	const [searching, setSearching] = useState(false)
	const [page, setPage] = useState(1)

	useEffect(() => {
		setLoading(true)

		const fetchData = async () => {
			const from = (page - 1) * datesShowing
			const to = from + datesShowing - 1

			const res = await fetch('/api/get-all-dates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					limit: datesShowing,
					from: from,
					to: to,
				}),
			})

			const { data, error }: { data: Date[]; error: any } = await res.json()

			if (error) {
				console.error('Error fetching dates:', error)
			}

			if (search) {
				setDates(data.filter((date) => date.name.toLowerCase().includes(search.toLowerCase())))
			} else {
				setDates(data)
			}

			setLoading(false)
		}

		fetchData()
	}, [datesShowing, search, page])

	const sortOrderDates = useMemo(() => {
		const datesCopy = [...dates]
		const { setValue } = useLocalStorage('date_order_sort')
		setValue(statusSort)

		if (nameSort) datesCopy.sort((a, b) => a.name.localeCompare(b.name))

		// if (timeSort) datesCopy.sort((a, b) => a.time.localeCompare(b.time))

		// if (statusSort) datesCopy.sort((a, b) => a.done?.localeCompare(b.done))
		// else datesCopy.sort((a, b) => b.name.localeCompare(a.name))

		return datesCopy
	}, [nameSort, dateSort, timeSort, dates, search])

	const convertMode = (mode: string, currentLocale: string = 'es') => {
		const i18n = getI18N({ currentLocale })

		switch (mode) {
			case 'time':
				return i18n.SHEDULE_TYPE_TIME
			case 'digital':
				return i18n.SHEDULE_TYPE_DIGITAL
			case 'both':
				return i18n.SHEDULE_TYPE_BOTH
			default:
				return mode
		}
	}

	return {
		dates: sortOrderDates,
		loading,
		page,
		searching,
		setSearching,
		convertMode,
		setPage,
		setDatesShowing,
	}
}
