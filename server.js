const express = require('express')
const app = express()

var fs = require("fs");
var guid = require('./guid')
var path = require('path');
var jsonfile = require('jsonfile');
var UPLOAD_RESULT_FOLDER = 'voteresults';
var UPLOAD_TESTING_DATA_FOLDER = 'testingdata';

var FULL_UPLOAD_RESULT_FOLDER = path.join(__dirname, UPLOAD_RESULT_FOLDER);
var FULL_UPLOAD_TESTING_DATA_FOLDER = path.join(__dirname, UPLOAD_TESTING_DATA_FOLDER);
// var app = express.createServer();
app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});


var cors=require('cors');
app.use(cors({origin:true,credentials: true}));


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/readtestingdata', function(req, res) {
  var filename = path.join(FULL_UPLOAD_TESTING_DATA_FOLDER, 'experiment1.json');
console.log(filename);
  jsonfile.readFile(filename, function(err, obj){
      console.log('good');
      console.log(obj);
      res.send(obj)
  })

})

app.post('/voteresults', function (req, res) {
  // console.log(res.body);
  var queryID = guid();
  var filename = path.join(FULL_UPLOAD_RESULT_FOLDER, queryID +'.json');
  writeJSON(filename, JSON.parse(req.body));
  console.log(req.body);
  res.send('Got a POST request')
})


app.post('/testingdata', function (req, res) {
  // console.log(res.body);
  var queryID = guid();
  var filename = path.join(FULL_UPLOAD_TESTING_DATA_FOLDER, queryID +'.json');
  writeJSON(filename, JSON.parse(req.body));
  console.log(req.body);
  res.send('Got a POST request')
})

app.listen(8000, () => console.log('Example app listening on port 8000!'))

function writeJSON(filename, obj) {
  return new Promise(function(res, rej) {
    jsonfile.writeFile(filename, obj, {spaces: 2}, function(res, error){
      if (!error) console.log('good');
    })
  })
}


function readJSON(filepath) {
  return new Promise(function(res, rej) {
    jsonfile.readFile(filename, obj, function(res, error){
      if (!error) console.log('good');
      else return res;
    })
  })
}
