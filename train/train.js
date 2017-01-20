var fs        = require('fs');
var data      = JSON.parse(fs.readFileSync('test_data.json', 'utf8'));
var async     = require('async');
var _         = require('underscore');
var bayes     = require('bayes');
var brain     = require('brain');
var extractor = require('../controllers/parser');

var train_data  = data.slice(0, 2);

var forex_topics      = [];
var non_forex_topics  = [];

async.each(train_data, function(c, cb){

  extractor.getDataOfCompany(c.customer, function(d){
    if(c.flag == "Forex") {
      forex_topics.push(_.flatten(d));
    }
    else {
      non_forex_topics.push(_.flatten(d));
    }
    cb();
  });

}, function(err){

    // Once the topics are fetched, flatten & sort by probability
    var forex_sorted = _.chain(forex_topics)
                        .flatten()
                        .sortBy(function(topic){
                          return Math.sin(topic.probability);
                        })
                        .reverse()
                        .value();

    var non_forex_sorted = _.chain(non_forex_topics)
                        .flatten()
                        .sortBy(function(topic){
                          return Math.sin(topic.probability);
                        })
                        .reverse()
                        .value();

    // Train the Bayes Classifier with the data
    var classifier = bayes();

    _.each(forex_sorted, function(d){
      classifier.learn(d.term, 'forex');
    });

    // Serialize the data
    var stateJson = classifier.toJson()
    fs.writeFile('model.json', stateJson, function(){
      console.log("MODELED")
    })


});
