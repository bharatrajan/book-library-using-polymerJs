Polymer({
    is: 'book-listing',

    /**
     * @description - properties
     */
    properties: {

        /**
         * @description - Model that governing the display
         * @value : Object
         */
        model: {
          type: Object,
          value: {
              "noBookFound": false,
              "continueReadingList": [],
              "wantToReadList": [],
              "readList": []
          }
        }

    },

    listeners: {
        "refreshList": "onUpdateSuccess",
        "onAPIError": "onAPIError",
        "onGetSuccess": "onGetSuccess",
        "onUpdateSuccess": "onUpdateSuccess",
        "onBookShelfChanged": "onBookShelfChanged"
    },

    /**
     * @description - eventListener for onAPIError event
     * @eventListener
     * @param {object} event - onAPIError event
     * @param {object} detail - Additional data from onAPIError event
     * @returns null
     */
    onAPIError: function(event, detail) {
        //TODO: Error handling
        console.log("detail", detail);
    },

    /**
     * @description - eventListener for onGetSuccess event
     * @description - Massages the response from BooksApi.getAllBooksAJAX
     * @description - Sets massaged data to this.model
     * @eventListener
     * @param {object} event - onGetSuccess event
     * @param {object} detail - Additional data from onGetSuccess event
     * @returns null
     */
    onGetSuccess: function(event, detail) {
        var i, continueReadingList = [],
            wantToReadList = [],
            readList = [],
            switchLogic = {};

        switchLogic = {
            "currentlyReading": function(book) {
                continueReadingList.push(book)
            },
            "wantToRead": function(book) {
                wantToReadList.push(book)
            },
            "read": function(book) {
                readList.push(book)
            }
        };


        detail.books.forEach(function(book) {
            switchLogic[book.shelf](book)
        });

        this.set("model.continueReadingList", continueReadingList);
        this.set("model.wantToReadList", wantToReadList);
        this.set("model.readList", readList);
        this.set("model.noBookFound", detail.books.length === 0);
        return null;
    },

    /**
     * @description - eventListener for onBookShelfChanged event
     * @description - Updates the shelf of the current book
     * @description - Wrapper for BooksApi.updateBook
     * @eventListener
     * @param {object} event - onBookShelfChanged event
     * @param {object} detail - Additional data from onBookShelfChanged event
     * @returns null
     */
    onBookShelfChanged: function(event, detail) {
        this.BooksApi.updateBook(detail.bookId, detail.newShelf);
        return null;
    },

    /**
     * @description - eventListener for onBookShelfChanged event
     * @description - Updates the shelf of the current book
     * @description - Wrapper for BooksApi.updateBook
     * @eventListener
     * @param {object} event - onBookShelfChanged event
     * @param {boolean} detail - Additional data from onBookShelfChanged event
     * @returns null
     */
    onUpdateSuccess: function(event, detail) {
        this.BooksApi.getAllBooks();
        return null;
    },

    /**
     * @description - Sets this.appRouter
     * @description - Creates and attach booksAPI
     * @description - Makes BooksApi.getAllBooks call
     * @lifeCycle
     * @returns null
     */
    attached: function() {
        this.BooksApi = new BooksApi({});
        this.appendChild(this.BooksApi);
        this.BooksApi.getAllBooks();
        return null;
    }

});
