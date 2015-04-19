var nodemailer = require('nodemailer');
module.exports = {
	'sendVerificationMail':function (user) {
		// create reusable transporter object using SMTP transport
		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'mahisapbagul@gmail.com',
		        pass: 'M@hiS@p123'
		    }
		});
		// NB! No need to recreate the transporter object. You can use
		// the same transporter object for all e-mails
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Task Manager App ✔ <mahisapbagul@gmail.com>', // sender address
		    // to: user.email, // list of receivers
		    to: "bagulm123@gmail.com", 
		    subject: 'Verify and Confirm your mail Id ✔', // Subject line
		    html: 'Please click on this link to activate your account '
		    +sails.getBaseurl()+"/confirmaccount?email="+user.email+"&token="+user.token // html body
		};
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});	
	},
	
	'sendResetPasswordMail':function (user) {
		// create reusable transporter object using SMTP transport
		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'mahisapbagul@gmail.com',
		        pass: 'M@hiS@p123'
		    }
		});
		// NB! No need to recreate the transporter object. You can use
		// the same transporter object for all e-mails
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Task Manager App ✔ <mahisapbagul@gmail.com>', // sender address
		    // to: user.email, // list of receivers
		    to: "bagulm123@gmail.com", 
		    subject: 'Reset your password✔', // Subject line
		    html: 'Please click on this link to reset your password '
		    +sails.getBaseurl()+"/createnewpassword?email="+user.email+"&token="+user.token // html body
		};
		
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});	
	},
	'sendPasswordChangeSuccessMail':function (user) {
		// create reusable transporter object using SMTP transport
		var transporter = nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'mahisapbagul@gmail.com',
		        pass: 'M@hiS@p123'
		    }
		});
		// NB! No need to recreate the transporter object. You can use
		// the same transporter object for all e-mails
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Task Manager App ✔ <mahisapbagul@gmail.com>', // sender address
		    // to: user.email, // list of receivers
		    to: "bagulm123@gmail.com", 
		    subject: 'Your Password has been changed successfully ✔', // Subject line
		    html: 'Thanks Task Manager App Team' // html body
		};
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});	
	}
}



 