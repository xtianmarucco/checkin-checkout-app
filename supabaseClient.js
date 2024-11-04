// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Estas variables deben estar en tu archivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Exportamos el cliente de Supabase para utilizarlo en todo el proyecto
export const supabase = createClient(supabaseUrl, supabaseAnonKey);