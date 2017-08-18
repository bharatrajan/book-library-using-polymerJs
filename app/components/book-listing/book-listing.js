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
        },

        /**
         * @description - Attribute becomes true when this page is viewd.
         * @description - Set by iron-pages, the parent element.
         * @value : Boolean
         */
        active: {
            type: Boolean,
            observer: "onPageActive"
        }
    },

    listeners: {
        "onAPIError": "onAPIError",
        "onGetSuccess": "onGetSuccess",
        "onUpdateSuccess": "onUpdateSuccess",
        "onBookShelfChanged": "onBookShelfChanged"
    },

    /**
     * @description - Observer triggers when "active" Attribute for
     * @description - this node changes. While user sees this view.
     * @description - Fires pageview event to GA
     * @observer
     * @param {Boolean} isActive - true when user seeing this view
     * @returns null
     */
    onPageActive: function(isActive){
      if(isActive){

        //Makes get all books call
        if(!this.BooksApi){
          this.BooksApi = new BooksApi({});
          this.appendChild(this.BooksApi);
        }
        this.BooksApi.getAllBooks();

        //Fires pageview event to GA
        //Sets isBookListingViewed to true
        if(!webAnalytics.isBookListingViewed){
          ga('send', {
            hitType: 'pageview',
            page: '/' + location.hash
          });
          webAnalytics.isBookListingViewed = true;
        }

      }
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
     * @description - Wrapper for BooksApi.updateBook.
     * @description - Fire "BookShelfChanged" event to GA.
     * @eventListener
     * @param {object} event - onBookShelfChanged event
     * @param {object} detail - Additional data from onBookShelfChanged event
     * @returns null
     */
    onBookShelfChanged: function(event, detail) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Change',
          eventAction: 'BookShelfChanged',
          fieldsObject: {
            "shelf": detail.newShelf
          }
        });

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
    }

});
