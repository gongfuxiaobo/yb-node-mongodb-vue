const Koa = require('koa')
const config = require('./config')
// const cors = require('koa2-cors')
const mongoose = require('mongoose')
const app = new Koa()
const koaBody = require('koa-body')

mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.error('failed to connect to database')
    console.error(err)
  } else {
    console.log('connect success')
  }
})

app.use(koaBody())

const router = require('./router')
app.use(router.routes(), router.allowedMethods())

app.listen(config.port)
