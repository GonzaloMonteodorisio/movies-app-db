import express from 'express';
import { getCharacters, createCharacter, deleteCharacter, updateCharacter } from '../controllers/characterController.js';

const router = express.Router();

router.get('/characters', getCharacters);
router.post('/characters', createCharacter);
router.delete('/characters/:id', deleteCharacter);
router.put('/characters/:id', updateCharacter);

export default router;