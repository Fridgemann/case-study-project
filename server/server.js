const express = require('express');
const app = express();
const cors = require('cors');
const PRODUCTS = require('./data/products.json');
const PORT = 5000;
const GOLD_API_KEY = 'goldapi-fmousmcrypac1-io';

app.use(cors());

app.get('/api/gold-price', async (req, res) => {
  try {
    const apiRes = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': GOLD_API_KEY,
        'Content-Type': 'application/json',
      }
    })

    const data = await apiRes.json()

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data.message || 'API error' })
    }

    const pricePerOunce = data.price
    const pricePerGram = pricePerOunce / 31.1035

    res.json({
      metal: 'gold',
      unit: 'gram',
      currency: 'USD',
      price_per_gram: Number(pricePerGram.toFixed(2))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})



app.get('/api/products', (req, res) => {
    res.json({ products: PRODUCTS, prices: 'hello' });
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})