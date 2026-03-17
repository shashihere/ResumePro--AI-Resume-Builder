const mongoose = require('mongoose');
const Resume = require('./models/Resume'); // Adjust path if needed
const path = require('path');
const fs = require('fs');

const run = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/resumebuilder');
        console.log('Connected.');

        const indexes = await Resume.collection.indexes();
        console.log('Indexes:', JSON.stringify(indexes, null, 2));

        const count = await Resume.countDocuments({});
        console.log('Total Resumes:', count);

        const all = await Resume.find({}).select('user templateId title');
        console.log('Resumes:', JSON.stringify(all, null, 2));

        fs.writeFileSync('db_debug.log', JSON.stringify({ indexes, count, all }, null, 2));
        console.log('Log written to db_debug.log');

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
