var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Task = new Schema({
    title : {
        required:true,
        type:String
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"User"
    },
    due : {
        type : Date,
        required:true,
        default: Date.now
    },
    status : {
        type : String,
        required:true
    },
    label : {
        type : String,
        required:true
    },
    task : {
        type:String,
        required:true
    },
    priority : {
        type : String,
        required : true
    }

},{timestamps:true});

module.exports = mongoose.model("Task",Task);