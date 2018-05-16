// Package imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

// Index Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});