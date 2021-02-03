const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    userName: {
        type: String, 
        required: true
    }, 
    email: {
        unique: true,
        type: String, 
        required: true 
    }, 
    password: {
        type: String, 
        required: true 
    }, 
    name: {
        type: String
    }
})

module.exports = User = mongoose.model('User', UserSchema); 