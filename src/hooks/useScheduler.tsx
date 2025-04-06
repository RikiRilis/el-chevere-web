/* eslint-disable @typescript-eslint/no-explicit-any */
import { getI18N } from '@/languages/index'
import { useState } from 'preact/hooks'

const posibleDatesTime = [
	'8-00-am',
	'8-40-am',
	'9-20-am',
	'10-00-am',
	'10-40-am',
	'11-20-am',
	'12-00-pm',
	'12-40-pm',
	'1-20-pm',
	'2-00-pm',
	'2-40-pm',
	'3-20-pm',
	'4-00-pm',
	'4-40-pm',
	'5-20-pm',
	'6-00-pm',
]

export function useScheduler() {
	const [sending, setSending] = useState(false)
	const [error, setError] = useState(false)

	const sendSchedule = async (
		scheduleData: any,
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
			const date: string | undefined = posibleDatesTime.find((time) => time === scheduleTime)

			if (scheduleTime !== date || !date) {
				throw new Error('Invalid time')
			}

			const response = await fetch('/api/insert-dates', {
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
