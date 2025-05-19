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
	const [allDates, setAllDates] = useState<Date[]>([])
	const [datesShowing, setDatesShowing] = useState(8)
	const [searching, setSearching] = useState(false)
	const [page, setPage] = useState(1)
	const [nameSort, setNameSort] = useState(false)
	const [timeSort, setTimeSort] = useState(false)
	const [statusSort, setStatusSort] = useState(false)
	const [todaysSort, setTodaysSort] = useState(false)
	const [tomorrowsSort, setTomorrowsSort] = useState(false)
	const [totalCount, setTotalCount] = useState(0)
	const [saving, setSaving] = useState(false)
	const { setValue, getValue, checkKey } = useLocalStorage('status_sort')
	const totalPages = Math.ceil(totalCount / datesShowing)

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
		const fetchData = async () => {
			setLoading(true)

			const from = 0
			const to = numberOfDates - 1
			const fetchBody = todaysSort
				? { from, to, column: 'date', value: currentDate }
				: tomorrowsSort
					? { from, to, column: 'date', value: tomorrowDate }
					: { from, to }

			const res = await fetch('/api/db/get-dates', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(fetchBody),
			})

			const { data, count, error }: { data: Date[]; count: number; error: any } = await res.json()

			if (error) {
				console.error('Error fetching dates:', error)
			}

			setTotalCount(count)

			let filtered = data
			if (search) {
				filtered = filtered.filter((date) => date.name.toLowerCase().includes(search.toLowerCase()))
			}

			setAllDates(filtered)
			setTotalCount(filtered.length)
			setLoading(false)
		}

		fetchData()
	}, [todaysSort, tomorrowsSort, numberOfDates, search])

	const sortedDates = useMemo(() => {
		const datesCopy = [...allDates]

		if (nameSort) datesCopy.sort((a, b) => a.name.localeCompare(b.name))

		if (timeSort) {
			datesCopy.sort((a, b) => Number(a.time.replace('-', '')) - Number(b.time.replace('-', '')))
		}

		if (statusSort) {
			datesCopy.sort((a, b) => {
				const priority: Record<string, number> = {
					[DateStatus.CONFIRMED]: 1,
					[DateStatus.PENDING]: 2,
					[DateStatus.DONE]: 3,
					[DateStatus.CANCELLED]: 4,
				}
				return priority[a.status] - priority[b.status]
			})
		}

		return datesCopy
	}, [allDates, nameSort, timeSort, statusSort])

	const paginatedDates = useMemo(() => {
		const from = (page - 1) * datesShowing
		const to = from + datesShowing
		return sortedDates.slice(from, to)
	}, [sortedDates, page, datesShowing])

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
		dates: paginatedDates,
		loading,
		page,
		searching,
		nameSort,
		timeSort,
		statusSort,
		todaysSort,
		tomorrowsSort,
		totalCount,
		totalPages,
		saving,
		datesShowing,
		setSaving,
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
