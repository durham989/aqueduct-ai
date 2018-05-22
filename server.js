// Package imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');

// SendGrid setup
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Connect MySQL Database
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect(function(err) {
  console.log(err.code);
  return connection;
});


var app = express();
// var consultation = require('./routes/consultation/consultation');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/consultation', consultation);

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methds', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// Port Number
var port = process.env.PORT || 3000;

// CORS Mioddleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'dist')));

// Consultation form email
app.route('/consultation').post((req, res) => {
  const leadFirstName = req.body.consultFirstName;
  const leadLastName = req.body.consultLastName;
  const leadEmailAddress = req.body.consultEmailAddress;
  const leadOrgName = req.body.consultOrgName;

  const consultationDBEntry = {
    firstName: leadFirstName,
    lastName: leadLastName,
    emailAddress: leadEmailAddress,
    orgName: leadOrgName
  };

  const msg = {
    to: ['ethan@kasuriagroup.com', 'jeff@kasuriagroup.com'],
    // to: 'ethan@kasuriagroup.com',
    from: 'info@aqueduct.ai',
    subject: 'Aqueduct Consultation Submission',
    html: `<p>The following individual just submitted a consultation form on Aqueduct.ai:</p><p><ul><li>First Name: ${leadFirstName}</li><li>Last Name: ${leadLastName}</li><li>Email Address: ${leadEmailAddress}</li><li>Org Name: ${leadOrgName}</li></ul></p><p>Follow up with them ASAP!</p>`
  };

  return sgMail.send(msg)

    .then(() => connection.query('INSERT INTO consultations SET ?', consultationDBEntry, function(error,results) {
      if (error) throw error;
      if (results) {
        console.log('results of database entry are: ' + results);
      }
    }))
    .then(() => res.status(200).json({ 
      message: 'email sent!'
    }))
    .catch(() => res.status(400).send(err))

});

// Index Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});