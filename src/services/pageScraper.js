const fs = require('fs')
const bankDb = require('../models/Bank.mongo')


function getResult(purchases, sales) {
    let banks = new Set()
    let result = []
    purchases.forEach((purchase) => {
        sales.forEach((sale) => {
            if (purchase.exchange == sale.exchange && purchase.bank == sale.bank) {
                const obj = {
                    exchange: purchase.exchange,
                    bank: purchase.bank,
                    buy: purchase.course,
                    sale: sale.course
                }
                
                banks.add(obj)
            }
        })
    });

    banks.forEach((e) => {
        let has_exchange = result.find(j => j.exchange == e.exchange)
        if (has_exchange) {
            has_exchange.banks.push(e)
        } else {
            let arr = []
            arr.push(e)
            result.push({
                exchange: e.exchange,
                banks: arr
            })
        }
    })

    return result
}


const scraperObject = {
    url: 'https://bank.uz/currency/dollar-ssha',
    async scraper(browser) {
        let page = await browser.newPage()
        console.log('Navigation to ' + this.url)
        await page.goto(this.url)
        await page.click(".all-courses")

        let purchases = await page.$$eval('.tab-content > .tab-pane > .bank-contacts > .feed-back .organization-contacts > .bc-inner-blocks-left > .bc-inner-block-left > .bc-inner-block-left-texts', (txt) => {

            let purchase = txt.map(item => {
                const obj = {
                    exchange: item.querySelector(".bc-inner-block-left-text").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.split("_")[1],
                    bank: item.querySelector(".bc-inner-block-left-text").querySelector('a').querySelector('span').innerText,
                    course: Number(item.querySelector(".green-date").innerText.split(" сум")[0].split(" ").join(''))
                }
                return obj
            })

            return purchase

        })

        let sales = await page.$$eval('.tab-content > .tab-pane > .bank-contacts > .feed-back .organization-contacts > .bc-inner-blocks-right > .bc-inner-block-left-texts ', (txt) => {

            let sale = txt.map(item => {
                const obj = {
                    exchange: item.querySelector(".bc-inner-block-left-text").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.split("_")[1],
                    bank: item.querySelector(".bc-inner-block-left-text").querySelector('a').querySelector('span').innerText,
                    course: Number(item.querySelector(".green-date").innerText.split(" сум")[0].split(" ").join(''))
                }
                return obj
            })

            return sale

        })


        let result = {
            date: new Date().toISOString().split('T')[0],
            results: getResult(purchases, sales)
        }
        
        await bankDb.insertMany(result)
        console.log("Data added in db");

//         let json = JSON.stringify(result)

//         fs.writeFile('data/data.json', json, 'utf8', function (err) {
//             if (err) throw err;
//             console.log('Json file successed complete');
//             browser.close()
//         })


    }
}

module.exports = scraperObject
