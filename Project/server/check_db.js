const mongoose = require('mongoose');
const User = require('./models/User');
const Resume = require('./models/Resume');
const dotenv = require('dotenv');

dotenv.config();

const inspectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_builder');
        console.log('--- Connected to MongoDB ---');

        const users = await User.find({});
        console.log(`\nFound ${users.length} Users:`);
        users.forEach(u => console.log(`- ${u.name} (${u.email}) [Role: ${u.role}]`));

        const resumes = await Resume.find({});
        console.log(`\nFound ${resumes.length} Resumes:`);
        resumes.forEach(r => console.log(`- Title: ${r.title}, UserID: ${r.user}`));

        console.log('\n----------------------------');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

inspectDB();
