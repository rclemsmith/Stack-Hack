var express = require('express');
var router = express.Router();
var Task = require("../models/tasks");
var passport = require("passport");
var authenticate = require("../authenticate");
var DoneTask = require("../models/doneTask");


router.get("/:userId", authenticate.verifyUser, (req, res, next) => {
    Task.find({author : req.params.userId})
        .populate("author")
        .then((tasks) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(tasks);
        })
        .catch((err) => console.log(err));
});

router.post("/newtask", authenticate.verifyUser, (req, res, next) => {
    Task.create({ title: req.body.title, author: req.user._id, due: req.body.due, status: req.body.status, label: req.body.label,task:req.body.task,priority : req.body.priority })
        .then((task) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(task);
        })
        .catch((err) => console.log(err))
});

router.delete("/delete/:taskId", authenticate.verifyUser, (req, res,next) => {
    // console.log(req.params.taskId);
    Task.findByIdAndDelete(req.params.taskId)
        .then((err) => {
            res.status = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({Sucess : "Task Deleted Sucessfully"});
        });
});

router.post("/done/:taskId", authenticate.verifyUser, (req, res,next) => {
    // console.log(req.params.taskId);

    Task.findById(req.params.taskId)
        .then((task)=>{
            // console.log(task);
           return DoneTask.create({task  : task});
        })
        .then((task)=>{
            return Task.findByIdAndDelete(req.params.taskId);
        })
        .then((err) => {
            res.status = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({Sucess : "Task Done Sucessfully"});
        });
});

router.get("/:userId/donetask", authenticate.verifyUser, (req, res, next) => {
    DoneTask.find({})
        .then((tasks) => {
            // 
            var done = [];
            tasks.forEach(element => {
                if(element.task.author == req.params.userId){
                    // console.log(element)
                    done.push(element.task);
                }
            });
            
            // console.log(done);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(done);
        })
        .catch((err) => console.log(err));
});

module.exports = router;