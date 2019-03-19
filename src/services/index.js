const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
  const res = {
    code: 200,
    data: {},
    msg: '操作成功'
  }
  console.log(ctx.response.status)
  ctx.response.body = ctx.response.status === 200 ? res : ctx.response
  // ctx.response.body = ctx.response
  // console.log(ctx)
  await next()
})

app.listen(8000)
