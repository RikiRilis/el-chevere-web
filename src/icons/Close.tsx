/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */

interface Props {
	classes: string
}

export const Close = ({ classes }: Props) => {
	return (
		<svg
			width='28'
			height='28'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
			class={classes}
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18 6l-12 12' />
			<path d='M6 6l12 12' />
		</svg>
	)
}
