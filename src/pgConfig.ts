import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "TestOrder",
    password: "mahesh@2627",
    port: 5432,
});

export default pool;
