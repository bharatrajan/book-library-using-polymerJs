suite('<single-book>', function() {
  var sbFixture, localTestData =  {
        "title": "Drama",
        "authors": [
          "Raina Telgemeier"
        ],
        "publisher": "Scholastic Inc.",
        "publishedDate": "2014-07-29",
        "description": "From Raina Telgemeier, the #1 New York Times bestselling, multiple Eisner Award-winning author of Smile and Sisters! Callie loves theater. And while she would totally try out for her middle school's production of Moon over Mississippi, she can't really sing. Instead she's the set designer for the drama department's stage crew, and this year she's determined to create a set worthy of Broadway on a middle-school budget. But how can she, when she doesn't know much about carpentry, ticket sales are down, and the crew members are having trouble working together? Not to mention the onstage AND offstage drama that occurs once the actors are chosen. And when two cute brothers enter the picture, things get even crazier!",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9780545779968"
          },
          {
            "type": "ISBN_10",
            "identifier": "0545779960"
          }
        ],
        "readingModes": {
          "text": true,
          "image": true
        },
        "pageCount": 240,
        "printType": "BOOK",
        "categories": [
          "Juvenile Fiction"
        ],
        "averageRating": 4,
        "ratingsCount": 3407,
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": true,
        "contentVersion": "1.8.8.0.preview.3",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=1w4fAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=1w4fAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "en",
        "previewLink": "http://books.google.com/books?id=1w4fAwAAQBAJ&printsec=frontcover&dq=drama&hl=&cd=1&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=1w4fAwAAQBAJ&source=gbs_api",
        "canonicalVolumeLink": "https://market.android.com/details?id=book-1w4fAwAAQBAJ",
        "id": "1w4fAwAAQBAJ",
        "shelf": "none"
      };


  setup(function(){
        sbFixture = fixture('single-book-fixture');
        sbFixture.set("dataBookObject", localTestData);
  });

  //########################  Exist & Attached  ########################
  test('Is exist 001', function() {
      expect(sbFixture).to.exist;
  });

  test('Is Attached', function() {
      assert.isTrue(sbFixture.isAttached);
  });

  test('Book title match', function() {
      var bookTitle = sbFixture.querySelector('.book-title').innerText;
      assert.equal(bookTitle, 'Drama', 'Book title matched');
  });

});
