//Debugger : ../node_modules/node-debug/bin/node-debug.js nodesetup.js
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
var fs = require('fs');
var Promise = require('promise');


var currentList, fullBookList;

//Promisification
var readFile = Promise.denodeify(fs.readFile);
    readFile('server/init_book_list.json', 'utf8')
      .then(function (str) {
        currentList = JSON.parse(str);
      });
    readFile('server/full_book_list.json', 'utf8')
      .then(function (str) {
        fullBookList = JSON.parse(str);
      });

//Static content rendering
app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//SERVER SETUP
//CORS resolution
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "accept, content-type, xrs-tenant-id");
  next();
});

//GetBooks calls
app.get('/api/books',function(req, res){
  if(currentList && currentList.books && currentList.books.length ){
    res.status(200);
    res.json(currentList);
  }else
    res.status(500);
  );

//Request handling
app.put('/api/books/:booksId',function(req, res){


});

//Search calls
app.post('/api/search',function(req, res){


});



var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})
