import db from '../models/db.js';

export const getComments = (req, res) => {
  db.query('SELECT * FROM comments', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const createComment = (req, res) => {
  const { user_id, gender, country, comment } = req.body;

  // Verificar si el usuario existe
  db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, userResults) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (userResults.length === 0) {
      return res.status(404).send('User not found');
    }

    // Insertar el comentario si el usuario existe
    db.query('INSERT INTO comments (user_id, gender, country, comment) VALUES (?, ?, ?, ?)', [user_id, gender, country, comment], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send(err);
      }
      res.status(201).send(`Comment added with ID: ${results.insertId}`);
    });
  });
};

export const deleteComment = (req, res) => {
  const commentId = req.params.id;
  db.query('DELETE FROM comments WHERE id = ?', [commentId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Comment not found');
    }
    res.status(200).send(`Comment deleted with ID: ${commentId}`);
  });
};

export const updateComment = (req, res) => {
  const commentId = req.params.id;
  const { user_id, gender, country, comment } = req.body;

  // Verificar si el usuario existe
  db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, userResults) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (userResults.length === 0) {
      return res.status(404).send('User not found');
    }

    // Actualizar el comentario si el usuario existe
    db.query('UPDATE comments SET user_id = ?, gender = ?, country = ?, comment = ? WHERE id = ?', [user_id, gender, country, comment, commentId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Comment not found');
      }
      res.status(200).send(`Comment updated with ID: ${commentId}`);
    });
  });
};