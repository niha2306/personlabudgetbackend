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
        res.status(200).send({ message: "Login Successful", success: true, data: {token: token, id: user?._id }});
    } else {
        res.status(401).send({ message: "Login UnSuccessful", success: false });
    }
    } catch(error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/refresh', async (req, res, next) => {
    const {token} = req.body;
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;
    const user = await User.findOne({ email: email });
    const expiration = '2m';
    if(user) {
        const refreshedToken = jwt.sign({email: user.email}, secretKey, { expiresIn: expiration });
        res.status(200).send({message: "Token Refreshed Successfully", data: {token: refreshedToken, id: user?._id }})
    }
    else {
        res.status(401).send({ message: "Token Refresh failed"});
    }
});

module.exports = router;