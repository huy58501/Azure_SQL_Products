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
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "blob:", "https://tonyinthewild.azurewebsites.net", "'unsafe-eval'"], // Add 'unsafe-eval' if required for certain scripts
            objectSrc: ["'none'"], // Prevent loading of other objects, like Flash or Java applets
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
    console.log("Received a request for /api/data"); // Add this line
    try {
        const products = await getProducts();
        res.json(products);
    } catch (err) {
        console.error('Error retrieving products:', err); // Log the error
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