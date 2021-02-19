const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.DB_URI, {
        // dbName: process.env.DB_NAME, // mongo docker-compose
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    console.log(`DB Connected: ${connect.connection.host}`);
}

module.exports = connectDB;