const express = require('express');
const cors = require('cors'); // Import cors
const { connectDB, getProducts } = require('./db');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

const helmet = require('helmet'); // Import helmet

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // Allow content from the same origin
            scriptSrc: ["'self'", "blob:", "https://your-allowed-sources.com"], // Adjust to allow specific external sources
        },
    },
}));

// Connect to the database
connectDB();

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Middleware to serve static files
app.use(express.static('public'));

// Route to get all products
app.get('/api/data', async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).send('Error retrieving products');
    }
});

// Route for the root URL (optional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});