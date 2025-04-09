/* eslint-disable react/react-in-jsx-scope */
interface Props {
	classes: string
}

export function SortAscending({ classes }: Props) {
	return (
		<svg
			className={classes}
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
			<path d='M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4'></path>
			<path d='M19 21h-4l4 -7h-4'></path>
			<path d='M4 15l3 3l3 -3'></path>
			<path d='M7 6v12'></path>
		</svg>
	)
}
