/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
interface Props {
	classes: string
}

export const Search = ({ classes }: Props) => {
	return (
		<svg className={classes} fill='none' viewBox='0 0 20 20'>
			<path
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
				d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
			/>
		</svg>
	)
}
