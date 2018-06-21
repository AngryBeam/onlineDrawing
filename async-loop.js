//import eachSeries from 'async/eachSeries';
var async = require('async'); // for serving files

var temp = ['A','B','C','D','E'];

/* function tickTock(i) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(temp[i]);
        }, 1000);
    });
}

async function dis(i){
    await setTimeout(() => {
        return temp[i];
    }, 5000);
}

async function main (){
    let res = 0;

    for(var i=0; i<temp.length; i++){
        //let res = await tickTock(i);
        //console.log(res);
        res = await dis(i);
        console.log(`Index ${i} and Res: ${res}`);
    };
};
main(); */


async.eachSeries(temp, (data, callback) => {
    setTimeout(() =>{
        console.log(data);
        callback();
    },1000);
}, () => { console.log('Done');});