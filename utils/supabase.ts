import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
const supabaseUrl =
  process.env.EXPO_SUPABASE_BASE_URL || 'https://hdxnyotrpjmrigmpdpkn.supabase.co';
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeG55b3RycGptcmlnbXBkcGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTQyMDgsImV4cCI6MjA3NTQzMDIwOH0.CzVGOVOXPqI4bZtlcDmmqgx0UKQRKpuR5mooSs2fLcw';

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? window.localStorage : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
