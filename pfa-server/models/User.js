const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        required : true,
        
        type: String
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    prenom:{
        type: String,
    },
    password : {
      type: String,
      required: true,
    },
    role : {
        type : String,
        
    },
    gender : {
        type : String,
    },
    token : {
        type : String,
    },
    city :{
        type:String,
    },
    age :{
        type:Number,
    },
    resetcode : {
        type:String,
    },
    resetToken : {
        type : String
    },
    image : {
        type : String,
        required:true,
    },
    sub : {
        type: String
    }
});
UserSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["email"]});
module.exports = mongoose.model('User', UserSchema);