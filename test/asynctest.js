let arr=[1,2,3,4,5,6];

function getItem(arr){
  return new Promise(async (resolve,reject)=>{
    let res =[];
    for(var i =0;i<arr.length;i++){
      v = await delayApply(arr[i]);
      res.push('处理第'+v+'条');
    }
    resolve(res);
  });
}
function delayApply(item){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(item);
    }, Math.floor(Math.random() * 1000 + 1));
  });
}
(async()=>{
  console.log(await getItem(arr));
})()