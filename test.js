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
var data = { userData: 
                  { userId: 'U396611722b9956cff3f267ae06afcdea',
                    type: 'room',
                    roomId: 'R308e80a22b235702fcd72be8482d65c0',
                    viewType: 'full' },
                userProfile: 
                  { userId: 'U396611722b9956cff3f267ae06afcdea',
                    displayName: 'Beam',
                    pictureUrl: 'https://profile.line-scdn.net/0m0e4f03f77251aa21bd3fbf26b24c31f47b2bad4e6c0f',
                    statusMessage: '( ￣(エ)￣)' },
                gameData: '' 
            }
var data2 = { userData: 
              { userId: 'A396611722b9956cff3f267ae06afcdea',
                type: 'room',
                roomId: 'R308e80a22b235702fcd72be8482d65c0',
                viewType: 'full' },
            userProfile: 
              { userId: 'A396611722b9956cff3f267ae06afcdea',
                displayName: 'Beam2',
                pictureUrl: 'https://profile.line-scdn.net/0m0e4f03f77251aa21bd3fbf26b24c31f47b2bad4e6c0f',
                statusMessage: '( ￣(エ)￣)' },
            gameData: '' 
        }
const {Users} = require('./utils/users');
var users = new Users();
//users.make(data);
//users.make(data2);

console.log(users.getUser());