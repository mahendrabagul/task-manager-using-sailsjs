/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index:function (req, res) {
	    res.view(null, {
	        title: "Task"
	    });	
 	},
 	find:function (req, res) {
 		var user = req.session.user.id;
		Task.find({user:user}).exec(function(err,tasks){
    		if (err) {
    			return res.send(err);
    		}
    		else{  
    			return res.send(tasks);
    		}
    	});
 	},
 	create: function(req, res) {
    	var taskname = req.param('taskname')|| null;
    	var taskdate = req.param('taskdate')|| null;
    	var user = req.session.user.id;
       	Task.create({taskname:taskname,taskdate:taskdate, user:user}).exec(function(err,task){
    		if (err) {
    			return res.send(err);
    		}
    		else{  
    			console.log(task);
    			return res.send(task);
    		}
    	});
    },
};

