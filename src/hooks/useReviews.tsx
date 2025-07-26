/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'preact/hooks'
import { getI18N } from '@/languages/index'
import type { Review } from '@/interfaces/review'

export function useReviews() {
	const [sending, setSending] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [allReviews, setAllReviews] = useState<Review[]>([])

	useEffect(() => {
		const fetchReviews = async () => {
			setLoading(true)

			const res = await fetch('/api/db/get-reviews', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ limit: 5 }), // Adjust as needed
			})

			const { data, error }: { data: Review[]; count: number; error: any } = await res.json()

			if (error) {
				console.error('Error fetching dates:', error)
			}

			setAllReviews(data)
			setLoading(false)
		}
		fetchReviews()
	}, [])

	const sendReview = async (
		reviewData: Review,
		currentLocale: string | undefined = 'es',
		callback: () => void
	) => {
		const i18n = getI18N({ currentLocale })

		setSending(true)
		setError(true)

		try {
			if (reviewData.title.length < 5 || reviewData.title.length > 40) {
				throw new Error('Error sending date')
			}

			// Insert the review into the database
			const response = await fetch('/api/db/insert-review', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...reviewData }),
			})

			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.message || 'Error sending date')
			}

			window.toast({
				dismissible: true,
				title: i18n.REVIEW_INSERTED,
				location: 'bottom-center',
				type: 'success',
				icon: true,
			})

			callback?.()
		} catch (error) {
			window.toast({
				dismissible: true,
				title: i18n.REVIEW_ERROR,
				location: 'bottom-center',
				type: 'error',
				icon: true,
			})

			console.error('Error sending review:', error)
			setError(true)
		} finally {
			setSending(false)
		}
	}

	return {
		allReviews,
		sending,
		error,
		loading,
		setError,
		sendReview,
	}
}
