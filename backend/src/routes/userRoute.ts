import express from "express";
import { getAllUsers, signin, signup, userInfoUpdate } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin)
router.put("/",authMiddleware,userInfoUpdate)
router.get(`/bulk`,getAllUsers)

export default router;