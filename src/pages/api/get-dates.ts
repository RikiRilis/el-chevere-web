import { supabase } from '@/db/supabase'

interface RequestBody {
	limit: number
	from: number
	to: number
	column: string
	value: string
	column2: string
	value2: string
}

export async function POST({ request }: { request: Request }) {
	const { limit, from, to, column, value, column2, value2 }: RequestBody = await request.json()

	let query = supabase
		.from('dates')
		.select('*', { count: 'exact' })
		.order('timestamp', { ascending: false })

	if (column && value) {
		query = query.eq(column, value)
	}

	if (column2 && value2) {
		query = query.eq(column2, value2)
	}

	if (from !== undefined && to !== undefined) {
		query = query.range(from, to)
	}

	if (limit) {
		query = query.limit(limit)
	}

	const { data, count, error } = await query

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ data, count }), { status: 200 })
}
