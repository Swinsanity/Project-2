require('dotenv').config();
const sendMail = require('./routes/mail');
var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //post
app.post("/api/email", (req, res) => {
  const {subject, email, text} = req.body;
  console.log('Data: ', req.body);

  sendMail(email, subject, text, function(err, data){
    if (err){
      res.status(500).json({message: "Error: 01F4 (internal error)"})
    }
    else{
      res.json({message: "Email Sent Successfully"})
    }
  });
});

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
