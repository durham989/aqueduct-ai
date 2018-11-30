// Package imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var file = require('file-system');
require('dotenv').config();

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

function startConnection() {
  console.log('CONNECTING');
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  connection.connect(function(err) {
    if (err) {
      console.error('CONNECT FAILED', err.code);
      startConnection();
    }
    else {
      console.log('CONNECTED');
    }
  });
  connection.on('error', function(err) {
    if (err.fatal) {
      startConnection();
    }
  });
}

startConnection();

// var connectionPool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// connection.connect();
// connection.on('error', function (err) {
//   console.log(err.code); // 'ER_BAD_DB_ERROR'
//   if(!err.fatal) {
//     return;
//   } else {
//     connection.connect();
//   }
// });


var app = express();
// var consultation = require('./routes/consultation/consultation');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/consultation', consultation);

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

  var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };

  const consultationDBEntry = {
    firstName: leadFirstName,
    lastName: leadLastName,
    emailAddress: leadEmailAddress,
    orgName: leadOrgName,
    date: CURRENT_TIMESTAMP
  };

  const msg = {
    to: ['ethan@aqueduct.ai', 'jeff@aqueduct.ai'],
    // to: 'ethan@kasuriagroup.com',
    from: 'info@aqueduct.ai',
    subject: 'Aqueduct Consultation Submission',
    html: `<p>The following individual just submitted a consultation form on Aqueduct.ai:</p><p><ul><li>First Name: ${leadFirstName}</li><li>Last Name: ${leadLastName}</li><li>Email Address: ${leadEmailAddress}</li><li>Org Name: ${leadOrgName}</li></ul></p><p>Follow up with them ASAP!</p>`
  };

  return sgMail.send(msg)

    .then(() => connection.query('INSERT INTO consultations SET ?', consultationDBEntry, function (error, results) {
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

// Whitepaper form email
app.route('/whitepaper').post((req, res) => {
  
  var pdf = file.readFileSync('Water_Utilities_and_Machine_Learning.pdf');
  var base64File = new Buffer(pdf).toString('base64');
  
  const whitepaperFullName = req.body.whitepaperFullName;
  const whitepaperEmailAddress = req.body.whitepaperEmailAddress;

  var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
  
  const whitepaperDBEntry = {
    fullName: whitepaperFullName,
    emailAddress: whitepaperEmailAddress,
    date: CURRENT_TIMESTAMP
  };

  const emails = [
    {
      to: ['ethan@aqueduct.ai', 'jeff@aqueduct.ai'],
      // to: 'ethan@kasuriagroup.com',
      from: 'info@aqueduct.ai',
      subject: 'Aqueduct Whitepaper Download',
      html: `<p>The following individual just downloaded the 'Water Utilities and Machine Learning' whitepaper on Aqueduct.ai:</p><p><ul><li>Full Name: ${whitepaperFullName}</li><li>Email Address: ${whitepaperEmailAddress}</li></ul></p><p>Follow up with them ASAP!</p>`
    },
    {
      to: whitepaperEmailAddress,
      from: 'info@aqueduct.ai',
      subject: 'Aqueduct.ai: Water Utilities and Machine Learning Whitepaper',
      html: `<p>Thank you for your interest in Aqueduct.ai and for helping further our cause to reduce non-revenue water loss with machine learning. Attached you will find our 'Water Utilities and Machine Learning' whitepaper, which explains how machine learning can help you:</p><p><ul><li>Identify and repair leaks faster than ever;</li><li>Assess the health of your assets and strategically defer investment;</li><li>Strengthen your business intelligence through monthly reporting; and</li><li>Mine data insights from SCADA and GIS databases.</li></ul></p><p>Thanks!</p><p>The Aqueduct.ai team</p>`,
      attachments: [
        {
          content: base64File,
          type: 'application/pdf',
          filename: 'Water Utilities and Machine Learning.pdf'
        }
      ]
    }
  ];

  return sgMail.send(emails)

    .then(() => connection.query('INSERT INTO whitepaper SET ?', whitepaperDBEntry, function (error, results) {
      if (error) throw error;
      if (results) {
        console.log('results of database entry are: ' + results);
      }
    }))
    .then(() => res.status(200).json({
      message: 'email sent!'
    }))
    .catch(() => res.status(400).send(err));

});

// Blog Subscription 
app.route('/subscribe').post(function (req, res) {

  var appData = {
    "error": 1,
    "data": ""
  };

  var userData = {
    emailAddress: req.body.emailAddress
  };

  connection.query('INSERT INTO blog_subscribers SET ?', userData, function (err) {
    if (!err) {
      appData.error = 0;
      appData["data"] = "Subscription successful!";
      res.status(201).json(appData);
    } else {
      console.log(err);
      appData["data"] = "Error Occured!";
      res.status(400).json(appData);
    }
  });
});

// Water Utility Landing Page Submission
app.route('/consultation/water-utility').post((req, res) => {
  const leadName = req.body.name;
  const leadEmailAddress = req.body.emailAddress;
  const leadOrgName = req.body.organizationName;
  const leadBusinessGoal = req.body.businessGoal;
  const leadPhoneNumber = req.body.phoneNumber;
  const landingPageName = req.body.landingPageName;

  var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };

  const landingPageDBEntry = {
    name: leadName,
    organizationName: leadOrgName,
    businessGoal: leadBusinessGoal,
    emailAddress: leadEmailAddress,
    phoneNumber: leadPhoneNumber,
    landingPageName: landingPageName,
    date: CURRENT_TIMESTAMP
  };

  const msg = {
    to: ['ethan@aqueduct.ai', 'jeff@aqueduct.ai'],
    from: 'info@aqueduct.ai',
    subject: 'Aqueduct Water Utility Landing Page Submission',
    html: `<p>The following individual just submitted a consultation request on the water utility landing page at Aqueduct.ai:</p><p><ul><li>Name: ${leadName}</li><li>Email Address: ${leadEmailAddress}</li><li>Org Name: ${leadOrgName}</li><li>Business Goal: ${leadBusinessGoal}</li><li>Phone Number: ${leadPhoneNumber}</li></ul></p><p>Follow up with them ASAP!</p>`
  };

  return sgMail.send(msg)

    .then(() => connection.query('INSERT INTO landing_page SET ?', landingPageDBEntry, function (error, results) {
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

// Water Utility Landing Page Submission
app.route('/consultation/wastewater-facility').post((req, res) => {
  const leadName = req.body.name;
  const leadEmailAddress = req.body.emailAddress;
  const leadOrgName = req.body.organizationName;
  const leadBusinessGoal = req.body.businessGoal;
  const leadPhoneNumber = req.body.phoneNumber;
  const landingPageName = req.body.landingPageName;

  var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };

  const landingPageDBEntry = {
    name: leadName,
    organizationName: leadOrgName,
    businessGoal: leadBusinessGoal,
    emailAddress: leadEmailAddress,
    phoneNumber: leadPhoneNumber,
    landingPageName: landingPageName,
    date: CURRENT_TIMESTAMP
  };

  const msg = {
    to: ['ethan@aqueduct.ai', 'jeff@aqueduct.ai'],
    from: 'info@aqueduct.ai',
    subject: 'Aqueduct Wastewater Facility Landing Page Submission',
    html: `<p>The following individual just submitted a consultation request on the wastewater facility landing page at Aqueduct.ai:</p><p><ul><li>Name: ${leadName}</li><li>Email Address: ${leadEmailAddress}</li><li>Org Name: ${leadOrgName}</li><li>Business Goal: ${leadBusinessGoal}</li><li>Phone Number: ${leadPhoneNumber}</li></ul></p><p>Follow up with them ASAP!</p>`
  };

  return sgMail.send(msg)

    .then(() => connection.query('INSERT INTO landing_page SET ?', landingPageDBEntry, function (error, results) {
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