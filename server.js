//Load express
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//stores the port used for the app
const port = process.env.PORT || 3000;
var app = express();

//View partial
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs'); //key-value pair

//server is set up, middleware is registered

app.use((req, res, next) => { //next: tell express when middleware is finit
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.')
		}
	});
	next();		//next() needs to be called for handlers
});

//this middleware will stop everything after it from executing
/*app.use((req, res, next) => {
	res.render('maintainance.hbs');
})*/

app.use(express.static(__dirname + '/public')) //dirname stores the path to the directory

//Register helper
hbs.registerHelper('getCurrentYear', () => { //args= 1:name of helper, 2:func to run
	return new Date().getFullYear()
});

//Uppercase helper
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => { //args = req: contains reqs info coming in
	//res.send('<h1>Hello Express!</h1>');	//res: methods
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Bienvenue!'
	});
});



app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request' 
	});
});

//binds the application to a port on our machine
app.listen(port, () => {
	console.log(`Server is up on port: ${port}`);
})


