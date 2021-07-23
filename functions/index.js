const functions = require('firebase-functions')
const request = require('request')

const TOKEN = 'nKIfMWswGTVhOfhHdUV4yV2x6dVSGtrsM6Tl241omjQ'

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.scheduledFunction = functions.pubsub
  .schedule('every day 00:00')
  .onRun(async (context) => {
    console.log('This will be run every day 00:00! 😊🎉🇹🇭')
    const item = await checkStock()
    const a = await notify(item.data)

    return null
  })

// TODO: send request to Backend API for check item in stock
// If item less then 10 > send notification to admin
// else nothing

const checkStock = async () => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'GET',
        url: 'https://mocki.io/v1/09ad4501-74c4-4161-add4-6589e26ebfd2'
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
