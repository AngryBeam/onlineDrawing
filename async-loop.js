//var async = require('async'); // for serving files

var temp = ['A','B','C','D','E'];

function tickTock(i) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(temp[i]);
        }, 1000);
    });
}

async function dis(i){
    return await setTimeout(async () => {
        await console.log(i);
    }, 1000);
}

async function main (){

    for(var i=0; i<temp.length; i++){
        let res = await tickTock(i);
        console.log(res);
        //res = await dis(i);
        
    };
    /* await temp.map(arr =>{
        dis(arr);
    });  */

    let res = await Promise.all(temp.map(async arr => {
        
        await setTimeout(() => {
            console.log(arr);
        },1000);
    }));
};
main();



/* async.eachSeries(temp, (data, callback) => {
    setTimeout(() =>{
        console.log(data);
        callback();
    },1000);
}, () => { console.log('Done');}); */