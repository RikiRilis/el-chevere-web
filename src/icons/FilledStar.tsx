/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
interface Props {
	classes: string
	onClick?: () => void
}

export function FilledStar({ classes, onClick }: Props) {
	return (
		<svg
			onClick={onClick}
			className={classes}
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='currentColor'
			stroke='currentColor'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
			<path d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z'></path>
		</svg>
	)
}
