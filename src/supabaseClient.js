import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// დიაგნოსტიკა კონსოლში
console.log("Supabase URL Check:", supabaseUrl);

if (!supabaseUrl) {
    throw new Error("Supabase URL is missing! Check Vercel Env Variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
