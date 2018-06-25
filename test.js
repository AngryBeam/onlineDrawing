/*     var temp = [ 
        { userData: 
          { userId: 'U396611722b9956cff3f267ae06afcdea',
            type: 'room',
            roomId: 'R308e80a22b235702fcd72be8482d65c0',
            viewType: 'full' },
         userProfile: 
          { userId: 'U396611722b9956cff3f267ae06afcdea',
            displayName: 'Beam',
            pictureUrl: 'https://profile.line-scdn.net/0m0e4f03f77251aa21bd3fbf26b24c31f47b2bad4e6c0f',
            statusMessage: '( ￣(エ)￣)' },
         gameData: '' },
       { userData: 
          { userId: 'U396611722b9956cff3f267ae06afcdea',
            type: 'utou',
            utouId: 'UU31286fb8d2d2b3d68e558b87c2399f93e9b7ad02f932a62e0d71174f025a37cf5ca111288ee0ac48cdeb1c739320708c27ed535610a4d5433bd432868f2ad2d6',
            viewType: 'full' },
        userProfile: 
          { userId: 'U396611722b9956cff3f267ae06afcdea',
            displayName: 'Beam',
            pictureUrl: 'https://profile.line-scdn.net/0m0e4f03f77251aa21bd3fbf26b24c31f47b2bad4e6c0f',
            statusMessage: '( ￣(エ)￣)' },
         gameData: '' },
         { userData: 
            { userId: 'U396611722b9956cff3f267ae06afcdea',
              type: 'room',
              roomId: 'R308e80a22b235702fcd72be8482d65c0',
              viewType: 'full' },
           userProfile: 
            { userId: 'U396611722b9956cff3f267ae06afcdea',
              displayName: 'Beam',
              pictureUrl: 'https://profile.line-scdn.net/0m0e4f03f77251aa21bd3fbf26b24c31f47b2bad4e6c0f',
              statusMessage: '( ￣(エ)￣)' },
           gameData: '' } 
    ];

    var namesArray = temp.map((ele) => {
        if (ele.userData.type=='room' && ele.userData.roomId=='R308e80a22b235702fcd72be8482d65c0'){
            return ele;
        }
    });

    console.log(namesArray);

 */


class Users {
    constructor () {
      this.users = [];
    }
    addUser (id, name, room) {
      var user = {id, name, room};
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

  
  var temp = new Users();
  temp.addUser(1, 'Beam', 'A');
  temp.addUser(2, 'Anu', 'B');
  temp.addUser(3, 'Kook', 'A');
  temp.addUser(4, 'Great', 'B');
  temp.addUser(5, 'Bank', 'A');
  temp.addUser(6, 'No', 'B');

  console.log(temp.getUser(3));
  