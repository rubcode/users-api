
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    year: Number,
    password: String,
    email:{
        type: String,
        default:"verito@gmail.com"
    },
    active: {
        type:Boolean,
        default:true
    }
},{ timestamps:true })

//Hola Mundo
const Users  = mongoose.model('Users', usersSchema);

module.exports = {
    users
}

