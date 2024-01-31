import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wrlzcfunbttcapuyljhq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybHpjZnVuYnR0Y2FwdXlsamhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MTg4NTcsImV4cCI6MjAyMjE5NDg1N30.oYZObeJ1CCB-VXEBVl6-ShYenGe22Q298pbT26NF6FE";

export const supabase = createClient(supabaseUrl, supabaseKey);
