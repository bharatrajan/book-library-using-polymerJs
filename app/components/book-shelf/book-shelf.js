Polymer({
    is: 'book-shelf',

    /**
     * @description - properties
     */
    properties: {

        /**
         * @description - Title of the book shelf
         * @value - "Continue Reading" | "Want To Read" | "Read"
         */
        dataTitle: {
            value: false,
            type: String,
            reflectToAttribute: true
        },

        /**
         * @description - List of individual book objects.
         * @description - on change observer : _propChangeObserver
         */
        bookList: {
            type: Object,
            observer: "_propChangeObserver"
        },

        /**
         * @description - Value used to hide or show this book shelf
         * @value - true | false
         */
        hidden: {
            type: Boolean,
            value: true
        }
    },

    /**
     * @description - observer for this.hidden
     * @description - checks if the length of bookList is 0 and hides
     * @description - the sheld, and vise versa
     * @observer
     * @param {array} bookList - List of books to show in the shelf
     * @returns null
     */
    _propChangeObserver: function(bookList) {
        this.set("hidden", (bookList.length === 0));
        return null;
    }

});
