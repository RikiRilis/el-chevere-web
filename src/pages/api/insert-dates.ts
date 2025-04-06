import { supabase } from '@/db/supabase'

export async function POST({ request }: { request: Request }) {
	const { uuid, name, email, message, phone, date, time, mode } = await request.json()

	const { error } = await supabase.from('dates').insert([
		{
			uuid,
			name,
			phone,
			email,
			date,
			time,
			message,
			mode,
		},
	])

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ message: 'Date inserted successfully' }), { status: 200 })
}
