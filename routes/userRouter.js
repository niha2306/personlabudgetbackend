const express = require('express')
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../model/userModel');

router.get('/', (req, res, next) => {
    User.find()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((error) => {
            console.error('Error retrieving users:', error);
            res.status(502).send({ message: "Error retrieving users", error: error })
        })
});

router.post('/', async (req, res, next) => {
    try {
        const { name, email, password, mobile } = req.body;
        if(name == "" || email == "" || password == "" || mobile=="") {
            res.status(400).send({message: "data is invalid"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            mobile: mobile
        });

        const createdUser = await newUser.save();
        res.status(201).send(createdUser);
    } catch (error) {
        res.status(502).send(error);
        console.log(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
     const id = req.params.id; 
     const body = req.body;

     const updatedUser = await User.findByIdAndUpdate(id, body, {new: true});
     res.status(204).send(updatedUser);
     } catch(error) {
         console.log(error);
         res.status(502).send(error);
     }
 });
 
 router.delete('/:id', async (req, res, next) => {
     try {
         const id = req.params.id; 
         const deletedUser = await User.findByIdAndDelete(id);
         res.status(200).send(deletedUser);
     } catch(error) {
         res.status(502).send({message: "Error While Deleting User", error: error});
         console.log(error);
     }
 });

module.exports = router;