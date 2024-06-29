import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(201).send(`User added with ID: ${results.insertId}`);
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(`User deleted with ID: ${userId}`);
  });
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(`User updated with ID: ${userId}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
