var fs = require("fs");
var path = require("path");
var renderme = require("renderme");
var Searches = require(path.join(__dirname,"../controllers","searches.js"));
var Requests = require(path.join(__dirname,"../controllers","requests.js"));

module.exports = function (app,db) {

  var searches = new Searches(db);
  var requests = new Requests();

  // Visiting the service at / serves up the README.md file

  app.route("/").
    get(function(req,res) {
      renderme({
        readme: fs.readFileSync(path.join(__dirname,"../..","README.md"),'utf-8'),
        readmeFilename: 'README.md'
        },
        function rendered(err, html) {
          if (err) { throw err; }
          else {
            res.end(html);
          }
        }
      );
    });

  // users can enter a string after /imagesearch to trigger this function
  // take the search string and format it for 1- the searches database collection, and 2- the imgur api search call

  app.route("/imagesearch/:search").
    get(function(req,res) {
      var search = req.params.search;
      search = search.replace(/\c[A-Z]/g,"");
      search = search.replace(/%20/g," ");
      var q = search.replace(/ /g,",");

      var page = req.query.offset;

      // save the search in the searches collection

      searches.saveSearch(search,function() {
        console.log("saved search: " + search);
      });

      // make the call to the imgur search
      // results should be JSON-formatted and include an array at results.data
      // for each object in the data array, create a new object with the title/description/link properties
      // push the new object into the output.images array

      requests.getImages(q,page,function(results) {
        var reply = JSON.parse(results);
        var output = {
          "images": []
        };

        reply.data.forEach(function(img) {
          output.images.push(
          {
            "title": img.title,
            "description": img.description,
            "link": img.link
          });
        });

        res.end(JSON.stringify(output));
      });
  });

  // when /latest/imagesearch is accessed, call for results from searches.getSearch()
  // getSearch() returns a cursor to the found documents
  // sort the documents in descending order based on the _id field

  app.route("/latest/imagesearch").
    get(function(req,res) {
      searches.getSearch(function(cursor) {
        cursor.sort(
        {"_id": -1}
        ).toArray(function(err,docs) {
          if (err) { throw err; }
          else {
            res.end(JSON.stringify(docs));
          }
        });
      });
  });
};
