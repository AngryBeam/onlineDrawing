// Including libraries
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, './');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));

//Using node static for transport type = websocket
/* var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var static = require('node-static'); // for serving files 
// This will make all the files in the current folder
// accessible from the web
var fileServer = new static.Server('./');
app.listen(port);
function handler(request, response) {
	request.addListener('end', function () {
		fileServer.serve(request, response);
	}).resume();
} */

var replayData,lineUserData = [];


// Listen for incoming connections from clients
io.on('connection', function (socket) {

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
		users.removeUser();
	});
	
	function getChannelID(data){
		var channelID;
		if (data.userData.type == 'utou'){
			channelID = data.userData.utouId;
		}else if(data.userData.type == 'group'){
			channelID = data.userData.groupId;
		}else if(data.userData.type == 'room'){
			channelID = data.userData.roomId;
		}
		return channelID;
	}
	socket.on('lineRegister', (data, callback) => {
		console.log(`Receiving lineRegister Command via Data: ${data}`);
		if(data.isLineUser){
			var lineUserID = data.userData.userId;
			var channelID = getChannelID(data);
			
			
			if(!users.getUser(data.userData.userId, data.userData.type, channelID)){
				console.log('User added');
				users.addUser(data.userData.userId, data.userProfile, data.userData.type, channelID, []);
			}
			
			
			//socket.join(channelID);
			/* var userData = {
				'userId': data.userData.userId,
				'profile': data.userProfile,
				'type': data.userData.type,
				'channelId': channelID,
				'gameData': gameData
			} */
			//Before can push have to check type and channel id is dupplicated or not
			/* lineUserData.push(userData);

			socket.broadcast.emit('debug', lineUserData);
			socket.broadcast.emit('debug', '=================');*/
			socket.broadcast.emit('debug', users); 

		}
		callback(`Received Line User Data. with lineUserID: ${lineUserID}`);
	});

	socket.on('debug', function (data){
		socket.broadcast.emit('debug', users);
	});

	socket.on('submitData', (data, drawKeyword, replayData, callback) => {
		//console.log(`Receiving submitData Command via Data: ${data}`);
		var channelID = getChannelID(data);
		var gameData = {
			'status': true,
			'keyword': drawKeyword,
			'replayData': replayData
		}
		users.saveGame(data.userData.userId, data.userData.type, channelID, gameData);
		socket.broadcast.emit('debug', gameData);
		callback('Received Replay Data.');
	});

	socket.on('requestUserList', (data) => {
		console.log(`Received command requestUserList with ${data}`);
		var channelID = getChannelID(data);
		var user = users.getUser(data.userData.userId, data.userData.type, channelID);
		socket.broadcast.emit('debug', '=====requestUserList=====');
		socket.broadcast.emit('debug', user);
		console.log(user);
		//var userList = users.getUserList(user.type, user.channelID);
		//socket.broadcast.emit('debug', userList);
	});
});


server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});