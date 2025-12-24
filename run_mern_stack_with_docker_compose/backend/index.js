//importing express, environmental variables, bodyparser, router, database connection function and declaring them in a varibale to be using it in our index.js file
const express = require('express');
const dotenv = require('dotenv');
const { ConnectDB, pool } = require('./db/ConnectDB');
const router = require('./routes/DBOperRoutes');
const bodyParser = require('body-parser');
const cors = require("cors")

dotenv.config();

const app = express();
//using the port in environmental variable or 3000
const port = process.env.PORT || 3000;

// middleware to parse incoming request in bodies
app.use(express.json());
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Attach pool to every request
     app.use((req, res, next) => {
        req.pool = pool;
        next();
     });

 // use the router
     app.use("/", router);

// initialize the database connection pool
//let pool;

// Start server after DB connection

(async () => {
    await ConnectDB();

     app.listen(3000, '0.0.0.0', () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
})();