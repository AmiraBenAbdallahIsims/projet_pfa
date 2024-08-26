const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const CardSchema = new Schema({
    cardName: {
        required : true,
        type: String
    },

    ownerId : {
        required : true,
        type : String
    },
    
    cardDesign : {
        required : true
    }
    
});
module.exports = mongoose.model('Card', CardSchema);