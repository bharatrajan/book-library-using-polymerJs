# book-library-using-polymerJs

[`DEMO`](http://bharat-library-using-polymer-js.mybluemix.net)

## My Reads
This project contains the following functionalities
- 3 classifications of books
  - Continue Reading
  - Want to Read
  - Read
- User should be able to move a book from one category to other
- User should be able to remove a book by selecting none category
- An "Add" option that lets user to "Search" for popular books
- From the search results user can add a book to the above mentioned category
- From the search results user can add more than 1 book to the above mentioned category, by bulk selecting

## To start in local machine
1. Clone the `master` branch
2. cd `book-library-using-polymerJs`
3. npm i
4. bower i
5. npm run start-dev

## Component placement
```
  <app-location/> <!-- From polymer -->
  <iron-pages> <!-- From polymer -->

    <!-- View 1 : Book listing -->
    <book-listing>
      <book-shelf> <!-- Category : Continue Reading -->
        <li><single-book/></li>
        ...
        <li><single-book/></li>
      </book-shelf>
      <book-shelf> <!-- Category : Want to read -->
        <li><single-book/></li>
        ...
        <li><single-book/></li>          
      </book-shelf>
      <book-shelf> <!-- Category : Read -->
        <li><single-book/></li>
        ...
        <li><single-book/></li>          
      </book-shelf>      
    </book-listing>

    <!-- View 2 : Book search -->
    <book-lookup>
      <!-- Search results -->
      <li><single-book/></li>
      ...
      <li><single-book/></li>    
    </book-lookup>
  </iron-pages>
```

## Backend Server
  - Backend server is written in node. File : `server.js`
  - All the data are static to the backend server
  - So a restart of the REST API will clear out any data that was submitted to the API
  - Refer : books.raml

## NPM scripts
  - To start development server : `npm run start-dev`
  - To prod development server : `npm run start`
  - To test : `npm run test`
  - To build : `npm run build`
  - To deploy : `npm run deploy`
