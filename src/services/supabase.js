import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jhievpobbtcffgbfwuou.supabase.co";
const supabaseKey = "sb_publishable_o9udkagy7k-auwZPJuRDTA_0pVcGCdh";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
