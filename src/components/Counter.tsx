/* eslint-disable react/react-in-jsx-scope */
import { useProgressiveNumber } from '@/hooks/useProgressiveNumber'
import { useEffect } from 'preact/hooks'
import { formatNumber } from '@/libs/formatNumbers'

interface Values {
	decimals?: number
	duration?: number
	final: number
	initial: number
}

export const Counter = ({ decimals, initial, final, duration }: Values) => {
	const [count, setCount] = useProgressiveNumber(duration, decimals, initial)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCount(String(final))
		}
	}, [])

	return <span>{formatNumber(Number(final))}+</span>
}
