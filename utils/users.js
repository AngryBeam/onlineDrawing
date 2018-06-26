[{
    id: '/#12poiajdspfoif',
    name: 'Andrew',
    room: 'The Office Fans'
  }]
  /* var userData = {
				'userId': data.userData.userId,
				'profile': data.userProfile,
				'type': data.userData.type,
				'channelId': channelID,
				'gameData': gameData
			} */
  // addUser(id, name, room)
  // removeUser(id)
  // getUser(id)
  // getUserList(room)
  
  class Users {
    constructor () {
      this.users = [];
    }
    addUser (id,userId,profile,type,channelId,gameData) {
      var user = {id,userId,profile,type,channelId,gameData};
      this.users.push(user);
      return user;
    }
    removeUser (id) {
      var user = this.getUser(id);
  
      if (user) {
        this.users = this.users.filter((user) => user.id !== id);
      }
  
      return user;
    }
    getUser (id) {
      return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (type, channelId) {
      var users = this.users.filter((user) => user.type === type && user.channelId === channelId);
      var namesArray = users.map((user) => user.profile);
  
      return namesArray;
    }
    saveGame(id, gameData){
      var user = this.getUser(id);
      if(user){
        this.users[id].gameData.push(gameData);
      }
      return user;
    }
  }
  
  module.exports = {Users};