// src/pages/api/admin-login.ts
import { supabase } from '@/db/supabase'
import bcrypt from 'bcryptjs'

interface RequestBody {
	username: string
	password: string
}

export async function POST({ request }: { request: Request }) {
	const { username, password }: RequestBody = await request.json()

	const { data, error } = await supabase
		.from('admins')
		.select('*')
		.eq('username', username)
		.single()

	if (error || !data) {
		return new Response(JSON.stringify({ error: 'Invalid username' }), { status: 401 })
	}

	// Check if the password is correct
	// Use bcrypt to compare the password with the hashed password in the database
	const validPassword = await bcrypt.compare(password, data.password)

	if (!validPassword) {
		return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })
	}

	// Create cookie of session
	// Set the cookie with HttpOnly, Secure, SameSite attributes 86400
	const oneDay = 60 * 60 * 24
	const issuedAt = Date.now()

	const sessionData = {
		username: data.username,
		issuedAt,
	}

	const base64Session = Buffer.from(JSON.stringify(sessionData)).toString('base64')

	const headers = new Headers()

	headers.append(
		'Set-Cookie',
		`admin_session=${base64Session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${oneDay}`
	)

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers,
	})
}
