require('dotenv').config();
const sendMail = require('./routes/mail');
var db = require("../models");

module.exports = function (app) {

  /*
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  */

  //login
  app.get('/api/', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/login.html'));
  });

  //homepage after initial login
  app.get('/api/home', function (request, response) {
    if (request.session.loggedin) {
      response.send('Welcome back, ' + request.session.username + '!');
    } else {
      response.send('Please login to view this page!');
    }
    response.end();
  });

  // Create a new example
  /*
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
*/

  //email contact page
  app.post("/api/email", (req, res) => {
    const { subject, email, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text, function (err, data) {
      if (err) {
        res.status(500).json({ message: "Error: 01F4 (internal error)" })
      }
      else {
        res.json({ message: "Email Sent Successfully" })
      }
    });
  });


  //login page
  app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', 
      [username, password], function (error, results, fields) {
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

  /*
    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        res.json(dbExample);
      });
    });
    */
};
