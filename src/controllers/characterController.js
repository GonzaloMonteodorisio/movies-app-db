import db from '../models/db.js';

export const getCharacters = (req, res) => {
  db.query('SELECT * FROM characters', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const createCharacter = (req, res) => {
  const { image_url, name, house } = req.body;
  db.query('INSERT INTO characters (image_url, name, house) VALUES (?, ?, ?)', [image_url, name, house], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(201).send(`Character added with ID: ${results.insertId}`);
  });
};

export const deleteCharacter = (req, res) => {
  const characterId = req.params.id;
  db.query('DELETE FROM characters WHERE id = ?', [characterId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Character not found');
    }
    res.status(200).send(`Character deleted with ID: ${characterId}`);
  });
};

export const updateCharacter = (req, res) => {
  const characterId = req.params.id;
  const { image_url, name, house } = req.body;
  db.query('UPDATE characters SET image_url = ?, name = ?, house = ? WHERE id = ?', [image_url, name, house, characterId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Character not found');
    }
    res.status(200).send(`Character updated with ID: ${characterId}`);
  });
};