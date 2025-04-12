/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Date } from '@/interfaces/date'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { getI18N } from '@/languages/index'
import { currentDate, tomorrowDate } from '@/libs/consts'
import { DateStatus } from '@/interfaces/dateStatus'

interface DashboardTableDatesProps {
	numberOfDates: number
	search?: string | null
}

export function useDashboardTableDates({ numberOfDates, search = null }: DashboardTableDatesProps) {
	const [loading, setLoading] = useState(true)
	const [dates, setDates] = useState<Date[]>([])
	const [datesShowing, setDatesShowing] = useState(numberOfDates)
	const [searching, setSearching] = useState(false)
	const [page, setPage] = useState(1)
	const [nameSort, setNameSort] = useState(false)
	const [timeSort, setTimeSort] = useState(false)
	const [statusSort, setStatusSort] = useState(false)
	const [todaysSort, setTodaysSort] = useState(false)
	const [tomorrowsSort, setTomorrowsSort] = useState(false)
	const [totalCount, setTotalCount] = useState(0)
	const { setValue, getValue, checkKey } = useLocalStorage('status_sort')

	useEffect(() => {
		if (checkKey('name_sort')) setNameSort(getValue('name_sort'))
		if (checkKey('time_sort')) setTimeSort(getValue('time_sort'))
		if (checkKey('status_sort')) setStatusSort(getValue('status_sort'))
		if (checkKey('todays_sort')) setTodaysSort(getValue('todays_sort'))
		if (checkKey('tomorrows_sort')) setTomorrowsSort(getValue('tomorrows_sort'))
	}, [])

	useEffect(() => {
		setValue('name_sort', nameSort)
		setValue('time_sort', timeSort)
		setValue('status_sort', statusSort)
		setValue('todays_sort', todaysSort)
		setValue('tomorrows_sort', tomorrowsSort)
	}, [nameSort, timeSort, statusSort, todaysSort, tomorrowsSort])

	useEffect(() => {
		setLoading(true)

		const fetchData = async () => {
			const from = (page - 1) * datesShowing
			const to = from + datesShowing - 1
			const fetchBody = todaysSort
				? { from, to, column: 'date', value: currentDate }
				: tomorrowsSort
					? { from, to, column: 'date', value: tomorrowDate }
					: { from, to }

			const res = await fetch('/api/get-dates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(fetchBody),
			})

			const { data, count, error }: { data: Date[]; count: number; error: any } = await res.json()

			if (error) {
				console.error('Error fetching dates:', error)
			}

			if (search) {
				setDates(data.filter((date) => date.name.toLowerCase().includes(search.toLowerCase())))
				setTotalCount(count)
			} else {
				setDates(data)
				setTotalCount(count)
			}

			setLoading(false)
		}

		fetchData()
	}, [todaysSort, tomorrowsSort, datesShowing, search, page])

	const sortOrderDates = useMemo(() => {
		const datesCopy = [...dates]

		// Sort by name
		if (nameSort) datesCopy.sort((a, b) => a.name.localeCompare(b.name))

		// Sort by time
		if (timeSort)
			datesCopy.sort((a, b) => Number(a.time.split('-')[0]) - Number(b.time.split('-')[0]))

		// Sort by status
		if (statusSort) {
			datesCopy.sort((a, b) => {
				if (a.status === DateStatus.PENDING && b.status !== DateStatus.PENDING) return -1
				if (a.status !== DateStatus.PENDING && b.status === DateStatus.PENDING) return 1
				return 0
			})
		}

		return datesCopy
	}, [nameSort, timeSort, statusSort, dates, search])

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
		nameSort,
		timeSort,
		statusSort,
		todaysSort,
		tomorrowsSort,
		totalCount,
		setNameSort,
		setTimeSort,
		setStatusSort,
		setTodaysSort,
		setTomorrowsSort,
		setSearching,
		convertMode,
		setPage,
		setDatesShowing,
	}
}
