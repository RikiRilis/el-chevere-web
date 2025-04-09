import { supabase } from '@/db/supabase'

interface RequestBody {
	column: string
	value: string
	column2: string
	value2: string
}

export async function POST({ request }: { request: Request }) {
	const { column, value, column2, value2 }: RequestBody = await request.json()

	const { data, error } = await supabase
		.from('dates')
		.select('*')
		.eq(column, value)
		.eq(column2, value2)

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ data }), { status: 200 })
}
