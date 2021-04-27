var express = require('express'),
    path = require('path');

//create express app
var app = express();

var fs = require('fs') 

// http module    
var http = require('http');


function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
        });
    }


 
http.createServer(onRequest).listen(8000);

