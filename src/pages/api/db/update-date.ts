import { supabase } from '@/db/supabase'

interface RequestBody {
	uuid: string
	status: string
}

export async function POST({ request }: { request: Request }) {
	const { uuid, status }: RequestBody = await request.json()

	const { data, error } = await supabase
		.from('dates')
		.update({ status: status })
		.eq('uuid', uuid)
		.select()

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	if (!data) {
		return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 })
	}

	return new Response(JSON.stringify({ data }), { status: 200 })
}
