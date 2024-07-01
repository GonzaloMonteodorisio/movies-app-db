import mysql from 'mysql2';
import { dbConfig } from '../config/config.js';

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

export default db;