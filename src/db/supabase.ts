// Supabase configuration
// import { getSecret } from 'astro:env/server'
import { createClient } from '@supabase/supabase-js'

// const SUPABASE_URL: string = getSecret('SUPABASE_URL')!
// const SUPABASE_ANON_KEY: string = getSecret('SUPABASE_ANON_KEY')!

const SUPABASE_URL = import.meta.env.SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY

console.log('SUPABASE_URL', SUPABASE_URL)
console.log('SUPABASE_ANON_KEY', SUPABASE_ANON_KEY)

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
