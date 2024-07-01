import db from '../models/db.js';

export const getMovies = (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const createMovie = (req, res) => {
  const { name, year, duration } = req.body;
  db.query('INSERT INTO movies (name, year, duration) VALUES (?, ?, ?)', [name, year, duration], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(201).send(`Movie added with ID: ${results.insertId}`);
  });
};

export const deleteMovie = (req, res) => {
  const movieId = req.params.id;
  db.query('DELETE FROM movies WHERE id = ?', [movieId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Movie not found');
    }
    res.status(200).send(`Movie deleted with ID: ${movieId}`);
  });
};

export const updateMovie = (req, res) => {
  const movieId = req.params.id;
  const { name, year, duration } = req.body;
  db.query('UPDATE movies SET name = ?, year = ?, duration = ? WHERE id = ?', [name, year, duration, movieId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Movie not found');
    }
    res.status(200).send(`Movie updated with ID: ${movieId}`);
  });
};