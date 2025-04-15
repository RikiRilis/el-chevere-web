/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Date } from '@/interfaces/date'
import { getI18N } from '@/languages/index'
import { useState } from 'preact/hooks'
import { DateStatus } from '@/interfaces/dateStatus'

const posibleDatesTime = [
	'8-00',
	'8-40',
	'9-20',
	'10-00',
	'10-40',
	'11-20',
	'12-00',
	'12-40',
	'13-20',
	'14-00',
	'14-40',
	'15-20',
	'16-00',
	'17-40',
	'17-20',
	'18-00',
]

const noDoubleDatesTime = ['8-00', '8-40', '9-20']

export function useScheduler() {
	const [sending, setSending] = useState(false)
	const [error, setError] = useState(false)

	const sendSchedule = async (
		scheduleData: Date,
		currentLocale: string | undefined = 'es',
		callback: () => void
	) => {
		const i18n = getI18N({ currentLocale })

		setSending(true)
		setError(false)

		try {
			if (!scheduleData) {
				throw new Error('Schedule data is required')
			}

			const scheduleTime: string = scheduleData.time
			const scheduleDate: string = scheduleData.date
			const date: string | undefined = posibleDatesTime.find((time) => time === scheduleTime)

			if (scheduleTime !== date || !date) {
				throw new Error('Invalid time')
			}

			// Check if the date is already taken
			const res = await fetch('/api/db/get-dates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					column: 'time',
					value: scheduleTime,
					column2: 'date',
					value2: scheduleDate,
				}),
			})

			const { data, error }: { data: Date[]; error: any } = await res.json()

			if (error) {
				console.error('Error fetching dates:', error)
			}

			if (data && data.length >= 2) {
				data.forEach((item: Date) => {
					if (
						item.status !== DateStatus.DONE &&
						item.time === scheduleTime &&
						item.date === scheduleDate
					) {
						throw new Error('Time already taken')
					}
				})
			}

			// Insert the date into the database
			const response = await fetch('/api/db/insert-dates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...scheduleData }),
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.message || 'Error sending date')
			}

			window.toast({
				dismissible: true,
				title: i18n.DATE_INSERTED,
				location: 'bottom-center',
				type: 'success',
				icon: true,
			})

			callback?.()
		} catch (error) {
			window.toast({
				dismissible: true,
				title: i18n.DATE_INSERTED_ERROR,
				location: 'bottom-center',
				type: 'error',
				icon: true,
			})

			setError(true)
			console.error('Error sending date:', error)
		} finally {
			setSending(false)
		}
	}

	return { sending, setSending, error, setError, sendSchedule }
}
