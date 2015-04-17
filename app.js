var express = require('express');
var app = express();
var mongoose = require('mongoose');
var slug = require('mongoose-slugs');
var baucis = require('baucis');
var swagger = require('baucis-swagger');

mongoose.connect('mongodb://localhost/baucis');

var Project = new mongoose.Schema({
  name: { type: String, required: false},
  slug: String
});

// Register the schema
mongoose.model('project', Project);

var projects = baucis.rest('project');
projects.use(function(req, res, next) {
  console.log(req.url);
  next();
});
app.use('/api', baucis());
app.get('/docs', function (req,res, next) {
  res.redirect('/api-doc/?url=http://localhost:3333/api/documentation');
});
app.use('/api-doc', express.static(__dirname + '/node_modules/swagger-ui/dist'));

baucis().releases('0.0.1');

mongoose.connection.on('connected', function () {
  console.log('connected');
  app.listen(3333);
});
