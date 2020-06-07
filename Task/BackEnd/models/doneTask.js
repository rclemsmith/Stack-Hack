var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DoneTask = new Schema({
    task: {
        title: {
            required: true,
            type: String
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        due: {
            type: Date,
            required: true,
            default: Date.now
        },
        status: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        task: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        }
    }
});


module.exports = mongoose.model("DoneTask", DoneTask);
