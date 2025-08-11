import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getBalance } from '../controllers/accountcontroller.js';

const router = express.Router();

router.get("/balance",authMiddleware,getBalance);

export default router