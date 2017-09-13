const Mongo = require('../core/db/dbMongo.js');


const config = {
  dbAddress: 'mongodb://47.94.207.219:27017/test'
};

(async() => {
  let mongo;
  try {
    mongo = await Mongo(config);
  } catch (e) {
    console.log(e);
  }

  try {
    console.log('新增成功', await mongo.insert({
      data: {
        name: '测试数据n',
        description: '啊哈？'
      },
      tbName: 'tb_test'
    }));
  } catch (e) {
    console.log('新增失败', e);
  }

  try {
    console.log('查询多条成功', await mongo.find({
      tbName: 'tb_test',
      terms: {
        name: '测试数据n'
      }
    }));
  } catch (e) {
    console.log('查询多条失败', e);
  }

  try {
    console.log('查询一条成功', await mongo.findOne({
      tbName: 'tb_test',
      terms: {
        name: '测试数据n'
      }
    }));
  } catch (e) {
    console.log('查询一条失败', e);
  }

  try {
    console.log('更新成功', await mongo.update({
      tbName: 'tb_test',
      terms: {
        name: '测试数据n'
      },
      data: {
        description: '啊哈哈',
        name: '测试数据n',
        url: 'https://www.baidu.com'
      }
    }));
  } catch (e) {
    console.log('更新失败', e);
  }

  try {
    console.log('删除成功', await mongo.remove({
      tbName: 'tb_test',
      terms: {
        name: '测试数据n'
      }
    }));
  } catch (e) {
    console.log('删除失败', e);
  }
})();