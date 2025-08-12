import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getBalance, transferMoney } from '../controllers/accountcontroller.js';

const router = express.Router();

router.get("/balance",authMiddleware,getBalance);
router.post("/transfer",authMiddleware,transferMoney)

export default router;