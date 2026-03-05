import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  "https://xhplcknevgaoaumtdmzu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocGxja25ldmdhb2F1bXRkbXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MDU5NjAsImV4cCI6MjA3OTE4MTk2MH0.ETVMcCFXzKn1r-2Zx00N5dk5Gx7Fj7r0B2uWvU6Evwk",
   {
    auth: {
      persistSession: true, // must be true to store in localStorage
      detectSessionInUrl: true // helps on redirect-based auth flows
    }
  }
);
