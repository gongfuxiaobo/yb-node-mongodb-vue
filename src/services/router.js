const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.get('/getUserInfo', (ctx, next) => {
  ctx.body = '获取用户信息接口'
  next()
}).post('/login', (ctx, next) => {
  ctx.body = '登陆接口'
  next()
}).get('/getShopInfo/:shopId', (ctx, next) => {
  ctx.body = `获取店铺${ctx.params.shopId}信息`
  next()
})

// router.url('/')
// router.use((ctx, next) => {
//   ctx.redirect(ctx.router.url('/getUserInfo'))
//   next()
// })

app.use(router.routes()).use(router.allowedMethods()).listen(8000)
