/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'preact/hooks'
import { getI18N } from '@/languages/index'

export const Scheduler = ({ currentLocale }: { currentLocale?: string }) => {
	const [i18n] = useState(getI18N({ currentLocale }))

	return (
		<>
			<ul className='flex text-slate-400'>
				<li>
					<a
						href=''
						className='group inline-flex items-center justify-center gap-1 rounded-tl-lg bg-accent/10 p-2 font-semibold text-accent'
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
					</a>
				</li>

				<li>
					<a
						href='https://wa.me/18095734173'
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

			<div className='mt-6 flex w-full flex-col gap-4 sm:flex-row sm:gap-8'>
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
							className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none placeholder:text-slate-500'
						/>
					</label>

					<label className='inline-flex flex-col text-slate-400'>
						{i18n.MESSAGE}*
						<textarea
							className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none placeholder:text-slate-500'
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
							className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none placeholder:text-slate-500'
						/>
					</label>

					<label className='inline-flex flex-col text-slate-400'>
						{i18n.DATE}*
						<input
							className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none'
							type='date'
							name='date-date'
							id='date-date'
							defaultValue={new Date().toISOString().split('T')[0]}
						/>
					</label>

					<label className='inline-flex flex-col text-slate-400'>
						{i18n.HOUR}*
						<input
							className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none'
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
							className='rounded-lg bg-accent/10 p-2 text-slate-200 outline-none placeholder:text-slate-500'
						/>
					</label>
				</div>
			</div>
		</>
	)
}
