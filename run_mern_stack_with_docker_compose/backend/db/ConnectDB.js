// Importing the pg package for PostgreSQL connection
const { Pool } = require("pg");

 const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    max: process.env.DB_CONNECTIONLIMIT ? parseInt(process.env.DB_CONNECTIONLIMIT) : 10,
    ssl: { rejectUnauthorized: false },
  });


// The async function to connect to PostgreSQL using credentials from .env
const ConnectDB = async () => {
    try {
       // Test connection
     await pool.query("SELECT 1");
     console.log("✅ PostgreSQL connected");
 
       // Create the users table if it doesn't exist
     await pool.query(`CREATE TABLE IF NOT EXISTS  ${process.env.DB_TABLENAME || 'users'} (
           id SERIAL PRIMARY KEY,
           name VARCHAR(50) NOT NULL,
           email VARCHAR(100) NOT NULL UNIQUE,
           created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          );
      `);

  console.log("✅ Users table ready");       //(`${process.env.DB_TABLENAME || 'users'} table created or already exists.`);
    return pool;    
}
      catch (error) {
         console.error("❌ PostgreSQL connection failed:", error);
           process.exit(1);
       }
 
 };

//exporting the function and pool
module.exports = {
  ConnectDB,
  pool
};