/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

import { useRef, useState, useEffect } from 'preact/hooks'
import { getI18N } from '@/languages/index'
import { businessWhatsApp, businessEmail } from '@/libs/consts'
import { Loading } from '@/icons/Loading'
import { getSchedule } from '@/services/schedule'

export const Scheduler = ({ currentLocale }: { currentLocale?: string }) => {
	const [i18n] = useState(getI18N({ currentLocale }))
	const [sending, sendEmail] = useState(false)
	const [scheduleOptins, setScheduleOptions] = useState(getSchedule())
	const formRef = useRef<HTMLFormElement | null>(null)

	useEffect(() => {
		const options = getSchedule().filter((value) => value.available === true)
		setScheduleOptions(options)
	}, [])

	const handleSubmit = (event: preact.JSX.TargetedEvent<HTMLFormElement, Event>) => {
		event.preventDefault()

		const { elements } = event.currentTarget
		const termsCheckbox = elements.namedItem('schedule-agree') as HTMLInputElement
		if (!termsCheckbox.checked) {
			window.toast({
				dismissible: true,
				title: i18n.ACCEPT_TERMS,
				location: 'bottom-center',
				type: 'warning',
				icon: true,
			})

			return
		}

		if (sending) return

		window.toast({
			dismissible: true,
			title: 'Service not implemented yet!',
			location: 'bottom-center',
			type: 'error',
			icon: true,
		})

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
						className='group inline-flex items-center justify-center gap-1 rounded-tr-lg border-transparent bg-green-800 p-2 text-primary'
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
								required
								type='text'
								name='date-name'
								id='date-name'
								placeholder='Jane Doe'
								autoCapitalize='words'
								autoComplete='name'
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.EMAIL}*
							<input
								required
								type='email'
								name='date-email'
								id='date-email'
								placeholder={businessEmail}
								autoComplete='email'
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.MESSAGE}*
							<textarea
								required
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
								name='date-message'
								id='date-message'
								rows={4}
								placeholder={i18n.DATES_MESSAGE_EXAMPLE}
							></textarea>
						</label>
					</div>

					<div className='flex flex-1 flex-col gap-4'>
						<label className='inline-flex flex-col text-slate-400'>
							{i18n.PHONE}*
							<input
								required
								type='tel'
								name='date-phone'
								id='date-phone'
								placeholder='(809) 573-4173'
								autoComplete='tel'
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.DATE}*
							<input
								required
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
								type='date'
								name='date-date'
								id='date-date'
								defaultValue={new Date().toISOString().split('T')[0]}
							/>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.HOUR}*
							<select
								required
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
								name='date-time'
								id='date-time'
							>
								{scheduleOptins.map((option) => (
									<option key={option.id} className='bg-blue-950' value={option.id}>
										{option.hour}
									</option>
								))}
							</select>
						</label>

						<label className='inline-flex flex-col text-slate-400'>
							{i18n.MODALITY}*
							<select
								required
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
								name='date-mode'
								id='date-mode'
							>
								<option className='bg-blue-950' value='time'>
									{i18n.SHEDULE_TYPE_TIME}
								</option>
								<option className='bg-blue-950' value='digital'>
									{i18n.SHEDULE_TYPE_DIGITAL}
								</option>
								<option className='bg-blue-950' value='both'>
									{i18n.SHEDULE_TYPE_BOTH}
								</option>
							</select>
						</label>
					</div>
				</div>

				<div className='mt-4 flex items-center gap-2'>
					<input
						required
						id='date-agree'
						name='date-agree'
						type='checkbox'
						value=''
						className='h-4 w-4 cursor-pointer rounded-md border-gray-600 bg-gray-700 ring-offset-gray-800'
					/>
					<label for='date-agree' className='text-sm font-medium text-primary'>
						*{i18n.SCHEDULE_AGREE_TEXT_1}{' '}
						<a
							href='/terms'
							className='text-accent transition-colors hover:text-secondary hover:underline active:text-secondary active:underline'
						>
							{' '}
							{i18n.TERMS}
						</a>{' '}
						{i18n.SCHEDULE_AGREE_TEXT_2}{' '}
						<a
							href='/privacy'
							className='text-accent transition-colors hover:text-secondary hover:underline active:text-secondary active:underline'
						>
							{i18n.PRIVACY}
						</a>{' '}
						{i18n.SCHEDULE_AGREE_TEXT_3}.
					</label>
				</div>

				<button
					type='submit'
					{...(!sending ? {} : { disabled: true })}
					className={`group relative flex h-fit w-fit flex-row items-center justify-center gap-2 overflow-hidden ${!sending ? 'cursor-pointer text-primary' : 'cursor-not-allowed bg-blue-900 text-slate-400'} ${sending ? '' : 'active:border-accent active:text-main sm:hover:border-main sm:hover:text-main'} rounded-xl border border-transparent px-3 py-2 text-lg font-bold transition`}
				>
					<span className='absolute left-0 h-full w-full -skew-x-3 bg-main transition-all duration-300 ease-in-out group-active:w-0 sm:group-hover:w-0'></span>
					<span className='relative'>
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
					</span>
					<span className='relative'>{i18n.SCHEDULE}</span>
				</button>
			</form>
		</>
	)
}
