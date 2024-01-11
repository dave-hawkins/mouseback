import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Set the redirectTo property here
    // redirectTo: "/widget-demo.tsx",
  },
});

export default supabase;
