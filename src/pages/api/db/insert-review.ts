import { supabase } from '@/db/supabase'

export async function POST({ request }: { request: Request }) {
	const { username, rating, title, description, image } = await request.json()

	const { error } = await supabase.from('reviews').insert([
		{
			username,
			rating,
			title,
			description,
			image,
		},
	])

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 })
	}

	return new Response(JSON.stringify({ message: 'Review inserted successfully' }), { status: 200 })
}
