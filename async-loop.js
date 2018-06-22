//var async = require('async'); // for serving files

var temp = ['A','B','C','D','E'];



function tickTock() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            //resolve(temp[i]);
            resolve();
        }, 1000);
    });
}



async function main (){

    /* for(var i=0; i<temp.length; i++){
        let res = await tickTock();
        console.log(temp[i]);
    };  */

    /* temp.forEach(async ele => {
        let res = await tickTock();
        console.log(ele);
    }); */

};
main(); 



/* async.eachSeries(temp, (data, callback) => {
    setTimeout(() =>{
        console.log(data);
        callback();
    },1000);
}, () => { console.log('Done');}); */


