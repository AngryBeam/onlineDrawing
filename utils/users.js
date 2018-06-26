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
    addUser (userId,profile,type,channelId,gameData) {
      var user = {userId,profile,type,channelId,gameData};
      this.users.push(user);
      return user;
    }
    removeUser (userId,type,channelId) {
      var user = this.getUser(userId,type,channelId);
  
      if (user) {
        this.users = this.users.filter((user) => user.userId !== userId && user.type !== type && user.channelId !== channelId);
      }
  
      return user;
    }
    getUser (userId,type,channelId) {
      return this.users.filter((user) => user.userId === userId && user.type === type && user.channelId === channelId)[0]
    }
    getUserList (type, channelId) {
      var users = this.users.filter((user) => user.type === type && user.channelId === channelId);
      var namesArray = users.map((user) => user.profile);
  
      return namesArray;
    }
    getUserIndex (userId,type,channelId) {
      return this.users.find((user, index) => {
        if(user.userId === userId && user.type === type && user.channelId === channelId){
          return index;
        }
      })
    }

    saveGame(userId,type,channelId,gameData){
      var index = this.getUserIndex(userId,type,channelId);
      if(index){
        this.users[index].gameData.push(gameData);
      }
      return user;
    }
  }
  
  module.exports = {Users};