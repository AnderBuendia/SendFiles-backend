const express = require('express');
const connectDB = require('./db/db');
const cors = require('cors');
const path = require('path');
const { existsSync, mkdirSync } = require('fs');
require('dotenv').config({path: 'config/variables.env'});

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
app.use(express.static('uploads'));

/* App routes */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

/* Uploads dir */
existsSync(path.join(__dirname, 'uploads')) || mkdirSync(path.join(__dirname, "uploads"));
app.use("uploads", express.static(path.join(__dirname, "uploads")));


/* App Setup */
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
})
