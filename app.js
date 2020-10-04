const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Users';
const app = express();
const userRoutes = require('../CRUD/routes/users.js');
const router = express.Router();

mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;

con.on('open', function(){
    console.log("database connected");
});

//Here we are using json format store and access data.
app.use(express.json());

//middleware to pass all requests to users.js
app.use('/users', userRoutes);

app.listen(9000, () => console.log('server started'));
