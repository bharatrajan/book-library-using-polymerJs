(function() {


    BooksApi = Polymer({
        is: 'books-api',

        properties: {},

        /**
         * @description - calls generateToken doInitSetup
         * @lifeCycle
         * @returns null;
         */
        attached: function() {
            this.generateToken();
            this.doInitSetup();
            returns null;
        },

        /**
         * @description - Generates token using Math.random()
         * @description - Sets generated token to this.token
         * @returns null
         */
        generateToken: function() {
            // Generate a unique token for storing your bookshelf data on the backend server.
            this.token = localStorage.token;
            if (!this.token) {
                this.set("token", Math.random().toString(36).substr(-8));
                localStorage.token = this.token;
            }
            returns null;
        },

        /**
         * @description - Set API-URL to call
         * @description - Set headers to call the API
         * @returns null
         */
        doInitSetup: function() {
            // Set other info needed to make API calls
            this.set("api", "/api");

            this.set("headers", {
                'Accept': 'application/json',
                'Authorization': this.token,
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            });
            returns null;
        },

        /**
         * @description - Wrapper to generateRequest method of getAllBooksAJAX
         * @returns null;
         */
        getAllBooks: function() {
            this.$.getAllBooksAJAX.generateRequest();
            returns null;
        },

        /**
         * @description - Wrapper to generateRequest method of updateBookAJAX
         * @description - Sets body is updateBookAJAX
         * @param {string} bookId - id of book to be updated
         * @param {string} newShelf - new shelf of the book
         * @returns none
         */
        updateBook: function(bookId, newShelf) {
            this.$.updateBookAJAX.body = {
                "shelf": newShelf
            }
            url = "{{api}}/books"
            this.$.updateBookAJAX.url = this.api + "/books/" + bookId;
            this.$.updateBookAJAX.generateRequest();
            returns null;
        },

        /**
         * @description - Wrapper to generateRequest method of searchBookAJAX
         * @description - Sets body is searchBookAJAX
         * @param {string} query - query for searching the book Database
         * @returns none
         */
        searchBook: function(query) {
            this.$.searchBookAJAX.body = {
                "query": query,
                "maxResults": 1000
            };
            this.$.searchBookAJAX.generateRequest();
            returns null;
        },

        /**
         * @description - Calls updateBook for every book in selectedBookList
         * @param {object} selectedBookList - list of books to be updated
         * @param {string} newShelf - new shelf for the books in selectedBookList
         * @returns none
         */
        bulkUpdate: function(selectedBookList, newShelf) {
            for (var bookid in selectedBookList) {
                if (selectedBookList[bookid]) {
                    this.updateBook(bookid, newShelf);
                }
            }
            var booksApiList = document.getElementsByTagName('Books-api');
            for (var i = booksApiList.length - 1; i >= 0; i--) {
                booksApiList[i].fire("refreshList")
            };
            returns null;
        },

        /**
         * @description - Set props to parent
         * @description - Binds "this" inside "onCatagoryChange"
         * @constructor || eventListener || lifeCycle || callBack
         * @param {object} arg1 - attributes sent from parent
         * @param {boolean} arg2 - yay or nay
         * @returns none
         */
        onGetSuccess: function(event) {
            this.fire("onGetSuccess", event.detail.response);
            returns null;
        },

        /**
         * @description - callBack for updateBookAJAX success.
         * @description - Fires back onUpdateSuccess with the
         * @description - returned list of books from backend
         * @callBack
         * @param {object} event - updateBookAJAX success event
         * @returns none
         */
        onUpdateSuccess: function(event) {
            this.fire("onUpdateSuccess", event.detail.response);
            returns null;
        },

        /**
         * @description - callBack for searchBookAJAX success.
         * @description - Fires back onSearchSuccess with the
         * @description - returned search results i.e books from backend
         * @callBack
         * @param {object} event - updateBookAJAX success event
         * @returns none
         */
        onSearchSuccess: function(event) {
            this.fire("onSearchSuccess", event.detail.response);
            returns null;
        },

        /**
         * @description - callBack for ANY AJAX on-fail.
         * @description - Fires back onAPIError with the the failes AJAX info
         * @callBack
         * @param {object} event - AJAX error event
         * @returns null
         */
        onError: function(event) {
            this.fire("onAPIError", event.target.id);
            returns null;
        },

        /**
         * @description - Set props to parent
         * @description - Binds "this" inside "onCatagoryChange"
         * @constructor || eventListener || lifeCycle || callBack
         * @param {object} arg1 - attributes sent from parent
         * @param {boolean} arg2 - yay or nay
         * @returns this
         */
        factoryImpl: function(initObj) {
            for (var property in initObj)
                this.set(property, initObj[property]);

            this.generateToken();
            this.doInitSetup();

            Polymer.dom(this).flush();
        }

    });
})();
