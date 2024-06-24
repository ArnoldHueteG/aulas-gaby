// calendar.ts

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

export async function getCalendarData() {
  const client = await pool.connect();
  try {
    const res = await client.query(`select
    concat(case when "Ccl Lvo"='1270' then 'CPE' else 'PREGRADO' end,' - ',"Descr",' - ',"Sección") as "curso",
    "DIA_CLASE" as dia,
    "F.Ini_ModReu" + INTERVAL '1 day' * (case when "DIA_CLASE" = 'Lunes' then 0
                            when "DIA_CLASE" = 'Martes' then 1
                            when "DIA_CLASE" = 'Miércoles' then 2
                            when "DIA_CLASE" = 'Jueves' then 3
                            when "DIA_CLASE" = 'Viernes' then 4
                            when "DIA_CLASE" = 'Sábado' then 5
                            when "DIA_CLASE" = 'Domingo' then 6
                            else 0 end) + "Hr Ini Cls"::INTERVAL as fecha_ini,
    "F.Ini_ModReu" + INTERVAL '1 day' * (case when "DIA_CLASE" = 'Lunes' then 0
                            when "DIA_CLASE" = 'Martes' then 1
                            when "DIA_CLASE" = 'Miércoles' then 2
                            when "DIA_CLASE" = 'Jueves' then 3
                            when "DIA_CLASE" = 'Viernes' then 4
                            when "DIA_CLASE" = 'Sábado' then 5
                            when "DIA_CLASE" = 'Domingo' then 6
                            else 0 end) + "Hr Fin Cls"::INTERVAL as fecha_fin
from pregrado
where "ID Instal" = 'UV06_105'`);
    return res.rows;
  } finally {
    client.release();
  }
}