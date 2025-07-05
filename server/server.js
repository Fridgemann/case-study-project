const express = require('express');
const app = express();
const cors = require('cors');
const PRODUCTS = require('./data/products.json');

const PORT = 5000;

app.use(cors());

app.get('/api/products', (req, res) => {
    res.json({ products: PRODUCTS });
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})