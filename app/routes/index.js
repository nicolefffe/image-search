var fs = require("fs");
var path = require("path");
var renderme = require("renderme");
var Searches = require(path.join(__dirname,"../controllers","searches.js"));

module.exports = function (app,db) {

  var searches = new Searches(db);

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

  app.route("/imagesearch/:search").
    get(function(req,res) {
      var search = req.params.search;
      search = search.replace(/\c[A-Z]/g,"");
      var searchSave = search.replace(/%20/g," ");

      var query = req.query.offset;

      searches.saveSearch(searchSave,function() {
        res.end("saved search: " + searchSave);
      });
  });

  app.route("/latest/imagesearch").
    get(function(req,res) {
      searches.getSearch(function(cursor) {
        cursor.toArray(function(err,docs) {
          if (err) { throw err; }
          else {
            res.end(JSON.stringify(docs));
          }
        });
      });
  })
};