const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'Jke4iuioti59&&*nrjnj';

const User = require('../model/userModel');

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
    const comparedPassword = await bcrypt.compare(password, user?.password);

    if (comparedPassword) {
        const payload = {
            email: email,
        };
        const expiration = '2m';
        const token = jwt.sign(payload, secretKey, { expiresIn: expiration });
        res.status(200).send({ message: "Login Successful", success: true, token: token });
    } else {
        res.status(400).send({ message: "Login UnSuccessful", success: false });
    }
    } catch(error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;