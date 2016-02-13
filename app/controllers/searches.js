"use strict";
var path = require("path");

function searches(db) {
  var searches = db.collection("searches");

  this.saveSearch = function(search,callback) {

    // insert a new document consisting of the search term and the current date in ISO string format

    var time = new Date();
    time = time.toISOString();

    searches.insert(
      {"term": search,
        "timestamp": time},
      function(err) {
        if (err) { throw err; }
        else {
          if (callback) { callback(); }
        }
      });
  };

  this.getSearch = function(callback) {

    // retrieve up to 50 documents from the searches collection and return the cursor to the results

    var cursor = searches.find({},{term: 1,timestamp: 1,_id: 0});
    cursor.limit(50);
    callback(cursor);
  };
}

module.exports = searches;
