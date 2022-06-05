const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/globals');

const dbConn = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chat-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB...');
    } catch (error) {
        console.log(`${error.message}`);
        process.exit(1);
    }
};

module.exports = dbConn;
