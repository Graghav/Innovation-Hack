var request     = require('request');
var extractor   = require('unfluff');
var request     = require('request');
var wikipedia   = require("wikipedia-js");
var google      = require('google');
var _           = require('underscore');
var htmlToText  = require('html-to-text');
var async       = require('async');
var lda         = require('lda');


function extractFromWikipedia(query, callback) {
  var options = {query: query, format: "html", summaryOnly: false};
  wikipedia.searchArticle(options, function(err, htmlWikiText){
    if(err){
      console.log("An error occurred[query=%s, error=%s]", query, err);
      return;
    }
    else {
      callback(htmlWikiText);
    }
  });
}

function extractFromGoogle(query, callback) {
  google.resultsPerPage = 10;
  google(query, function(err, res){
    if (err) {
      console.error(err)
      return;
    }
    else {
      var links =  _.map(res.links, function(link){
                      return link.href;
                    });
      callback(links);
    }

  });
}

function extractContentFromUrl(link, callback) {
  request(link, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body)
    }
    else {
      callback(null);
    }
  })
}

function parseHTML(html) {
  return extractor(html);
}

function htmlToText(html) {
  return htmlToText.fromString(html);
}

function extractTopics(content) {
  var docs = content.match( /[^\.!\?]+[\.!\?]+/g );
  return lda(docs, 5, 5);
}

exports.getDataOfCompany = function(company, callback) {

  extractFromGoogle(company, function(urls){
    var content = "";
    var tmp = "";
    // Iterate through the url & fetch the content of the url
    async.each(urls, function(url, cb){
      if(url) {
        extractContentFromUrl(url, function(c){
          tmp = htmlToText.fromString(c);
          content += tmp;
          cb();
        });
      }
      else {
        cb();
      }
    }, function(err){
      // Once all the data are fetched, perform topic modelling on the data
      console.log("MODELING TOPICS");
      callback(extractTopics(content))
    });
  });

}
