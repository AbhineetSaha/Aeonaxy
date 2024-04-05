import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://tgbryxeajqjngiylypgg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnYnJ5eGVhanFqbmdpeWx5cGdnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjE2NDU5OSwiZXhwIjoyMDI3NzQwNTk5fQ.M8VNpQHJcL3MGjyCsMMcwsdu7ukSTod2c0SadXM2cd8"
);

export const auth = supabase.auth
export const storage = supabase.storage
export const emails = supabase.emails