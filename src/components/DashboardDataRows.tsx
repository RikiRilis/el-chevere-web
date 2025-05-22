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
	data_row: string
	onClick: (event: preact.JSX.TargetedEvent<HTMLTableRowElement, Event>) => void
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
	data_row,
	onClick,
}: Props) => {
	const i18n = getI18N({ currentLocale })

	return (
		<tr
			data-row={data_row}
			onClick={onClick}
			className={`cursor-pointer transition-colors sm:hover:bg-blue-950/30 ${idx % 2 === 0 ? '' : 'bg-blue-950/10'}`}
		>
			<td className='w-10 p-3'>{idx}</td>
			<td className='w-48 truncate px-2 py-4'>{name}</td>
			<td className='w-32 px-2 py-4'>{phone}</td>
			<td className='w-28 px-2 py-4'>{date}</td>
			<td className='w-20 px-2 py-4'>{time}</td>
			<td className='w-28 px-2 py-4'>{mode}</td>
			<td className='w-36 px-2 py-4'>
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
