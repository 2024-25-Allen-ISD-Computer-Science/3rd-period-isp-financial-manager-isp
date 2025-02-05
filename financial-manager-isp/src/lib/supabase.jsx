import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kdrzejfwglcinzgjbbzu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnplamZ3Z2xjaW56Z2piYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MDc3MTksImV4cCI6MjA1NDE4MzcxOX0.CxB4WhIe8EUTNbsALF7cKKTmF73ZkaaM0f2qJKK8JX0"

export const supabase = createClient(supabaseUrl, supabaseKey)