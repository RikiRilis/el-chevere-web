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
	const [timeSort, setTimeSort] = useState(true)
	const [statusSort, setStatusSort] = useState(false)
	const [todaysSort, setTodaysSort] = useState(false)
	const [tomorrowsSort, setTomorrowsSort] = useState(false)
	const [totalCount, setTotalCount] = useState(0)
	const [saving, setSaving] = useState(false)
	const [dateSort, setDateSort] = useState(true)
	const { setValue, getValue, checkKey } = useLocalStorage('status_sort')
	const totalPages = Math.ceil(totalCount / datesShowing)

	useEffect(() => {
		if (checkKey('name_sort')) setNameSort(getValue('name_sort'))
		if (checkKey('time_sort')) setTimeSort(getValue('time_sort'))
		if (checkKey('status_sort')) setStatusSort(getValue('status_sort'))
		if (checkKey('todays_sort')) setTodaysSort(getValue('todays_sort'))
		if (checkKey('date_sort')) setDateSort(getValue('date_sort'))
		if (checkKey('tomorrows_sort')) setTomorrowsSort(getValue('tomorrows_sort'))
	}, [])

	useEffect(() => {
		setValue('name_sort', nameSort)
		setValue('time_sort', timeSort)
		setValue('status_sort', statusSort)
		setValue('todays_sort', todaysSort)
		setValue('date_sort', dateSort)
		setValue('tomorrows_sort', tomorrowsSort)
	}, [nameSort, timeSort, statusSort, todaysSort, tomorrowsSort, dateSort])

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

			// Filter by search term if provided
			let filtered = data
			if (search) {
				filtered = filtered.filter((date) => date.name.toLowerCase().includes(search.toLowerCase()))
			}

			// Convert status to overdue if the date is past
			filtered = filtered.map((date) => {
				if (
					new Date(date.date) < new Date() &&
					date.status !== DateStatus.DONE &&
					date.status !== DateStatus.CANCELLED
				) {
					return { ...date, status: DateStatus.OVERDUE }
				}
				return date
			})

			setAllDates(filtered)
			setTotalCount(filtered.length)
			setLoading(false)
		}

		fetchData()
	}, [todaysSort, tomorrowsSort, numberOfDates, search])

	const sortedDates = useMemo(() => {
		const datesCopy = [...allDates]

		if (timeSort) {
			datesCopy.sort((a, b) => Number(a.time.replace('-', '')) - Number(b.time.replace('-', '')))
		}

		if (dateSort) {
			datesCopy.sort((a, b) => {
				const now = Date.now()
				const diffA = Math.abs(new Date(a.date).getTime() - now)
				const diffB = Math.abs(new Date(b.date).getTime() - now)
				return diffA - diffB
			})
		}

		if (nameSort) datesCopy.sort((a, b) => a.name.localeCompare(b.name))

		if (statusSort) {
			datesCopy.sort((a, b) => {
				const priority: Record<string, number> = {
					[DateStatus.CONFIRMED]: 1,
					[DateStatus.PENDING]: 2,
					[DateStatus.OVERDUE]: 3,
					[DateStatus.CANCELLED]: 4,
					[DateStatus.DONE]: 5,
				}
				return priority[a.status] - priority[b.status]
			})
		}

		return datesCopy
	}, [allDates, nameSort, timeSort, statusSort, dateSort])

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

	const convertReason = (reason: string, currentLocale: string = 'es') => {
		const i18n = getI18N({ currentLocale })
		switch (reason) {
			case 'month':
				return i18n.MONTH
			case 'birthday':
				return i18n.BIRTHDAYS
			case 'event':
				return i18n.EVENT
			case 'familiar':
				return i18n.FAMILIAR
			default:
				return reason
		}
	}

	const saveCurrentDate = async (status: string, uuid: string) => {
		setSaving(true)
		const res = await fetch('/api/db/update-date', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status, uuid }),
		})
		const { error }: { error: any } = await res.json()
		if (error) {
			console.error('Error saving date:', error)
		}

		const updatedDates = allDates.map((date) => {
			if (date.uuid === uuid) {
				return { ...date, status }
			}
			return date
		})
		setAllDates(updatedDates)

		setSaving(false)
	}

	const deleteDate = async (uuid: string) => {
		setSaving(true)
		const res = await fetch('/api/db/delete-date', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ uuid }),
		})
		const { error }: { error: any } = await res.json()
		if (error) {
			console.error('Error deleting date:', error)
		}

		const updatedDates = allDates.filter((date) => date.uuid !== uuid)
		setAllDates(updatedDates)
		setTotalCount(updatedDates.length)

		if (page > Math.ceil(updatedDates.length / datesShowing)) {
			setPage(Math.ceil(updatedDates.length / datesShowing))
		}

		setSaving(false)
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
		dateSort,
		setDateSort,
		setSaving,
		setNameSort,
		setTimeSort,
		setStatusSort,
		setTodaysSort,
		setTomorrowsSort,
		setSearching,
		convertMode,
		convertReason,
		setPage,
		setDatesShowing,
		saveCurrentDate,
		deleteDate,
	}
}
