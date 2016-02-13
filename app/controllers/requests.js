"use strict";
var https = require("https");
require("dotenv").load();

function requests() {

  var id = process.env.IMGUR_ID;
  var imgurhost = "api.imgur.com";

  this.getImages = function(search,page,callback) {

    // search the main gallery
    var path = "/3/gallery/search.json/";

    // use the q_all key to require each search term
    path += "?q_all=" + search;

    // if the user enters imagesearch/:search?offset=<#>, add the # as "page" to the path
    if (page) {
      path += "&page=" + page;
    }

    console.log(path);

    // the imgur api requires an https connection and, for anon requests, an Authorization header with a client-id
    // this client-id can be created by registering the app at https://api.imgur.com/oauth2/addclient
    // add the client-id to a .env file in the root dir of the application

    var req = https.request({
      hostname: imgurhost,
      path: path,
      method: "GET",
      headers: {"Authorization": "Client-ID " + id}
    },function(results) {
      console.log("getting results");
      var reply = "";

      results.on("data",function(chunk) {
        reply += chunk;
      });

      results.on("end",function() {
        console.log("done");
        callback(reply);
      });
    });

    req.on("error",function(err) {
      console.log(err);
    });
    req.end();
  }

};

module.exports = requests;
