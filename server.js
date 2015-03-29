var express = require('express');
var https = require('https');
var compress = require('compression');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(errorHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(compress());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.redirect('index.html');
});

app.get('/pics', function(req, res) {
	var flickrUrl = 'https://www.flickr.com/services/feeds/photos_public.gne/?format=json&jsoncallback=?';
	if (req.query.tags) {
		flickrUrl += '&tags=' + req.query.tags;
	}
    https.get(flickrUrl, function(httpResponse) {
    	var data = "";
        res.setHeader('Content-Type', 'application/json');
        httpResponse.on('data', function(chunk) {
			data += chunk;
		});
		httpResponse.on('end', function(chunk) {
            data = "jsonpToJson" + data; //hack to extract the value in json format
            var json = eval(data);
        	res.send(json);
		});
    }).on('error', function(err) {
        res.status(500).send(err);
    });
});

function jsonpToJson(json) {
    return json;
}

var port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', function(err) {
    if (err) return console.err('Error: ', err.stack);
    console.log('Listening on port ' + port);
});

function errorHandler(err, req, res, next) {
    console.error('Service error: ', err.stack);
    next();
}