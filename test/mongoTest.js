let dbMongo = require('../core/db/dbMongo.js');

let address = 'mongodb://47.94.207.219:27017';
let dbName='test';
let tbName = 'tb_test';
let allLength = 0;
let searchTerms = "";

(async () => {
try{
  let mongo1 = await dbMongo({
    'dbAddress': address,
    'dbName': dbName
  });
  let data = await mongo1.insert({
    tbName: tbName,
    data: [{
      "name": "liwei",
      "age": "12",
      "sex": "男"
    }, {
      "name": "张三",
      "age": "23",
      "sex": "nv"
    }]
  });
  console.log('res',data);
}catch(e){
  console.log('err',e);
}
  
  
})();