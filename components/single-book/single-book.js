Polymer({
  is: 'single-book',

  properties: {

    isMultiSelectable : {
      value: false,
      type: Boolean,
      reflectToAttribute: true
    },

    dataBookObject : {
      type: Object,
      reflectToAttribute: false,
      observer: "_propChangeObserver"
    }
  },

  _propChangeObserver: function(bookObject){
    this.set("selectStatus", "UNSELECTED");

    //Prepare AuthorList
    var authorList = "";
    if(bookObject &&
       bookObject.authors &&
       bookObject.authors.length &&
       bookObject.authors.length > 0)
       authorList = bookObject.authors.join(", ");

    //Prepare Image Link
    var imageLink = "";
    if(bookObject &&
       bookObject.imageLinks &&
       bookObject.imageLinks.thumbnail)
       imageLink = bookObject.imageLinks.thumbnail;

    this.set("authorList", authorList);
    this.set("imageLink", imageLink);
    this._presetSelectedOption(bookObject);
  },

  _presetSelectedOption: function(bookObject){
    var options = this.querySelectorAll(".enabledOption"), i;
    for(i=0; i < options.length; i++)
      if(options[i].value == bookObject.shelf){
          options[i].selected = true;
          return;
      }
  },

  _onClickHandler: function() {
    if(this.isMultiSelectable){
      this.set("selectStatus", this.selectStatus == "UNSELECTED" ? "SELECTED" : "UNSELECTED");
      this.fire("ON" + this.selectStatus, {
        "book": this.dataBookObject
      })
    }
  },

  onShelfChange: function(event) {
    this.fire("onBookShelfChanged", {
      "newShelf" : event.target.value,
      "bookId": this.dataBookObject.id
    })
  }

});
