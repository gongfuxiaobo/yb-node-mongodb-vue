const UserSchema = require('./user')

// 分页查询用户
const getUser = async (ctx, next) => {
  const req = ctx.query
  const num = req.pageNum ? req.pageNum : 1
  const size = req.size ? req.size : 10
  const total = await UserSchema.count({})
  const result = await UserSchema.find({}).sort({ 'student': 1 }).limit(size).skip((num - 1) * size)

  ctx.body = {
    code: 0,
    data: {
      data: result || {},
      pageNum: num,
      pageSize: size,
      totalSize: total || 0
    },
    msg: '查询成功'
  }
}

// 新增用户
const addUser = async (ctx, next) => {
  const req = ctx.request.body

  const userName = await UserSchema.findOne({
    userName: req.userName
  })

  if (userName) {
    ctx.body = {
      code: 1,
      data: {},
      msg: '用户名已存在'
    }

    return
  }

  req['id'] = 'ybmgdb' + new Date().getTime()
  req['userId'] = req.id

  const user = new UserSchema(req)
  const result = await user.save()

  ctx.body = {
    code: result ? 0 : 1,
    data: {},
    msg: `添加${result ? '成功' : '失败'}`
  }
}

// 编辑用户信息
const updateUser = async (ctx, next) => {
  const req = ctx.request.body

  const id = await UserSchema.findOne({
    id: req.id
  })

  if (id === null) {
    ctx.body = {
      code: 1,
      data: {},
      msg: '用户不存在'
    }

    return
  }

  const result = await UserSchema.update({
    'id': req.id
  }, {
    name: req.name,
    sex: req.sex,
    age: req.age,
    address: req.address,
    student: req.student
  })

  ctx.body = {
    code: result ? 0 : 1,
    data: {},
    msg: `编辑${result ? '成功' : '失败'}`
  }
}

// 删除用户
const removeUser = async (ctx, next) => {
  const req = ctx.query

  const id = await UserSchema.findOne({
    id: req.id
  })

  if (id === null) {
    ctx.body = {
      code: 1,
      data: {},
      msg: '用户不存在'
    }

    return
  }

  const result = await UserSchema.remove({
    'id': req.id
  })

  ctx.body = {
    code: result ? 0 : 1,
    data: {},
    msg: `删除${result ? '成功' : '失败'}`
  }
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  removeUser
}
