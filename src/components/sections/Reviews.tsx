/* eslint-disable react/react-in-jsx-scope */
import { getI18N } from '@/languages/index'
import { FilledStar } from '@/icons/FilledStar'
import { Loading } from '@/icons/Loading'
import { useReviews } from '@/hooks/useReviews'
import { useRef } from 'preact/hooks'
import { useState } from 'preact/hooks'
import type { JSX } from 'preact'

export const Reviews = ({ currentLocale }: { currentLocale?: string }) => {
	const i18n = getI18N({ currentLocale })
	const formRef = useRef<HTMLFormElement | null>(null)
	const [rating, setRating] = useState(0)
	const {
		allReviews,
		reviewsCount,
		sending,
		loading,
		reviewsShowing,
		setReviewsShowing,
		sendReview,
	} = useReviews()

	const handleSubmit = async (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
		event.preventDefault()
		if (sending) return

		const { elements } = event.currentTarget
		const reviewTitleInput = elements.namedItem('review_title') as HTMLInputElement
		const messageInput = elements.namedItem('review_message') as HTMLTextAreaElement

		sendReview(
			{
				username: 'User',
				title: reviewTitleInput.value,
				description: messageInput.value,
				rating: rating,
				image: '/statics/user.svg',
			},
			currentLocale,
			() => {
				if (formRef.current) {
					formRef.current.reset()
				}
				setRating(1)
			}
		)
	}

	const handleRatingClick = (rate: number) => {
		if (sending) return
		setRating(rate)
	}

	return (
		<div className='flex flex-col gap-12'>
			<div>
				<form className='flex flex-col gap-2' ref={formRef} onSubmit={handleSubmit}>
					<label className='mb-1 inline-flex flex-col text-slate-400'>
						Title*
						<input
							required
							className='h-10 rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main'
							type='text'
							name='review_title'
							placeholder='Title'
							maxLength={40}
						/>
					</label>

					<label className='mb-1 inline-flex flex-col text-slate-400'>
						{i18n.MESSAGE}*
						<textarea
							required
							className='h-28 rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main'
							name='review_message'
							placeholder={i18n.MESSAGE_PLACEHOLDER}
						></textarea>
					</label>

					<label className='mb-1 inline-flex flex-col text-slate-400'>
						{i18n.RATING}*
						<div className='flex items-center space-x-1 rtl:space-x-reverse'>
							<FilledStar
								onClick={() => handleRatingClick(1)}
								classes={`size-4 text-slate-600 transition-colors cursor-pointer hover:text-yellow-300 ${rating >= 1 ? 'text-yellow-300' : ''}`}
							/>
							<FilledStar
								onClick={() => handleRatingClick(2)}
								classes={`size-4 text-slate-600 transition-colors cursor-pointer hover:text-yellow-300 ${rating >= 2 ? 'text-yellow-300' : ''}`}
							/>
							<FilledStar
								onClick={() => handleRatingClick(3)}
								classes={`size-4 text-slate-600 transition-colors cursor-pointer hover:text-yellow-300 ${rating >= 3 ? 'text-yellow-300' : ''}`}
							/>
							<FilledStar
								onClick={() => handleRatingClick(4)}
								classes={`size-4 text-slate-600 transition-colors cursor-pointer hover:text-yellow-300 ${rating >= 4 ? 'text-yellow-300' : ''}`}
							/>
							<FilledStar
								onClick={() => handleRatingClick(5)}
								classes={`size-4 text-slate-600 transition-colors cursor-pointer hover:text-yellow-300 ${rating >= 5 ? 'text-yellow-300' : ''}`}
							/>
						</div>
					</label>

					<button
						type='submit'
						{...(!sending ? {} : { disabled: true })}
						className={`group relative mt-4 flex w-full max-w-min flex-row items-center justify-center gap-2 overflow-hidden ${!sending ? 'cursor-pointer text-primary' : 'cursor-not-allowed bg-blue-900 text-slate-400'} ${sending ? '' : 'active:border-accent active:bg-transparent active:text-main sm:hover:border-main sm:hover:text-main'} rounded-xl border border-transparent px-4 py-2 text-lg font-bold transition`}
					>
						<span
							className={`absolute left-0 h-full w-full -skew-x-3 bg-main transition-all duration-300 ease-in-out group-active:w-0 sm:group-hover:w-0 ${sending ? 'hidden' : ''}`}
						></span>

						<span className='relative'>
							{!sending ? (
								<svg
									className='size-5'
									width='800px'
									height='800px'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<path d='M10 14l11 -11'></path>
									<path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5'></path>
								</svg>
							) : (
								<Loading classes='size-5' />
							)}
						</span>
						<span className='relative'>{`${!sending ? i18n.SEND : i18n.SENDING}`}</span>
					</button>
				</form>
			</div>

			<div className='flex flex-col gap-6'>
				<h2 className='font-bold text-primary'>
					{i18n.COSTUMERS_REVIEWS}{' '}
					{reviewsCount > 0 && (
						<span className='font-normal text-secondary/50'>(+{reviewsCount})</span>
					)}
				</h2>

				{loading && <Loading classes='size-8 mx-auto text-primary' />}

				{allReviews.length > 0 &&
					!loading &&
					allReviews.map((review) => (
						<article key={review.id} className='flex flex-col gap-2 rounded-lg bg-accent/5 p-4'>
							<div className='mb-4 flex items-center'>
								<img
									className='me-4 size-10 rounded-full'
									src={review.image}
									alt={review.username}
									loading='lazy'
									decoding='async'
								/>
								<div className='font-medium text-primary'>
									<p>{review.username}</p>
								</div>
							</div>
							<div className='mb-1 flex items-center space-x-1 rtl:space-x-reverse'>
								<FilledStar
									classes={`size-4 ${review.rating >= 1 ? 'text-yellow-300' : 'text-slate-600'}`}
								/>
								<FilledStar
									classes={`size-4 ${review.rating >= 2 ? 'text-yellow-300' : 'text-slate-600'}`}
								/>
								<FilledStar
									classes={`size-4 ${review.rating >= 3 ? 'text-yellow-300' : 'text-slate-600'}`}
								/>
								<FilledStar
									classes={`size-4 ${review.rating >= 4 ? 'text-yellow-300' : 'text-slate-600'}`}
								/>
								<FilledStar
									classes={`size-4 ${review.rating >= 5 ? 'text-yellow-300' : 'text-slate-600'}`}
								/>

								<h3 className='ms-2 text-sm font-semibold text-primary'>{review.title}</h3>
							</div>

							<p className='mb-2 text-slate-400'>&quot;{review.description}&quot;</p>
						</article>
					))}
			</div>

			{reviewsShowing < reviewsCount && (
				<button
					onClick={() => setReviewsShowing(reviewsShowing + 5)}
					className='mt-4 w-full rounded-lg px-4 py-2 text-lg font-bold text-primary transition'
				>
					{i18n.SHOW_MORE}
				</button>
			)}
		</div>
	)
}
