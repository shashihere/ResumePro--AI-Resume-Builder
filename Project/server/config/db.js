const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use a local DB string or env
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_builder');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('Make sure your MongoDB is running! (mongod.exe)');
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
