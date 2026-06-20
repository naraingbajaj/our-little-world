import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rozyatgnczvszlrargty.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvenlhdGduY3p2c3pscmFyZ3R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4ODU0MzQsImV4cCI6MjA5NzQ2MTQzNH0.JR_DMRfU_6p4Z-m9NY8x9f7z8OxEBNsNcDXa-yOdXUs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
