import type { Date } from '@/interfaces/date'
import { getI18N } from '@/languages/index'
import { useState } from 'preact/hooks'

export function useScheduler() {
	const [sending, setSending] = useState(false)
	const [error, setError] = useState(false)

	const sendSchedule = (
		{ name, phone, email, date, time, message, mode }: Date,
		currentLocale: string | undefined = 'es',
		callback: () => void
	) => {
		const i18n = getI18N({ currentLocale })

		setSending(true)
		setError(false)

		// Calling an API to send the schedule to Supabase or any other service
		console.log({ name, phone, email, date, time, message, mode })

		setTimeout(() => {
			setSending(false)
			window.toast({
				dismissible: true,
				title: 'Schedule sent successfully!',
				location: 'bottom-center',
				type: 'success',
				icon: true,
			})
			callback()
		}, 2000)
	}

	return { sending, setSending, error, setError, sendSchedule }
}
