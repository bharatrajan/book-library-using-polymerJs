//Debugger : ../node_modules/node-debug/bin/node-debug.js nodesetup.js
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var fs = require("fs");
var Promise = require("promise");


var fullBookList;

//Promisification
var readFile = Promise.denodeify(fs.readFile);
readFile("server/full_book_list.json", "utf8")
	.then(function (str) {
		fullBookList = JSON.parse(str);
	});

//Static content rendering
app.use(express.static("./"));
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
app.get("/api/books",function(req, res){
	try{
		res.status(200);
		res.json({
			books : fullBookList.books.filter(function(book){
				return book.shelf !== "none";
			})
		});
	}catch(e){
		res.status(500);
		res.json({"error" : e});
	}
});

//Request handling
app.put("/api/books/:booksId",function(req, res){
	var i = 0;
	try{
		for(i=0; i<fullBookList.books.length; i++)
			if(fullBookList.books[i].id == req.params.booksId){
				fullBookList.books[i].shelf = req.body.shelf;
				res.json({book : fullBookList.books[i]});
				break;
			}
		res.status(200);
	}catch(e){
		res.status(500);
		res.json({"error" : e});
	}
});

//Search calls
app.post("/api/search",function(req, res){

	if(!req.body.query){
		res.status(200);
		res.json({"books" : []});
		return;
	}


	try{
		res.status(200);
		res.json({
			books : fullBookList.books.filter(function(book){
				var title = book.title.toLocaleLowerCase(),
					query = req.body.query.toLocaleLowerCase();
				return title.indexOf(query) > 1;
			})
		});
	}catch(e){
		res.status(500);
		res.json({"error" : e});
	}
});



var server = app.listen(3001, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});
