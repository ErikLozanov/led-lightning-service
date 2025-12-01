const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
// CHANGE THIS: Use the SERVICE key instead of the generic KEY
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Service Key in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;