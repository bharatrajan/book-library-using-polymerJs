Polymer({
    is: 'book-lookup',

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
                "searchResults": [],
                "hideSuggestion": false,
                "hideButtons": true,
                "hideResults": true
            }
        },

        /**
         * @description - List of books selected for bulk update
         * @value : Object { "BookId" : bookObject }
         */
        selectedBookList: {
            type: Object,
            value: {}
        },

        /**
         * @description - Search query from user
         * @value : String
         */
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
        "onUpdateSuccess": "onUpdateSuccess",
        "onBookShelfChanged": "onBookShelfChanged"
    },

    /**
     * @description - Cleans this.userInput & this.selectedBookList
     * @returns null
     */
    _cleanUp: function() {
        this.set("userInput", "");
        this.set("selectedBookList", {});
        return null;
    },

    /**
     * @description - handler for ONSELECTED event from child element
     * @description - Injects the selected book into selectedBookList object
     * @eventListener
     * @param {object} event - ONSELECTED event object
     * @param {boolean} detail - Additional detail from same event
     * @returns null
     */
    onBookSelected: function(event, detail) {
        var propName = "selectedBookList" + "." + detail.book.id;
        this.set(propName, detail.book);
        return null;
    },

    /**
     * @description - handler for ONUNSELECTED event from child element
     * @description - Removes the unselected book from selectedBookList object
     * @eventListener
     * @param {object} event - ONUNSELECTED event object
     * @param {boolean} detail - Additional detail from same event
     * @returns null
     */
    onBookUnselected: function(event, detail) {
        var propName = "selectedBookList" + "." + detail.book.id;
        this.set(propName, undefined);
        return null;
    },

    /**
     * @description - Wrapper for BooksApi.searchBook
     * @description - observer for this.userInput property
     * @observer
     * @param {string} userInput - user typed input
     * @returns null
     */
    onUserType: function(userInput) {
        this.BooksApi.searchBook(userInput);
        return null;
    },

    /**
     * @description - Called when user hits "Continue Reading" button
     * @description - Updates all the books in selectedBookList to "Continue Reading" shelf
     * @description - calls _showBookListing to show updated list
     * @eventListener
     * @returns null
     */
    _updateToContinueReading: function() {
        this.BooksApi.bulkUpdate(this.selectedBookList, "currentlyReading");
        this._showBookListing();
        return null;
    },

    /**
     * @description - Called when user hits "Want To Read" button
     * @description - Updates all the books in selectedBookList to "Want To Read" shelf
     * @description - calls _showBookListing to show updated list
     * @eventListener
     * @returns null
     */
    _updateToWantToRead: function() {
        this.BooksApi.bulkUpdate(this.selectedBookList, "wantToRead");
        this._showBookListing();
        return null;
    },

    /**
     * @description - Called when user hits "Read" button
     * @description - Updates all the books in selectedBookList to "Read" shelf
     * @description - calls _showBookListing to show updated list
     * @eventListener
     * @returns null
     */
    _updateToRead: function() {
        this.BooksApi.bulkUpdate(this.selectedBookList, "read");
        this._showBookListing();
        return null;
    },

    /**
     * @description - Initialize this.searchResults to []
     * @description - Sets this.appRouter
     * @description - Creates and attach booksAPI
     * @lifeCycle
     * @returns null
     */
    attached: function() {
        this.appRouter = document.getElementById("viewSwitch");
        this.set("searchResults", []);
        this.BooksApi = new BooksApi({});
        this.appendChild(this.BooksApi);
        return null;
    },

    /**
     * @description - eventListener for onSearchSuccess event
     * @description - Computes show/hide for various local elements
     * @eventListener
     * @param {object} event - onSearchSuccess event
     * @param {boolean} detail - Additional detail from onSearchSuccess event
     * @returns null
     */
    onSearchSuccess: function(event, detail) {
        var newModel = {
            "searchResults": detail.books,
            "hideSuggestion": (detail.books.length !== 0),
            "hideButtons": (detail.books.length == 0),
            "hideResults": (detail.books.length == 0)
        };
        this.set("model", newModel);
        return null;
    },

    /**
     * @description - eventListener for onUpdateSuccess event
     * @description - Calls _showBookListing & Cleans this component
     * @eventListener
     * @param {object} event - onUpdateSuccess event
     * @param {boolean} detail - Additional detail from onUpdateSuccess event
     * @returns null
     */
    onUpdateSuccess: function(event, detail) {
        this._showBookListing();
        this._cleanUp();
        return null;
    },

    /**
     * @description - Switches the view to book listing
     * @returns null
     */
    _showBookListing: function() {
        this.appRouter.set("route.path", "list");
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
    onBookShelfChanged: function(event, detail) {
        this.BooksApi.updateBook(detail.bookId, detail.newShelf);
        return null;
    }

});
