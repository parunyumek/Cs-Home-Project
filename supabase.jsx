import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ywixopnfgsitqlrqgcpz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3aXhvcG5mZ3NpdHFscnFnY3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MTc4MTksImV4cCI6MjAyMjA5MzgxOX0.8vW_ItHvjdSjrD6o7TNkvgiAyn2sSSzmDXDpkGK3oNQ";

export const supabase = createClient(supabaseUrl, supabaseKey);


