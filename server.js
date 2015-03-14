var express = require('express');
var compress = require('compression');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.disable('x-powered-by'); // Shhhh! Don't tell the outside world what server we're using
app.use(errorHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(compress());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.redirect('index.html');
});
app.listen(4000, '127.0.0.1', function(err) {
    if (err) return console.err('Error: ', err.stack);
    console.log('Listening on port 4000...');
});

function errorHandler(err, req, res, next) {
    console.error('Service error: ', err.stack);
    next();
}