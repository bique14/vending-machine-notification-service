const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const appConfig = require('./config')
const indexRoute = require('./routes')
const app = new Koa()

app.use(bodyParser())
app.use(indexRoute.routes())

console.log(`server start at http://localhost:${appConfig.NODE_PORT}`)
const server = app.listen(appConfig.NODE_PORT).on('error', (err) => {
  console.log(err)
})

module.exports = server
