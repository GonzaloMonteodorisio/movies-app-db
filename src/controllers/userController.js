import db from '../models/db.js';

export const getUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const createUser = (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(201).send(`User added with ID: ${results.insertId}`);
  });
};

export const deleteUser = (req, res) => {
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
};

export const updateUser = (req, res) => {
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
};