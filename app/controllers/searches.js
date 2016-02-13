"use strict";
var path = require("path");

function searches(db) {
  var searches = db.collection("searches");

  this.saveSearch = function(search,callback) {
    var time = new Date();
    time = time.toDateString();

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
    var cursor = searches.find({},{term: 1,timestamp: 1,_id: 0});
    cursor.limit(20);
    callback(cursor);
  };
}

module.exports = searches;