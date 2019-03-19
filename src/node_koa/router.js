const Router = require('koa-router')
const router = new Router()
const controller = require('./controller')

// 获取用户列表
router.get('/yb-user-provider/getUser', controller.getUser)
// 新增用户
router.post('/yb-user-provider/addUser', controller.addUser)
// 编辑用户
router.put('/yb-user-provider/updateUser', controller.updateUser)
// 删除用户
router.delete('/yb-user-provider/removeUser', controller.removeUser)

module.exports = router
