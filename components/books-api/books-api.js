(function() {


BooksApi = Polymer({
                is: 'books-api',
                properties: {

                },

                attached : function() {
                  this.generateToken();
                  this.doInitSetup();
                },

                generateToken: function() {
                  // Generate a unique token for storing your bookshelf data on the backend server.
                  this.token = localStorage.token;
                  if (!this.token){
                    this.set("token",  Math.random().toString(36).substr(-8));
                    localStorage.token = this.token;
                  }
                },

                doInitSetup: function() {
                  // Set other info needed to make API calls
                  //this.set("api", "http://localhost:3001/bookapi");
                  this.set("api", "/api");

                  this.set("headers", {
                                    'Accept': 'application/json',
                                    'Authorization': this.token,
                                    'cache-control': 'no-cache',
                                    'Content-Type': 'application/json'
                                  });
                },

                getAllBooks : function() {
                  this.$.getAllBooksAJAX.generateRequest();
                },

                updateBook : function(bookId, newShelf) {
                  this.$.updateBookAJAX.body = {
                        "shelf" : newShelf
                  }
                  url="{{api}}/books"
                  this.$.updateBookAJAX.url = this.api + "/books/" + bookId;
                  this.$.updateBookAJAX.generateRequest();
                },

                searchBook : function( query ) {
                  this.$.searchBookAJAX.body = {
                    "query": query,
                    "maxResults":1000
                  };
                  this.$.searchBookAJAX.generateRequest();
                },

                bulkUpdate: function(selectedBookList, newShelf){
                  for(var bookid in selectedBookList){
                    if(selectedBookList[bookid]){
                       this.updateBook(bookid, newShelf);
                     }
                  }
                  var booksApiList = document.getElementsByTagName('Books-api');
                  for (var i = booksApiList.length - 1; i >= 0; i--) {
                      booksApiList[i].fire("refreshList")
                  };
                },

                onGetSuccess : function(event) {
                  this.fire("onGetSuccess", event.detail.response);
                },

                onUpdateSuccess : function(event) {
                  this.fire("onUpdateSuccess", event.detail.response)
                },

                onSearchSuccess : function(event) {
                  this.fire("onSearchSuccess", event.detail.response);
                },

                onError : function(event) {
                  this.fire("onAPIError", event.target.id);
                },

                factoryImpl: function(initObj) {
                  for(var property in initObj)
                    this.set( property , initObj[property] );

                  this.generateToken();
                  this.doInitSetup();

                  Polymer.dom(this).flush();

                }

  });
})();
