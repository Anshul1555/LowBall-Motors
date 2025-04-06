import express from 'express';
import { askQuestion } from '../../controllers/chat-controller.js';

const router = express.Router();

router.post('/', askQuestion);

export { router as askRoutes };
