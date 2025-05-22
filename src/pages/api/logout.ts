export async function GET() {
	return new Response(null, {
		status: 302,
		headers: {
			'Set-Cookie': 'admin_session=; Path=/; Max-Age=0',
			'Location': '/login',
		},
	})
}
