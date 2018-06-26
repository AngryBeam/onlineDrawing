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

    make(data){
      this.data = data;
      this.userId = data.userData.userId;
      this.channelType = data.userData.type;
      this.displayName = data.userProfile.displayName;
      this.pictureUrl = data.userProfile.pictureUrl;
      this.gameData = [];
      this.channelId = this.getChannelID();
      var getUser = this.getUser(this.lineUserID,this.channelType,this.channelId);
      console.log(getUser);
      if(!getUser){
        return this.addUser();
      }
    }

    addUser () {
      var user = { 'userId': this.userId,
                  'displayName': this.displayName,
                  'pictureUrl': this.pictureUrl,
                  'channelType': this.channelType,
                  'channelId': this.channelId,
                  'gameData': this.gameData
                };
      this.users.push(user);
      return user;
    }
    /* removeUser (userId,type,channelId) {
      var user = this.getUser(userId,type,channelId);
      if (user) {
        this.users = this.users.filter((user) => user.userId !== userId && user.type !== type && user.channelId !== channelId);
      }
      return user;
    } */
    getUserId () {
      return this.userId;
    }
    getUser () {
      return this.users.filter((user) => user.userId === this.userId && user.channelType === this.channelType && user.channelId === this.channelId)[0]
    }
    getUserList () {
      var users = this.users.filter((user) => user.channelType === this.channelType && user.channelId === this.channelId);
      console.log(users);
      var namesArray = users.map((user) => user.displayName);
  
      return namesArray;
    }
    getUserIndex () {
      return this.users.findIndex((user) => 
        user.userId === this.userId && user.channelType === this.channelType && user.channelId === this.channelId
      )
    }
    getUserAll () {
      return this.users;
    }
    saveGame(gameData){
      var index = this.getUserIndex();
      if(index){
        this.users[index].gameData.push(gameData);
      }
      return user;
    }

    getChannelID(){
      if (this.data.userData.type == 'utou'){
        return this.data.userData.utouId;
      }else if(this.data.userData.type == 'group'){
        return this.data.userData.groupId;
      }else if(this.data.userData.type == 'room'){
        return this.data.userData.roomId;
      }
    }
  }
  
  module.exports = {Users};