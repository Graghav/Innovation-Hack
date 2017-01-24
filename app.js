var express = require('express')
var app = express();
var parser = require('./controllers/parser');
var classifier = require('./controllers/classifier');

app.use(express.static('frontend'))

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/search/:company', function(req, res){
  var company = req.params.company;
  parser.getDataOfCompany(company,function(data){
    data.classification = classifier.classify(data);
    res.send(data)
  })
});

app.use(function(req, res){
  res.sendFile('frontend/index.html', {"root": __dirname})
})

app.listen(2000, function () {
  console.log('Server listening on port 2000')
})
