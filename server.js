// Including libraries
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var static = require('node-static'); // for serving files

// This will make all the files in the current folder
// accessible from the web
var fileServer = new static.Server('./');
	

const port = process.env.PORT || 8080;
app.listen(port);


function handler(request, response) {
	request.addListener('end', function () {
		fileServer.serve(request, response);
	}).resume();
}

var replayData,lineUserData = [];

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {

	console.log('New Connection for id ' + socket.id);
	
	function socketBroadcast(isLineUser, command, data){
		if(isLineUser){
			socket.broadcast.to(lineUserData.initID).emit(command, data); 
		}else{
			socket.broadcast.emit(command, data); 
		}
	}
	socket.on('mousemove', function (data) {
		
		if(data.drawing){
			console.log(data);
			replayData.push(data);
		}
		socket.broadcast.emit('moving', data); // Broadcasts event to everyone except originating client
		
	});

	/* socket.on('beforemousemove', function (data) {
		replayData.push(data);
	}); */

	socket.on('replay', function (data) {
		console.log('Sending Replay Data');
		//console.log(replayData);
		socket.broadcast.emit('replay', replayData);
		replayData = [];
	});

	socket.on('disconnect', () => {
		console.log('Disconnected for id ' + socket.id);
	});

	socket.on('lineRegister', (data, callback) => {
		if(data.isLineUser){
			var lineUserID = data.userData[0].context.userId;
			lineUserData[lineUserID].push(data.userData[0].context, data.userData[1]);
			socket.broadcast.emit('debug', lineUserData);
		}
		callback('Received Line User Data.');
	});

	socket.on('debug', function (data){

	});

	socket.on('submitData', (data, callback) => {
		data.forEach(element => {
			
		});
		callback('Received Replay Data.');
	});
});
