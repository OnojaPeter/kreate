const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use('css', express.static('public/css', { 'extensions': ['css']}));

app.set('view engine', 'ejs');

// mongodb connetion

// const uri = 'mongodb://127.0.0.1:27017/drip';  for localhost
// const uri = process.env.MONGODB_URI;

// mongoose.connect(uri);
// const db = mongoose.connection;
// // Event listeners for connection status
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB successfully!');
// });




// example of route: const homeRoute = require("./routes/homeRoute")

// example of app.use: and connect to route app.use('/', homeRoute);

// ROUTES
const homeRoute = require("./routes/homeRoute")

// APP.USE
app.use('/', homeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});