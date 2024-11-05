// db.js
const sql = require('mssql');
require('dotenv').config();

// Database configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to false if you have a valid certificate
    }
};

// Function to connect to the database
const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Connected to Azure SQL Database');
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

// Function to get products
const getProducts = async () => {
    try {
        const result = await sql.query('SELECT * FROM Products');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw err;
    }
};

// Export the connection and product fetching functions
module.exports = {
    connectDB,
    getProducts
};
