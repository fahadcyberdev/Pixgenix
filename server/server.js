import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routers/userRoutes.js';
import imageRouter from './routers/imageRoutes.js'; 
import paymentRouter from './routers/paymentRouts.js'; // <-- Add this line

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter); 
app.use('/api/payment', paymentRouter); // <-- Add this line

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

const store_id = process.env.STORE_ID;
const store_password = process.env.STORE_PASSWORD;
const is_live = false;

const startServer = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

startServer();
