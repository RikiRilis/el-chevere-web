import { supabase } from '@/db/supabase'

interface RequestBody {
	uuid: string
}

export async function POST({ request }: { request: Request }) {
	const { uuid }: RequestBody = await request.json()

	const { data, error } = await supabase.from('dates').delete().eq('uuid', uuid)

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ data }), { status: 200 })
}
