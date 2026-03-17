const mongoose = require('mongoose');
const Resume = require('./models/Resume');
// Hardcoding URI for debugging certainty or using dotenv if available
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resumebuilder';

const fixIndexes = async () => {
    try {
        console.log('Connecting to:', MONGO_URI);
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Check Indexes
        const indexes = await Resume.collection.indexes();
        console.log('Current Indexes:', JSON.stringify(indexes, null, 2));

        // Find any index that has 'user' as part of the key and is unique
        // Usually mongoose creates 'user_1'
        const userIndex = indexes.find(idx => idx.key.user === 1 || (idx.key.user === 1 && idx.unique === true));

        if (userIndex) {
            console.log(`Found index: ${userIndex.name}. Dropping it...`);
            await Resume.collection.dropIndex(userIndex.name);
            console.log('Index dropped successfully.');
        } else {
            console.log('No specific user index found to drop.');
        }

        console.log('Database verification complete.');
        process.exit(0);
    } catch (error) {
        console.error('Script Error:', error);
        process.exit(1);
    }
};

fixIndexes();
