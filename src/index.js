const express = require('express');
const connectDB = require('./db/db');
const cors = require('cors');
const path = require('path');
const { existsSync, mkdirSync } = require('fs');
require('dotenv').config({ path: '../.env' });

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);

    process.exit(1);
});

/* Create server */
const app = express();

/* DB Setup */
connectDB();
console.log('Initializing Server...');

/* Allow CORS */
const corsOptions = {
    origin: process.env.FRONTEND_URL
}

app.use(cors(corsOptions));

/* App PORT */
const port = process.env.PORT || 4000;

/* Read JSON body values */
app.use(express.json());

/* Allow public folder */
app.use(express.static('src/uploads'));

/* App routes */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

/* Uploads dir */
existsSync(path.join(__dirname, 'uploads')) || mkdirSync(path.join(__dirname, "uploads"));
app.use("uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/* App Setup */
const server = app.listen(
    port,
    console.log(`Server is running in ${process.env.NODE_ENV}
        on port ${port}`)
);

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);
    server.close(() => {
        // exit code 1 means that there is an issue that caused the program to exit
        process.exit(1);
    });
});
