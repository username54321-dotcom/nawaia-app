import { createClient } from '@supabase/supabase-js';
import { Database } from './utils/database.types';

// Use your actual env vars here for the test
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function checkTypes() {
  // Test autocomplete here
  const { data, error } = await supabase.from('courses').select('');

  if (data) {
    // Test if the resulting type is correct. Hover over `firstCourse`
    const firstCourse = data[0];
    // Autocomplete should work here for firstCourse.title, firstCourse.price etc.
  }
}
