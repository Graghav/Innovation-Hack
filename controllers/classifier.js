var bayes     = require('bayes');
var fs        = require('fs');
var path      = require('path');
var model     = fs.readFileSync(path.join(__dirname, 'model.json'), 'utf8');
var _         = require('underscore');

var classifier = bayes.fromJson(model);

exports.classify = function(data) {
  var tmp = "";

  if(data.wiki) {
    tmp += data.wiki;
  }
  if(data.topics) {
    tmp = _.chain(data.topics).flatten().map(function(f){ return f.term; }).value().toString();
  }

  return classifier.categorize(tmp);
}
