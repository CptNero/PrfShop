const mongoose = require("mongoose");

function CreateUser () {
    var userSchema = new mongoose.Schema(
        {
            email: {type: String, unique: true, required: true, lowercase: true},
            password: {type: String, required: true},
            roles: {},
        }, {collection: 'users'}
    )
    
    mongoose.model('user', userSchema)
}