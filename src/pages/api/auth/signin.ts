import { supabase } from '@/db/supabase'

interface SignInRequestBody {
	email: string
	password: string
}

export async function POST(request: Request) {
	const { email, password }: SignInRequestBody = await request.json()

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 401 })
	}

	return new Response(JSON.stringify({ data }), { status: 200 })
}
