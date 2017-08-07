Polymer({
    is: 'single-book',

    /**
     * @description - properties
     */
    properties: {
        /**
         * @description - Will let user to select multiple books
         * @description - at the same time
         * @value - true | false
         */
        isMultiSelectable: {
            value: false,
            type: Boolean,
            reflectToAttribute: true
        },
        /**
         * @description - Main model that displays the book
         * @observer - _propChangeObserver will change whenever this prop changes
         */
        dataBookObject: {
            type: Object,
            reflectToAttribute: false,
            observer: "_propChangeObserver"
        }
    },

    /**
     * @description - Will change whenever dataBookObject changes.
     * @description - takes dataBookObject & massages it for display
     * @observer
     * @param {object} bookObject - Main model that displays the book
     * @returns null
     */
    _propChangeObserver: function(bookObject) {
        this.set("selectStatus", "UNSELECTED");

        //Prepare AuthorList
        var authorList = "";
        if (bookObject &&
            bookObject.authors &&
            bookObject.authors.length &&
            bookObject.authors.length > 0)
            authorList = bookObject.authors.join(", ");

        //Prepare Image Link
        var imageLink = "";
        if (bookObject &&
            bookObject.imageLinks &&
            bookObject.imageLinks.thumbnail)
            imageLink = bookObject.imageLinks.thumbnail;

        this.set("authorList", authorList);
        this.set("imageLink", imageLink);
        this._presetSelectedOption(bookObject);
        return null;
    },

    /**
     * @description - Compute "selected" prop of book on load
     * @param {object} bookObject - Main model that displays the book
     * @returns none
     */
    _presetSelectedOption: function(bookObject) {
        var options = this.querySelectorAll(".enabledOption"),
            i;
        for (i = 0; i < options.length; i++)
            if (options[i].value == bookObject.shelf) {
                options[i].selected = true;
                return null;
            }
    },

    /**
     * @description - On click event handler. Toggles selected || unselected state
     * @description - Fires ONSELECTED | ONUNSELECTED event to parent
     * @eventListener
     * @param {object} event - on-click event
     * @returns null
     */
    _onClickHandler: function(event) {
        if (this.isMultiSelectable) {
            this.set("selectStatus", this.selectStatus == "UNSELECTED" ? "SELECTED" : "UNSELECTED");
            this.fire("ON" + this.selectStatus, {
                "book": this.dataBookObject
            })
        }
        return null;
    },

    /**
     * @description - Fires onBookShelfChanged event to parent
     * @description - Fires newShelf & this bookId to parent
     * @eventListener
     * @param {object} event - on-change event
     * @returns null
     */
    onShelfChange: function(event) {
        this.fire("onBookShelfChanged", {
            "newShelf": event.target.value,
            "bookId": this.dataBookObject.id
        })
        return null;
    }

});
