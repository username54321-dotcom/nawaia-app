import { createClient } from '@supabase/supabase-js';

const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const url = Deno.env.get('SUPABASE_URL') ?? '';

export const supabase = createClient(url, key);
