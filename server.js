// ==============================================================================
// DEPENDENCIES
// ==============================================================================
require('dotenv').config();
const express = require('express');
const sendMail = require('./routes/mail');
const path = require('path');

//var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
//var connection = require('./connections/connections')
// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle DATA PARSING
/*
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



// ================================================================================
// ROUTER
// ================================================================================

//post
app.post('/email', (req, res) => {
  const { subject, email, text } = req.body;
  console.log('Data: ', req.body);

  sendMail(email, subject, text, function (err, data) {
    if (err) {
      res.status(500).json({ message: 'Error: 01F4 (internal error)' })
    }
    else {
      res.json({ message: 'Email Sent Successfully' })
    }
  });
});

app.post('/auth', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});


//get

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
/*
app.get('/resumeBuilder', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
*/
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contactpage.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
