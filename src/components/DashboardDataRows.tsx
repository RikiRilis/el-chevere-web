import { getI18N } from '@/languages/index'

/* eslint-disable react/react-in-jsx-scope */
interface Props {
	idx: number
	name: string
	date: string
	time: string
	done?: boolean
	phone: string
	mode: string
	currentLocale?: string
}

export const DashboardDataRows = ({
	idx,
	name,
	date,
	time,
	done,
	phone,
	mode,
	currentLocale,
}: Props) => {
	const i18n = getI18N({ currentLocale })

	return (
		<tr
			className={`cursor-pointer transition-colors sm:hover:bg-blue-950/30 ${idx % 2 === 0 ? '' : 'bg-blue-950/10'}`}
		>
			<td className='px-6 py-4'>{idx + 1}</td>
			<td className='px-6 py-4'>{name}</td>
			<td className='px-6 py-4'>{phone}</td>
			<td className='px-6 py-4'>{date}</td>
			<td className='px-6 py-4'>{time}</td>
			<td className='px-6 py-4'>{mode}</td>
			<td className='px-6 py-4'>
				{done ? (
					<div className='flex flex-row items-center gap-2'>
						<span className='h-2.5 w-2.5 rounded-full bg-green-500'></span>
						<span>{i18n.DONE}</span>
					</div>
				) : (
					<div className='flex flex-row items-center gap-2'>
						<span className='h-2.5 w-2.5 rounded-full bg-orange-500'></span>
						<span>{i18n.PENDING}</span>
					</div>
				)}
			</td>
		</tr>
	)
}
