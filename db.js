import mysql from 'mysql2/promise';

export async function executeQuery(query, values = []) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  try {
    const [rows] = await connection.execute(query, values);
    return rows;
  } finally {
    await connection.end();
  }
}