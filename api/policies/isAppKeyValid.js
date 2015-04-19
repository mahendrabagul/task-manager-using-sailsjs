module.exports = function(req, res, next) {
	if(typeof req.headers['appkey'] === 'undefined') {
		res.status(401);
		return res.json('Access Denied');
	}
	if(req.headers['appkey'] !== 'qQasdasdazz3435353fftt2145') {
		res.status(401);
		return res.json('Access Denied');
	}
	return next();
};