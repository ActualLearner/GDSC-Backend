// Just type nodemon to start the server
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./Routers/bookRoutes.js');
const app = express();

// connect to database
mongoose.connect('mongodb://localhost:27017/books');
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

// Handle routes and middlewares

app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});