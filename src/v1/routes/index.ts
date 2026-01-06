import express from 'express';
import authRouter from './auth/auth.routes';
import noteRouter from './note/note.routes';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/notes', noteRouter);

export default router;