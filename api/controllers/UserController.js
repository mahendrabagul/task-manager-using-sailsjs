/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');

module.exports = {
    create: function(req, res) {
    	var email = req.param('email')|| null;
    	var password = req.param('password')|| null;
    	var name = req.param('name')|| null;
    	var gender = req.param('gender')|| null;
        var birthdate = req.param('birthdate')|| null;
    	User.create({email:email,password:password, gender:gender,birthdate:birthdate,
    		name:name,isactive:true,isverified:false}).exec(function(err,user){
    		if (err) {
    			return res.send(err);
    		}
    		else{  
    			MailerService.sendVerificationMail(user);			
    			return res.send(user);
    		}
    	});
    },
    confirmaccount: function(req, res) {
    	var email = req.param('email')|| null;
    	var token = req.param('token')|| null;
    	User.find({email:email}).exec(function(err,user){
    		if (err) {
    			return res.send(err);
    		}
    		else{ 
    			if (token === user[0].token) {
    				User.update(user[0].id,{isverified:true}).exec(function(err,user){
			    		if (err) {
			    			return res.send(err);
			    		}
			    		else{  
			    			return res.send("Account verified");
			    		}
			    	});
    			} else {
    				return res.send("Token expired");
    			}
     		}
    	});
    },

    savenewpassword: function(req, res) {
        var email = req.param('email')|| null;
        var password = req.param('password')|| null;
        var token = req.param('token')|| null;
        User.find({email:email}).exec(function(err,user){
            if (err) {
                return res.send(err);
            }
            else{ 
                 if (token === user[0].token) {
                     bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt, function(err, hash) {
                            if(err) {
                                console.log(err);
                                return res.send(err);
                            } else {
                                 User.update(user[0].id,{password:hash}).exec(function(err,newuser){
                                    if (err) {
                                        return res.send(err);
                                    }
                                    else{  
                                        MailerService.sendPasswordChangeSuccessMail(newuser);            
                                        return res.send("New Password Created");
                                    }
                                });
                            }
                        });
                    });
                } else {
                    return res.send("Token expired/invalid");
                }
            }
        });
    },   

    createnewpassword: function(req, res) {
        var email = req.param('email')|| null;
        var password = req.param('password')|| null;
        var token = req.param('token')|| null;
        User.find({email:email}).exec(function(err,user){
            if (err) {
                return res.send(err);
            }
            else{ 
                if (token === user[0].token) {
                    res.view({user:user[0]});
                } else {
                    return res.send("Token expired/invalid");
                }
            }
        });
    }, 

    resetpassword: function(req, res) {
        var email = req.param('email')|| null;
        User.find({email:email}).exec(function(err,user){
            if (err) {
                return res.send(err);
            }
            else{ 
                if (user[0] !== null || user[0] !== 'undefined') {
                    var token = uuid.v1();
                    User.update(user[0].id,{token:token}).exec(function(err,newuser){
                        if (err) {
                            return res.send(err);
                        }
                        else{  
                            MailerService.sendResetPasswordMail(newuser[0]);            
                            return res.send("Password reset link sent on your mail");
                        }
                    });
                } else {
                    return res.send("No account registered with this email");
                }
            }
        });
    },
};

