const NodeCron = require('cron').CronJob
const fs = require('fs')
const bankDb = require('../models/Bank.mongo')
const browserObject = require('./browser')
const scrapperController = require('./pageController')

function readAndSetData() {
    try {
        fs.readFile('data/data.json', 'utf-8', async (err, data) => {
            if (err) {
                throw err
            }

            const jsonData = JSON.parse(data)
            await bankDb.insertMany(jsonData)

        })
    } catch (error) {
        console.log(error);
    }
}

function startScrap() {
    const job = new NodeCron("30 18 * * *", function () {
        console.log(new Date());
        let browserInstance = browserObject.startBrowser()
        scrapperController(browserInstance)
        //readAndSetData()
    })

    job.start()
}

// startScrap()
module.exports = {
    startScrap
}
