
/**
* hasValidToken
*
* @author mahendrabagul
*/
module.exports = function(req, res, next) {

	var userId = req.headers['userId'];
	var token  = req.headers['token'] 
	if(typeof userId === 'undefined') {
		res.status(401);
		return res.json('Wrong or null userId');
	}
	if(typeof token === 'undefined') {
		res.status(401);
		return res.json('Wrong or null token');
	}

   	User.findOne({"id":userId,"token":token}).done(function(err, user){
        // valid user
        if (!err && user) {
           	if (user.isactive) {
           		if(user.isverified){
 					next();
                }
                else{
					return res.send("You have not verified your email yet.", 403);
                }
            }
            else {
	            return res.send("You are not active. Contact to your admin", 403);
            }
        }
        // non valid user
      	else {
            return res.send("You are not permitted to perform this action.", 403);
        }
    });
};