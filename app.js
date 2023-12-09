const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const budgetRouter = require('./routes/budgetRouter');
const loginRouter = require('./routes/loginRouter');

const uri = "mongodb+srv://saiNiharika:niharika%40123@personalbudget.qfhnl3h.mongodb.net/";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.listen(process.env.PORT || port, () => {
    console.log(`Listening on ${process.env.PORT || port}`);
});