let Mysql = require('../core/db/dbMysql.js');
let mysql = new Mysql({
  connectionLimit: 10,
  host: '47.94.207.219',
  port: '3306',
  user: 'root',
  password: '7crH5H7KbuHx5YdL',
  database: 'test',
});

(async() => {
  try {
    console.log('新增单条成功', await mysql.insert({
      tbName: 'tb_test',
      data: {
        name: '测试数据n',
        description: '啊哈哈b'
      }
    }));
  } catch (e) {
    console.log('新增单条失败', e);
  }
})();

(async() => {
  try {
    console.log('新增多条成功', await mysql.insert({
      tbName: 'tb_test',
      data: [{
        name: '测试数据4',
        description: '啊哈哈4'
      }, {
        name: '测试数据5',
        description: '啊哈哈5'
      }, {
        name: '测试数据6',
        description: '啊哈哈6'
      }]
    }));
  } catch (e) {
    console.log('新增多条失败', e);
  }
})();

(async() => {
  try {
    console.log('查询成功', await mysql.select({
      tbName: 'tb_test',
      terms: {
        name: '测试数据n',
        description: '啊哈哈'
      }
    }));
  } catch (e) {
    console.log('查询失败', e);
  }
})();

(async() => {
  try {
    console.log('更新成功', await mysql.update({
      tbName: 'tb_test',
      data: {
        description: 'description2'
      },
      terms: [{
        field: 'name',
        value: '%测试数据%',
        term: 'like'
      }, {
        field: 'description',
        value: '%啊哈哈%',
        term: 'like'
      }]
    }));
  } catch (e) {
    console.log('更新失败', e);
  }
})();

(async() => {
  try {
    console.log('删除成功', mysql.remove({
      tbName: 'tb_test1',
      terms: [{
        field: 'name',
        value: '%test%',
        term: 'like'
      }]
    }));
  } catch (e) {
    console.log('删除失败', e);
  }
})();