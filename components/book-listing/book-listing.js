Polymer({
  is: 'book-listing',

  properties: {

    dataTitle : {
      type: String,
      reflectToAttribute: true
    },

    model : {
      type: Object,
      value : {
        "noBookFound": false,
        "continueReadingList": [],
        "wantToReadList": [],
        "readList": []
      }
    }

  },

  listeners:{
    "refreshList": "onUpdateSuccess",
    "onAPIError": "onAPIError",
    "onGetSuccess": "onGetSuccess",
    "onUpdateSuccess": "onUpdateSuccess",
    "onBookShelfChanged": "onBookShelfChanged"
  },

  onAPIError: function(event, detail) {
    //TODO: Error handling
    console.log("detail", detail);
  },

  onGetSuccess: function(event, detail) {
    var i, continueReadingList = [],
           wantToReadList = [],
           readList = [], switchLogic = {};

   switchLogic = {
                    "currentlyReading": function(book){continueReadingList.push(book)},
                    "wantToRead": function(book){wantToReadList.push(book)},
                    "read": function(book){readList.push(book)}
                  };


    detail.books.forEach(function(book){
      switchLogic[book.shelf](book)
    });

    this.set("model.continueReadingList", continueReadingList);
    this.set("model.wantToReadList", wantToReadList);
    this.set("model.readList", readList);
    this.set("model.noBookFound", detail.books.length === 0);

  },

  onBookShelfChanged: function(event, detail) {
    this.BooksApi.updateBook(detail.bookId, detail.newShelf);
  },

  onUpdateSuccess: function(event, detail) {
    this.BooksApi.getAllBooks();
  },

  attached: function() {
    this.BooksApi = new BooksApi({});
    this.appendChild(this.BooksApi);
    this.BooksApi.getAllBooks();
  }

});
