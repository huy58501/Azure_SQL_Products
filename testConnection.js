const sql = require('mssql');

// Configuration for Azure SQL Database
const config = {
    user: 'CloudSA1890ad1e', // Replace with your Azure SQL Database username
    password: '123456789a@', // Replace with your Azure SQL Database password
    server: 'tonyinthewild.database.windows.net', // Your server name
    database: 'tonyinthewild_products', // Replace with your database name
    options: {
        encrypt: true, // Use this for Azure SQL Database
        trustServerCertificate: false, // Change to true if you face issues
    }
};

async function testConnection() {
    try {
        // Connect to the database
        await sql.connect(config);
        console.log('Connected to the database successfully!');

        // Execute a simple query
        const result = await sql.query('SELECT * FROM Products'); // Replace with your table name
        console.log('Query result:', result.recordset);
    } catch (err) {
        console.error('SQL error:', err);
    } finally {
        // Close the connection
        await sql.close();
    }
}

testConnection();
