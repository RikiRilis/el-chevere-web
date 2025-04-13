import { DateStatus } from '@/interfaces/dateStatus'
import { getI18N } from '@/languages/index'

/* eslint-disable react/react-in-jsx-scope */
interface Props {
	idx: number
	name: string
	date: string
	time: string
	status?: string
	phone: string
	mode: string
	currentLocale?: string
}

export const DashboardDataRows = ({
	idx,
	name,
	date,
	time,
	status,
	phone,
	mode,
	currentLocale,
}: Props) => {
	const i18n = getI18N({ currentLocale })

	return (
		<tr
			className={`cursor-pointer transition-colors sm:hover:bg-blue-950/30 ${idx % 2 === 0 ? '' : 'bg-blue-950/10'}`}
		>
			<td className='p-3'>{idx}</td>
			<td className='px-6 py-4'>{name}</td>
			<td className='px-6 py-4'>{phone}</td>
			<td className='px-6 py-4'>{date}</td>
			<td className='px-6 py-4'>{time}</td>
			<td className='px-6 py-4'>{mode}</td>
			<td className='px-6 py-4'>
				{status === DateStatus.DONE ? (
					<div className='flex flex-row items-center gap-2'>
						<span className='size-3 rounded-full bg-green-500'></span>
						<span>{i18n.DONE}</span>
					</div>
				) : status === DateStatus.PENDING ? (
					<div className='flex flex-row items-center gap-2'>
						<span className='size-3 rounded-full bg-gray-500'></span>
						<span>{i18n.PENDING}</span>
					</div>
				) : status === DateStatus.CANCELLED ? (
					<div className='flex flex-row items-center gap-2'>
						<span className='size-3 rounded-full bg-red-500'></span>
						<span>{i18n.CANCELLED}</span>
					</div>
				) : (
					<div className='flex flex-row items-center gap-2'>
						<span className='size-3 rounded-full bg-orange-500'></span>
						<span>{i18n.CONFIRMED}</span>
					</div>
				)}
			</td>
		</tr>
	)
}
