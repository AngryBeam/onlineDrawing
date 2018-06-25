[{
    id: '/#12poiajdspfoif',
    name: 'Andrew',
    room: 'The Office Fans'
  }]
  
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
    getUserList (room) {
      var users = this.users.filter((user) => user.room === room);
      var namesArray = users.map((user) => user.name);
  
      return namesArray;
    }
  }
  
  module.exports = {Users};