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
			var lineUserID = data.userData.userId;
			var channelID;
			if (data.userData.type == 'utou'){
				channelID = data.userData.utouId;
			}else if(data.userData.type == 'group'){
				channelID = data.userData.groupId;
			}else if(data.userData.type == 'room'){
				channelID = data.userData.roomId;
			}
			var gameData = {
				'status': false,
				'keyword': '',
				'replayData': ''
			}
			var userData = {
				'userId': data.userData.userId,
				'profile': data.userProfile,
				'type': data.userData.type,
				'channelId': channelID,
				'gameData': gameData
			}
			//Before can push have to check type and channel id is dupplicated or not
			lineUserData.push(userData);


			console.log(lineUserData);
			socket.broadcast.emit('debug', lineUserData);
		}
		callback(`Received Line User Data. with lineUserID: ${lineUserID}`);
	});

	socket.on('debug', function (data){
		socket.broadcast.emit('debug', data);
	});

	socket.on('submitData', (data, callback) => {
		socket.broadcast.emit('debug', data);
		callback('Received Replay Data.');
	});
});
