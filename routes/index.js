const Router = require('koa-router')
const router = new Router()
const notify = require('../lib/notify')

router.post('/', async (ctx, next) => {
  ctx.status = 200
  ctx.body = { msg: 'success' }

  const { message } = ctx.request.body
  notify(message)

  await next()
})

module.exports = router
