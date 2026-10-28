import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Bangla digits, e.g. 185 -> ১৮৫
export const bn = (n) => Number(n).toLocaleString('bn-BD');
