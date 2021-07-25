const functions = require('firebase-functions')
const request = require('request')

const TOKEN = 'nKIfMWswGTVhOfhHdUV4yV2x6dVSGtrsM6Tl241omjQ'

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.scheduledFunction = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    console.log('This will be run every 1 hours! 😊🎉🇹🇭')
    const item = await checkStock()
    if (item.length > 0)
      await notify(`Item nearly or out of stock\n\n${item
        .map((l, i) => {
          return `${l.location}\n${l.nearlyOutOfStock.join('\n')}\n=====\n`
        })
        .join('\n')}
      `)

    return null
  })

const checkStock = async () => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'GET',
        url: 'https://vending-machine-service.herokuapp.com/admin/check-quantity'
      },
      (error, response, body) => {
        if (error) reject()
        resolve(JSON.parse(response.body))
      }
    )
  })
}

const notify = (message) => {
  return new Promise((resolve, reject) => {
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

    request(options, (error, response, body) => {
      if (error) reject()
      resolve()
    })
  })
}
