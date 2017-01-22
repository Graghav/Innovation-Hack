var fs        = require('fs');
var data      = JSON.parse(fs.readFileSync('test_data.json', 'utf8'));
var async     = require('async');
var _         = require('underscore');
var bayes     = require('bayes');
var brain     = require('brain');
var extractor = require('../controllers/parser');

var forex_test = _.filter(data, function(d){ return d.flag == "Forex"  });
var non_forex_test = _.filter(data, function(d){ return d.flag != "Forex"  });

var train_data  = _.union(forex_test.splice(0,10), non_forex_test.splice(0,10));

var forex_topics      = [];
var non_forex_topics  = [];

// Asynchronously fetch the data of the test company from the extractor
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
    // Once the collections are fetched, flatten & sort by probability
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

    // Create a Bayes Classifier
    var classifier = bayes();

    // Train the Classifier with Positive / Forex data
    _.each(forex_sorted, function(d){
      classifier.learn(d.term, 'forex');
    });

    // Train the Classifier with Negative / Non-Forex data
    _.each(non_forex_sorted, function(d){
      classifier.learn(d.term, 'non-forex');
    });

    // Serialize the data & store the model
    var stateJson = classifier.toJson()
    fs.writeFile('model.json', stateJson, function(){
      console.log("MODELED")
    })


});
