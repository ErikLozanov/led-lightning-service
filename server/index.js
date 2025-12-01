const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Test Route (To check if server is working)
app.get('/', (req, res) => {
  res.json({ message: 'LED Lightning Service Backend is running!' });
});

// 3. Get All Gallery Posts Route
app.get('/api/gallery', async (req, res) => {
  const { data, error } = await supabase
    .from('gallery_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  res.json(data);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});