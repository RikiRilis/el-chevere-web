import { supabase } from '@/db/supabase'

interface RequestBody {
	limit: NumberConstructor
}

export async function POST({ request }: { request: Request }) {
	const { limit }: RequestBody = await request.json()

	let query = supabase
		.from('reviews')
		.select('*', { count: 'exact' })
		.order('created_at', { ascending: false })

	if (limit) {
		query = query.limit(limit)
	}

	const { data, count, error } = await query

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ data, count }), { status: 200 })
}
