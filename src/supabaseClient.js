import { createClient } from '@supabase/supabase-js';

// ახლა გასაღებებს წაიღებს .env ფაილიდან
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);