var createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.loggedIn = true;
    req.session.save(function(err) {
	    res.set('Set-Cookie', 'a cookie');
      var data = {
        username: newUser.dataValues.name,
        authenticated: true
      }
	    res.status(201).send(JSON.stringify(data));
    });
  })
}

var checkUser = function(req, res, next) {
	console.log('checkUser', req.session);
	if (!req.session.loggedIn) {
		console.log('no session');
		res.sendStatus(403);
	} else {
		console.log('session, proceed');
		next();
	}
}

module.exports = {
	createSession: createSession,
	checkUser: checkUser
}