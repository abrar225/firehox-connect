import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !url.startsWith('http') || !anonKey) {
    console.warn('Supabase variables are missing. If this is during a build, this is expected. In production, check your environment variables.');
    // Return a dummy client or handle it to prevent build crash
    return createBrowserClient('https://placeholder.supabase.co', 'placeholder');
  }

  return createBrowserClient(url, anonKey)
}
