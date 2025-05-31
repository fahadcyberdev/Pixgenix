import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/pixgenix`, {
           
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Stop the server if DB connection fails
    }
};

export default connectDB;
