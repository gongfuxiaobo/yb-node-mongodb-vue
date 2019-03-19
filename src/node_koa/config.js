const config = {
  port: 9000,
  db: 'mongodb://127.0.0.1:27017/mongodb-test', // 数据库
  saltTimes: 3 // 加盐的次数（用户密码加密）
}

module.exports = config
