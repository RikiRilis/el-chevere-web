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

const initialData: Date[] = [
	{
		name: 'John Doe',
		phone: '123-456-7890',
		email: 'john@example.com',
		date: '2025-04-08',
		time: '10:00 AM',
		message: 'Hello!',
		done: false,
		uuid: '',
		mode: '',
	},
	{
		name: 'Jane Smith',
		phone: '987-654-3210',
		email: 'jane@example.com',
		date: '2025-04-08',
		time: '11:00 AM',
		message: 'Hi there!',
		done: true,
		uuid: '',
		mode: '',
	},
	{
		name: 'John Doe',
		phone: '123-456-7890',
		email: 'john@example.com',
		date: '2025-04-08',
		time: '10:00 AM',
		message: 'Hello!',
		done: false,
		uuid: '',
		mode: '',
	},
	{
		name: 'Jane Smith',
		phone: '987-654-3210',
		email: 'jane@example.com',
		date: '2025-04-08',
		time: '11:00 AM',
		message: 'Hi there!',
		done: true,
		uuid: '',
		mode: '',
	},
	{
		name: 'John Doe',
		phone: '123-456-7890',
		email: 'john@example.com',
		date: '2025-04-08',
		time: '10:00 AM',
		message: 'Hello!',
		done: false,
		uuid: '',
		mode: '',
	},
	{
		name: 'Jane Smith',
		phone: '987-654-3210',
		email: 'jane@example.com',
		date: '2025-04-08',
		time: '11:00 AM',
		message: 'Hi there!',
		done: true,
		uuid: '',
		mode: '',
	},
]

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
		// getTableLength('dates').then((res) => {
		// 	if (res) setLength(res)
		// })

		setLength(initialData.length)

		// getRooms(datesShowing, search).then((res) => {
		// 	if (res && res.length > 0) {
		// 		setDates(res)
		// 	} else {
		// 		setDates([])
		// 	}

		// 	setLoading(false)
		// })

		if (search)
			setDates(initialData.filter((date) => date.name.toLowerCase().includes(search.toLowerCase())))
		else setDates(initialData)
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
