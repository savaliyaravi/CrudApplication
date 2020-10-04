const express = require('express');
const userSchema = require('../models/userSchema.js');
const router = express.Router();
const User = require('../models/userSchema.js');

//default GET request which return all users
router.get('/', async(req, res) => {
    try{
        const users = await User.find();
        res.send(users);

    }catch(err) {
        res.send('Error ',err);
    }
})

//GET request which return particular id request from url (ex: localhost:9000/users/5f79e87cd53fd40b4cc0cb83)
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        console.log("im here",user)
        res.send(user);

    }catch(err) {
        res.send('Error ',err);
    }
})

//POST request to create and save user in db as per the schema
router.post('/', async(req, res) => {
    
        const user = new User({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        })
    try {
        const u1 = await user.save();
        res.send(u1);
    } catch (err) {
        res.json({ error: err })
    }
})

//PATCH request to update particular user's data
router.patch('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        //below 3 line will update the user's properties which are passed in body other will stay as it was.
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        user.email = req.body.email || user.email;
        const u1Updated = await user.save();
        res.send(u1Updated);

    }catch(err) {
        res.send('Error ',err);
    }
})

//DELETE request to delete particulat user from id (id passed in url)
router.delete('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const u1Updated = await user.deleteOne();
        res.send(u1Updated);

    }catch(err) {
        res.send('Error ',err);
    }
})


module.exports = router;