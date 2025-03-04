/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

import { useRef, useState } from 'preact/hooks'
import { getI18N } from '@/languages/index'
import { businessWhatsApp, businessEmail } from '@/libs/consts'
import { Loading } from '@/icons/Loading'

export const Scheduler = ({ currentLocale }: { currentLocale?: string }) => {
	const [i18n] = useState(getI18N({ currentLocale }))
	const [sending, sendEmail] = useState(false)
	const formRef = useRef<HTMLFormElement | null>(null)

	const handleSubmit = (event: preact.JSX.TargetedEvent<HTMLFormElement, Event>) => {
		event.preventDefault()
		if (sending) return

		alert('Not implemented yet!')
		sendEmail(true)
		setTimeout(() => {
			sendEmail(false)
		}, 3000)
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
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
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
						target='_blank'
						rel='noreferrer noopener'
						className='group inline-flex items-center justify-center gap-1 rounded-tr-lg border-transparent bg-green-800 p-2 text-slate-200'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9'></path>
							<path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1'></path>
						</svg>
						WhatsApp
					</a>
				</li>
			</ul>

			<hr className='h-0.5 w-full border-0 bg-gradient-to-r from-transparent via-accent to-transparent md:inline-block' />

			<p className='text-sm font-light italic text-slate-600'>*{i18n.DATES_ADVICE}</p>

			<form ref={formRef} onSubmit={handleSubmit} className='mt-6 flex w-full flex-col gap-4'>
				<div className='flex w-full flex-col gap-4 sm:flex-row sm:gap-8'>
					<div className='flex flex-1 flex-col gap-4'>
						<label className='inline-flex flex-col text-slate-400'>
							{i18n.NAME}*
							<input
								type='text'
								name='date-name'
								id='date-name'
								placeholder='Jane Doe'
								autoCapitalize='words'
								autoComplete='name'
								className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.MESSAGE}*
							<textarea
								className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
								name='date-message'
								id='date-message'
								rows={8}
								placeholder={i18n.DATES_MESSAGE_EXAMPLE}
							></textarea>
						</label>
					</div>

					<div className='flex flex-1 flex-col gap-4'>
						<label className='inline-flex flex-col text-slate-400'>
							{i18n.EMAIL}*
							<input
								type='email'
								name='date-email'
								id='date-email'
								placeholder={businessEmail}
								autoComplete='email'
								className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.PHONE}*
							<input
								type='tel'
								name='date-phone'
								id='date-phone'
								placeholder='(809) 573-4173'
								autoComplete='tel'
								className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.DATE}*
							<input
								className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
								type='date'
								name='date-date'
								id='date-date'
								defaultValue={new Date().toISOString().split('T')[0]}
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.HOUR}*
							<select
								className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
								name='date-time'
								id='date-time'
							>
								<option selected value='8:00 AM'>
									8:00 AM
								</option>
								<option value='8:40 AM'>8:40 AM</option>
								<option value='9:20 AM'>9:20 AM</option>
								<option value='10:00 AM'>10:00 AM</option>
								<option value='10:40 AM'>10:40 AM</option>
								<option value='11:20 AM'>11:20 AM</option>
								<option value='12:00 PM'>12:00 PM</option>
								<option value='12:40 PM'>12:40 PM</option>
								<option value='1:20 PM'>1:20 PM</option>
								<option value='2:00 PM'>2:00 PM</option>
								<option value='2:40 PM'>2:40 PM</option>
								<option value='3:20 PM'>3:20 PM</option>
								<option value='4:00 PM'>4:00 PM</option>
								<option value='4:40 PM'>4:40 PM</option>
								<option value='5:20 PM'>5:20 PM</option>
								<option value='6:00 PM'>6:00 PM</option>
							</select>
						</label>
					</div>
				</div>

				<button
					type='submit'
					{...(!sending ? {} : { disabled: true })}
					className={`mt-4 flex h-fit w-fit flex-row items-center justify-center gap-2 ${!sending ? 'cursor-pointer bg-main text-slate-200' : 'cursor-not-allowed bg-blue-900 text-slate-400'} ${sending ? '' : 'active:border-accent active:bg-transparent active:text-main sm:hover:border-main sm:hover:bg-transparent sm:hover:text-main'} rounded-xl border border-transparent px-3 py-2 text-lg font-bold transition`}
				>
					{!sending ? (
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
							className='size-5'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5' />
							<path d='M16 3v4' />
							<path d='M8 3v4' />
							<path d='M4 11h16' />
							<path d='M16 19h6' />
							<path d='M19 16v6' />
						</svg>
					) : (
						<Loading classes='size-5' />
					)}
					{i18n.SCHEDULE}
				</button>
			</form>
		</>
	)
}
