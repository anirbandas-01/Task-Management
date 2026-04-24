import pkg from "pg";

import dotenv from "dotenv";
dotenv.config();

const {Pool} = pkg;


const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    ssl: { rejectUnauthorized: false}
});

pool.connect().then(client => {
      console.log("Database connection establish");
      
      client.release();
})
 .catch(err=> {
    console.error("Database connection failed", err.message);
    process.exit(1);
 });

export default pool;