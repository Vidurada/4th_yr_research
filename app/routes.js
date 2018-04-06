// app/routes.js
module.exports = function(app, passport) {


	// HOME PAGE (with login links)

	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});


	// show the login form
	app.get('/index', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/index', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/index', // redirect back to the signup page if there is an error
            failureFlash : true
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });


	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	app.get('/sensors', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('sensors.ejs', { message: req.flash('signupMessage') });
	});
	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page in an error
		failureFlash : true
	}));


	// DASHBOARD SECTION

	app.get('/dashboard', isLoggedIn, function(req, res) {
		res.render('dashboard.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});


	// LOGOUT

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
