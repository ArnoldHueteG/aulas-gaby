import { Pool } from 'pg';

// Initialize database pool (config as needed)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  ssl: {
    rejectUnauthorized: false,
  }
});

export async function getAulas() {
  const client = await pool.connect();
  try {
    const res = await client.query(`select distinct id_aula as id_instalaciones from asignaciones_por_aula order by id_aula`);
    return res.rows;
  } finally {
    client.release();
  }
}