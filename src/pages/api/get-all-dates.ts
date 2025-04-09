import { supabase } from '@/db/supabase'

export async function POST() {
	const { data, error } = await supabase.from('dates').select('*')

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ data }), { status: 200 })
}
