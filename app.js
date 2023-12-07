const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const budgetRouter = require('./routes/budgetRouter');
const loginRouter = require('./routes/loginRouter');

const uri = "mongodb+srv://saiNiharika:niharika%40123@personalbudget.qfhnl3h.mongodb.net/";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const budget = require('./budget.json');

mongoose.connect(uri);

mongoose.connection.on('open',()=>{
    console.log('Connection OK');
});

mongoose.connection.on('error',(err)=>{
    console.log('Connection Fail',err);
});


app.use('/api/users', userRouter);
app.use('/api/budget', budgetRouter);
app.use('/login', loginRouter)

const port = 3001;
app.listen(port, () => {
    console.log('App Running at localhost:3001/');
});