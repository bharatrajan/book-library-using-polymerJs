Polymer({
  is: 'book-lookup',

  /**
   * @description - properties
   */
  properties: {

    model: {
      type: Object,
      value: {
        "searchResults" : [],
        "hideSuggestion" : false,
        "hideButtons" : true,
        "hideResults" : true
      }
    },

    selectedBookList: {
      type: Object,
      value: {}
    },

    userInput: {
      type: String,
      observer: "onUserType"
    }
  },

  listeners: {
    "refreshList": "_cleanUp",
    "ONSELECTED": "onBookSelected",
    "ONUNSELECTED": "onBookUnselected",
    "onSearchSuccess": "onSearchSuccess",
    "onUpdateSuccess" : "onUpdateSuccess",
    "onBookShelfChanged": "onBookShelfChanged"
  },

  _cleanUp: function(){
      this.set("userInput", "");
      this.set("selectedBookList", {});
  },

  onBookSelected: function(event, detail){
    var propName = "selectedBookList" + "." + detail.book.id;
    this.set(propName, detail.book)
  },

  onBookUnselected: function(event, detail){
    var propName = "selectedBookList" + "." + detail.book.id;
    this.set(propName, undefined);
  },

  onUserType: function(userInput){
    this.BooksApi.searchBook(userInput);
  },

  _updateToContinueReading: function() {
    this.BooksApi.bulkUpdate(this.selectedBookList, "currentlyReading");
    this._showBookListing();
  },

  _updateToWantToRead: function() {
    this.BooksApi.bulkUpdate(this.selectedBookList, "wantToRead");
    this._showBookListing();
  },

  _updateToRead: function() {
    this.BooksApi.bulkUpdate(this.selectedBookList, "read");
    this._showBookListing();
  },

  attached: function() {
    this.appRouter = document.getElementById("viewSwitch");
    this.set("searchResults", []);
    this.BooksApi = new BooksApi({});
    this.appendChild(this.BooksApi);
  },

  onSearchSuccess: function(event, detail){
    var newModel = {
      "searchResults" : detail.books,
      "hideSuggestion" : (detail.books.length !== 0),
      "hideButtons" : (detail.books.length == 0),
      "hideResults" : (detail.books.length == 0)
    };
    this.set("model", newModel);
  },

  onUpdateSuccess: function(event, detail){
    this._showBookListing();
    this._cleanUp();
  },

  _showBookListing: function(){
    this.appRouter.set("route.path", "list");
  },

  onBookShelfChanged: function(event, detail){
    this.BooksApi.updateBook(detail.bookId, detail.newShelf);
  }

});
