
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , fs = require('fs');

var app = express();

var httpServer = http.createServer(app).listen(8080, function(req, res){
  console.log('Socket IO server has been started.');
});

app.get('/', function(req, res, next){
	fs.readFile('index.html', function(error, data){
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(data);
	});
});

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket){
	socket.emit('toclient', {msg:'Welcome !'});
	socket.on('fromclient', function(data){
		socket.broadcast.emit('toclient', data);
		socket.emit('toclient', data);
		console.log('Message from client : '+data.msg);
		
	});
});
