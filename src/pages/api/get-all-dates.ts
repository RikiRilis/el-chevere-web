import { supabase } from '@/db/supabase'

interface RequestBody {
	limit: number
	from: number
	to: number
}

export async function POST({ request }: { request: Request }) {
	const { limit, from, to }: RequestBody = await request.json()

	const { data, error } = await supabase.from('dates').select('*').range(from, to)

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ data }), { status: 200 })
}
