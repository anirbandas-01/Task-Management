import pkg from "pg";

import dotenv from "dotenv";
dotenv.config();

const {Pool} = pkg;


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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