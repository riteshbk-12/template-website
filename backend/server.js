import pkg from 'pg';
import env from "dotenv"
const { Pool } = pkg;
env.config(); 

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: String(process.env.PG_PASSWORD),
    port: process.env.PG_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL');
    release();
});


export default pool;