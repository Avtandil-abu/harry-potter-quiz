import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ეს დაგვეხმარება დიაგნოსტიკაში
if (!supabaseUrl || !supabaseUrl.startsWith('https')) {
    console.error("Vercel ვერ ხედავს სწორ URL-ს! მნიშვნელობა არის:", supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseKey);


export const supabase = createClient(supabaseUrl, supabaseKey);