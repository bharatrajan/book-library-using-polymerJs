//Debugger : ../node_modules/node-debug/bin/node-debug.js nodesetup.js
var express = require('express');
var app = express();

var cors = require('cors');
var bodyParser = require('body-parser')
var expProxy = require('express-http-proxy');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

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


//Proxy /api to dev environment
app.use('/proxy', expProxy('https://reactnd-books-api.udacity.com/', {
  preserveHostHdr: true
}));


//GetBooks calls
var getBooks = "curl 'https://reactnd-books-api.udacity.com/books' -H 'cache-control: no-cache' -H 'Pragma: no-cache' -H 'Origin: http://localhost:3000' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8' -H 'authorization: ΩΩΩΩΩSomeAuthCodeΩΩΩΩ' -H 'accept: application/json' -H 'Cache-Control: no-cache' -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' -H 'Connection: keep-alive' -H 'Referer: http://localhost:3000/' -H 'DNT: 1' --compressed";

//Request handling
app.get('/bookapi/books',function(req, res){

  //Auth. header massageing
  if(req.headers && req.headers.authorization)
    getBooks = getBooks.replace("ΩΩΩΩΩSomeAuthCodeΩΩΩΩ", req.headers.authorization)
  else{
    res.status(404);
    res.json({});
    return;
  }

  // executes `curl`
  child = exec(getBooks, function (error, stdout, stderr) {
    if (error !== null) {
      res.status(404);
      res.json({});
    }else {
      res.status(200);
      res.json(JSON.parse(stdout));
    }
  });

});

//Update Books
var updateBooks = "curl 'https://reactnd-books-api.udacity.com/books/ΩΩΩΩΩbookIDΩΩΩΩ' -X PUT -H 'cache-control: no-cache' -H 'Pragma: no-cache' -H 'Origin: http://localhost:3000' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8' -H 'authorization: ΩΩΩΩΩSomeAuthCodeΩΩΩΩ' -H 'content-type: application/json' -H 'accept: application/json' -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' -H 'Cache-Control: no-cache' -H 'Referer: http://localhost:3000/' -H 'Connection: keep-alive' -H 'DNT: 1' --data-binary 'ΩΩΩΩΩbodyΩΩΩΩ' --compressed"

//Request handling
app.put('/bookapi/books/:booksId',function(req, res){

  //Requst massageing
  try{
    updateBooks = updateBooks.replace("ΩΩΩΩΩbookIDΩΩΩΩ", req.params.booksId.toString());
    updateBooks = updateBooks.replace("ΩΩΩΩΩbodyΩΩΩΩ", JSON.stringify(req.body));
    updateBooks = updateBooks.replace("ΩΩΩΩΩSomeAuthCodeΩΩΩΩ", req.headers.authorization.toString());
  }catch(error){
    res.status(404);
    res.json({});
    return;
  }

  // executes `curl`
  child = exec(updateBooks, function (error, stdout, stderr) {
    if (error !== null) {
      res.status(404);
      res.json({});
    }else {
      res.status(200);
      res.json(JSON.parse(stdout));
    }
  });

});


//
//GetBooks calls
var searchQuery = "curl 'https://reactnd-books-api.udacity.com/search' -H 'Pragma: no-cache' -H 'cache-control: no-cache' -H 'Origin: http://localhost:3000' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8' -H 'authorization: ΩΩΩΩΩSomeAuthCodeΩΩΩΩ' -H 'content-type: application/json' -H 'accept: application/json' -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' -H 'Cache-Control: no-cache' -H 'Referer: http://localhost:3000/search' -H 'Connection: keep-alive' -H 'DNT: 1' --data-binary 'ΩΩΩΩΩbodyΩΩΩΩ' --compressed";

//Request handling
app.post('/bookapi/search',function(req, res){

  //Requst massageing
  try{
    searchQuery = searchQuery.replace("ΩΩΩΩΩbodyΩΩΩΩ", JSON.stringify(req.body));
    searchQuery = searchQuery.replace("ΩΩΩΩΩSomeAuthCodeΩΩΩΩ", req.headers.authorization.toString());
  }catch(error){
    res.status(404);
    res.json({});
    return;
  }

  // executes `curl`
  child = exec(searchQuery, function (error, stdout, stderr) {
    if (error !== null) {
      res.status(404);
      res.json({});
    }else {
      res.status(200);
      res.json(JSON.parse(stdout));
    }
  });

});



var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})
