import { supabase } from '@/db/supabase'

interface RequestBody {
	username: string
}

export async function POST({ request }: { request: Request }) {
	const { username }: RequestBody = await request.json()

	const { data, error } = await supabase
		.from('admins')
		.select('*')
		.eq('username', username)
		.single()

	if (error || !data) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
	}

	const headers = new Headers()
	headers.append(
		'Set-Cookie',
		`admin_session=${data.uid}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
	)

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers,
	})
}
