const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const login_info = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : Number,
        required : true
    }
},{timestamps : true});

const Login = mongoose.model('Login',login_info);
module.exports = Login;