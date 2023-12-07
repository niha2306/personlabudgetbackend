
const mongoose = require('mongoose');
const uri = "mongodb+srv://saiNiharika:niharika%40123@personalbudget.qfhnl3h.mongodb.net/";

module.exports = () => {
    mongoose.connect(uri);
    mongoose.connection.on('open',()=>{
        console.log('Connection OK');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('Connection Fail',err);
    })
}