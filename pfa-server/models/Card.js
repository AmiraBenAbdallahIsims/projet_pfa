const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const CardSchema = new Schema({
    cardName: {
        required : true,
        type: String
    },

    designerId : {
        required : true,
        type : String
    },

    clientId : {
        required : true,
        type : String
    },
    
    cardDesign : {
        type : String,
        required : true
    }
    
});
module.exports = mongoose.model('Card', CardSchema);