var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    name : {
        required:true,
        type:String
    }
},{timestamps : true});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);