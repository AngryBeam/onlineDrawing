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

var replayData = [];


// Listen for incoming connections from clients
io.on('connection', function (socket) {
	var users = new Users();
	console.log('New Connection for id ' + socket.id);
	function isLine(data){
		return users.make(data);
	}	
	

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
		console.log(`Receiving lineRegister Command via Data: ${data}`);
		if(isLine(data)){ 
			callback('Received Line User Data. with lineUserID: ' + users.getUserId());
		}
	});

	socket.on('debug', function (data){
		console.log('Received command Debug');
		socket.broadcast.emit('debug', users.getUserAll());
	});

	socket.on('submitData', (data, drawKeyword, replayData, callback) => {
		console.log(`Received command submitData with: ${data}`);
		if(isLine(data)){
			var gameData = {
				'status': true,
				'keyword': drawKeyword,
				'replayData': replayData
			}
			users.saveGame(gameData);
			socket.broadcast.emit('debug', gameData);
			callback('Received Replay Data.');
		}
	});

	socket.on('requestUserList', (data) => {
		console.log(`Received command requestUserList with: ${data}`);
		if(isLine(data)){
			console.log(`Received command requestUserList.`);
			
			var user = users.getUser();
			socket.broadcast.emit('debug', '=====requestUserList=====');
			socket.broadcast.emit('debug', user);
			console.log(user);
			//var userList = users.getUserList(user.type, user.channelID);
			//socket.broadcast.emit('debug', userList);
		}
	});
});


server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});