/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
interface Props {
	classes: string
}

export const SemiArrow = ({ classes }: Props) => {
	return (
		<svg className={classes} fill='none' viewBox='0 0 10 6'>
			<path
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
				d='M9 5 5 1 1 5'
			></path>
		</svg>
	)
}
