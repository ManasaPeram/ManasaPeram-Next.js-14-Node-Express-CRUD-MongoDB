const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    email: String,
    age:Number
})

const UserMOdel = mongoose.model('users', UserSchema)
module.exports = UserMOdel