function createMysqlInterface(mysql) {
  return new Promise((resolve,reject)=>{
    try {
      let result = {};
      let tbSqlText = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" + mysql.config.database + "'";
      let tables = await mysql.query(tbSqlText);
      tables.list.forEach(v => {
        let columnSqlText = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLENAME='" + v['TABLE_NAME']+"'";
        let column = await mysql.query(columnSqlText);  
      });
      resolve(result);
    } catch (err) {
      reject({ec:-1,es:err});
    } 
  });
}

function createMongoInterface(mongo) {

}


module.exports = (mysql, mongo) => {
  mysql && createMysqlInterface(mysql);
  mongo && createMongoInterface(mongo);
};