const express = require('express');
const app = express();
const cors = require('cors');
const PRODUCTS = require('./data/products.json');
const PORT = 5000;
const GOLD_API_KEY = 'goldapi-45f3dsmct8jie8-io'; 
// i have tried to limit the number of api calls to a call per 10 minute to avoid passing the limit of free tier allowed api calls

app.use(cors());

let cachedGoldPrice = null;
let lastFetched = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const GOLD_API_URL = 'https://www.goldapi.io/api/XAU/USD';

app.get('/api/products', async (req, res) => {
  try {
    const now = Date.now();
    if (!cachedGoldPrice || now - lastFetched > CACHE_DURATION) {
      const goldRes = await fetch(GOLD_API_URL, {
        headers: {
          'x-access-token': GOLD_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      const data = await goldRes.json();

      if (!goldRes.ok || !data.price) {
        return res.status(goldRes.status).json({ error: data.message || 'Gold price API error' });
      }

      const pricePerGram = data.price / 31.1035;
      cachedGoldPrice = Number(pricePerGram.toFixed(2));
      lastFetched = now;
    }

    const products = PRODUCTS

    const enrichedProducts = products.map(p => ({
      ...p,
      price: Number(((p.popularityScore + 1) * p.weight * cachedGoldPrice).toFixed(2))
    }));

    const { sortBy } = req.query;

    const sortedProducts = [...enrichedProducts];

    if (sortBy === 'price_asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity_asc') {
      sortedProducts.sort((a, b) => a.popularityScore - b.popularityScore);
    } else if (sortBy === 'popularity_desc') {
      sortedProducts.sort((a, b) => b.popularityScore - a.popularityScore);
    }


    res.json({ products: sortedProducts });

  } catch (err) {
    console.error('Server error in /api/products:', err.stack || err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})