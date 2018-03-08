module.exports = {
  port: 8080,
  fastInterface: false,
  origns: [],
  dbConfigs: {
    mysql: {
      connectionLimit: 10,
      host: '',
      port: '3306',
      user: 'root',
      password: '',
      database: ''
    },
    mongo: ''
  }
};