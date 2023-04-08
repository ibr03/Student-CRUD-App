const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// mongoDB connection
connectDB();

// Body-parser
app.use(express.urlencoded({ extended: true}));

// Set view engine
app.set('view engine', 'ejs'); // app.set('views', path.resolve(__dirname, 'views/ejs')) (IF VIEW TEMPLATES STORED IN ANOTHER FOLDER (eg. here in 'views/ejs'))

// Load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// Load routes
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) });