const pageScrapper = require('./pageScraper')

async function scrapeAll(browserInstance){
    let browser
    try {
        browser = await browserInstance
        await pageScrapper.scraper(browser)
    } catch (error) {
        console.log("Could not resolve the browser instance => ",error);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)