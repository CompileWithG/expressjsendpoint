const express = require('express');
const axios = require('axios'); 

const app = express();
const unsplashApiKey = 'HRJ1jk96-E93q32Tbh-UzZhXVf1pyhB2Fm73mTefDPI'; 
app.get('/', (req, res) => {
  res.send('Successful response.');
});
app.get('/:query', async (req, res) => {
  const { query } = req.params;
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  let random=Math.floor(Math.random()*10);
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: unsplashApiKey,
      },
    });
    res.redirect(response.data.results[random].urls.regular);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});