import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';

const imageRouter = express.Router();

// Protected route for image generation
imageRouter.post('/generate-image', userAuth, generateImage); // POST /api/image/generate-image

export default imageRouter;