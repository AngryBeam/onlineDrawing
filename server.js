// Including libraries
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var static = require('node-static'); // for serving files

// This will make all the files in the current folder
// accessible from the web
var fileServer = new static.Server('./');
	
// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it
const port = process.env.PORT || 8080;
app.listen(port);

// If the URL of the socket server is opened in a browser
function handler(request, response) {
	request.addListener('end', function () {
		fileServer.serve(request, response);
	}).resume();
}

var replayData = [];

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {
	// Listen for mouse move events
	console.log('New Connection for id ' + socket.id);
	socket.on('mousemove', function (data) {
		
		if(data.drawing){
			console.log(data);
			replayData.push(data);
		}
		socket.broadcast.emit('moving', data); // Broadcasts event to everyone except originating client
	});
	socket.on('beforemousemove', function (data) {
		replayData.push(data);
	});
	socket.on('replay', function (data) {
		console.log('Sending Replay Data');
		//console.log(replayData);
		socket.broadcast.emit('replay', replayData);
		replayData = [];
	})
	socket.on('disconnect', () => {
		console.log('Disconnected for id ' + socket.id);
	});
});
