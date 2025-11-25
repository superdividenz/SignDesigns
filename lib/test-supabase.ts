// Test Supabase connection
import { supabase } from '../lib/supabase';

export default async function testSupabaseConnection() {
  try {
    // Test connection by trying to get the current user
    const { data, error } = await supabase.auth.getUser();

    if (error && error.message !== 'Auth session missing!') {
      console.error('Supabase connection error:', error);
      return false;
    }

    console.log('✅ Supabase connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
}