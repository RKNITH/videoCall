import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Proper Error Handling: Log the specific error message
        console.error(`Error: ${error.message}`);

        // Exit process with failure (1) so the server doesn't run without a DB
        process.exit(1);
    }
};

export default connectDB;