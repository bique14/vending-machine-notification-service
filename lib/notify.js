const { TOKEN } = require('../config')
const request = require('./request')

const notify = (message) => {
  const options = {
    method: 'POST',
    url: 'https://notify-api.line.me/api/notify',
    headers: {
      'cache-control': 'no-cache',
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: { message }
  }

  return request(options, (error, response, body) => {
    if (error) throw new Error(error)
  })
}

module.exports = notify
