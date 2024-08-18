const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const TemplateSchema = new Schema({
    templateName: {
        required : true,
        type: String
    },

    ownerId : {
        required : true,
        type : String
    },
    button : {
        style : {type : String},
        content : {type : String}
    },
    isModified : Boolean
    
});
module.exports = mongoose.model('Template', TemplateSchema);