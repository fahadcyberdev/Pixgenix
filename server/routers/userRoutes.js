// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';
import userAuth from '../middlewares/auth.js';

const { registerUser, loginUser, userCredits } = userController;

const userRouter = express.Router();

// Routes
userRouter.post('/register', registerUser);      // POST /api/user/register
userRouter.post('/login', loginUser);            // POST /api/user/login
userRouter.get('/credits', userAuth, userCredits); // Protected: requires token

export default userRouter;
