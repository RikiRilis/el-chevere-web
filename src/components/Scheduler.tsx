/* eslint-disable react/react-in-jsx-scope */

import { useRef, useState } from 'preact/hooks'
import { getI18N } from '@/languages/index'
import { businessWhatsApp } from '@/libs/consts'

export const Scheduler = ({ currentLocale }: { currentLocale?: string }) => {
	const [i18n] = useState(getI18N({ currentLocale }))
	const [sending, sendEmail] = useState(false)
	const formRef = useRef<HTMLFormElement | null>(null)

	const handleSubmit = (event: preact.JSX.TargetedEvent<HTMLFormElement, Event>) => {
		event.preventDefault()
		if (sending) return

		sendEmail(false)
	}

	return (
		<>
			<ul className='flex text-slate-400'>
				<li className='group pointer-events-none inline-flex cursor-default select-none items-center justify-center gap-1 rounded-tl-lg bg-accent/10 p-2 font-semibold text-accent'>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
						<path d='M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4'></path>
						<path d='M11.5 3a16.989 16.989 0 0 0 -1.826 4'></path>
						<path d='M12.5 3a16.989 16.989 0 0 1 1.828 4'></path>
						<path d='M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4'></path>
						<path d='M11.5 21a16.989 16.989 0 0 1 -1.826 -4'></path>
						<path d='M12.5 21a16.989 16.989 0 0 0 1.828 -4'></path>
						<path d='M2 10l1 4l1.5 -4l1.5 4l1 -4'></path>
						<path d='M17 10l1 4l1.5 -4l1.5 4l1 -4'></path>
						<path d='M9.5 10l1 4l1.5 -4l1.5 4l1 -4'></path>
					</svg>
					{i18n.WEB_SCHEDULE}
				</li>

				<li>
					<a
						href={businessWhatsApp}
						className='group inline-flex items-center justify-center gap-1 rounded-tr-lg border-transparent bg-green-800 p-2 text-slate-200'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9'></path>
							<path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1'></path>
						</svg>
						WhatsApp
					</a>
				</li>
			</ul>

			<hr className='h-0.5 w-full border-0 bg-gradient-to-r from-transparent via-sky-800 to-transparent md:inline-block' />

			<p className='text-sm font-light italic text-slate-600'>*{i18n.DATES_ADVICE}</p>

			<form ref={formRef} onSubmit={handleSubmit} className='mt-6 flex w-full flex-col gap-4'>
				<div className='flex flex-col gap-4 sm:flex-row sm:gap-8'>
					<div className='flex flex-col gap-4'>
						<label className='inline-flex flex-col text-slate-400'>
							{i18n.NAME}*
							<input
								type='text'
								name='date-name'
								id='date-name'
								placeholder='Jane Doe'
								autoCapitalize='words'
								autoComplete='name'
								className='focus:outline-main rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.MESSAGE}*
							<textarea
								className='focus:outline-main rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 placeholder:focus:invisible'
								name='date-message'
								id='date-message'
								rows={8}
								placeholder={i18n.DATES_MESSAGE_EXAMPLE}
							></textarea>
						</label>
					</div>

					<div className='flex flex-col gap-4'>
						<label className='inline-flex flex-col text-slate-400'>
							{i18n.EMAIL}*
							<input
								type='email'
								name='date-email'
								id='date-email'
								placeholder='email@email.com'
								autoComplete='email'
								className='focus:outline-main rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.DATE}*
							<input
								className='focus:outline-main rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 placeholder:focus:invisible'
								type='date'
								name='date-date'
								id='date-date'
								defaultValue={new Date().toISOString().split('T')[0]}
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.HOUR}*
							<input
								className='focus:outline-main rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 placeholder:focus:invisible'
								type='time'
								name='date-time'
								id='date-time'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.PHONE}*
							<input
								type='tel'
								name='date-phone'
								id='date-phone'
								placeholder='(000) 000-0000'
								autoComplete='tel'
								className='focus:outline-main rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 placeholder:focus:invisible'
							/>
						</label>
					</div>
				</div>

				<button
					type='submit'
					className={`mt-4 flex h-fit w-fit flex-row items-center justify-center gap-2 ${!sending ? 'bg-main cursor-pointer text-slate-200' : 'cursor-not-allowed bg-blue-900 text-slate-400'} ${sending ? '' : 'active:text-main sm:hover:border-main sm:hover:text-main active:border-cyan-600 active:bg-transparent sm:hover:bg-transparent'} rounded-xl border border-transparent px-3 py-2 text-lg font-bold transition`}
				>
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
						<svg className='size-5' width='38' height='38' viewBox='0 0 38 38'>
							<defs>
								<linearGradient x1='8.042%' y1='0%' x2='65.682%' y2='23.865%' id='a'>
									<stop stopColor='currentColor' stopOpacity='0' offset='0%' />
									<stop stopColor='currentColor' stopOpacity='.631' offset='63.146%' />
									<stop stopColor='currentColor' offset='100%' />
								</linearGradient>
							</defs>
							<g fill='none' fillRule='evenodd'>
								<g transform='translate(1 1)'>
									<path
										d='M36 18c0-9.94-8.06-18-18-18'
										id='Oval-2'
										stroke='url(#a)'
										strokeWidth='2'
									>
										<animateTransform
											attributeName='transform'
											type='rotate'
											from='0 18 18'
											to='360 18 18'
											dur='0.9s'
											repeatCount='indefinite'
										/>
									</path>
									<circle fill='currentColor' cx='36' cy='18' r='1'>
										<animateTransform
											attributeName='transform'
											type='rotate'
											from='0 18 18'
											to='360 18 18'
											dur='0.9s'
											repeatCount='indefinite'
										/>
									</circle>
								</g>
							</g>
						</svg>
					)}
					{i18n.SEND}
				</button>
			</form>
		</>
	)
}
