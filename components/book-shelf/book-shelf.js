Polymer({
  is: 'book-shelf',

  properties: {

    dataTitle : {
      value: false,
      type: String,
      reflectToAttribute: true
    },

    bookList : {
      type: Object,
      observer: "_propChangeObserver"
    },

    hidden: {
      type: Boolean,
      value: true
    }
  },

  _propChangeObserver: function(bookList){
    this.set("hidden", (bookList.length === 0));
  }

});
