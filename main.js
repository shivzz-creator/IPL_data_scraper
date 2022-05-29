const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595'

const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const allMatchObj = require('./AllMatch')

let iplPath = path.join(__dirname, "IPL")

function dirCreator(filepath) {
    if (fs.existsSync(filepath) == false) {
        fs.mkdirSync(filepath)
    }
}

dirCreator(iplPath)

request(url, cb)

function cb(error, response, html) {
    if (error) {
        console.log(error)
    }
    else {
        extract(html)
    }
}

function extract(html) {
    let $ = cheerio.load(html)
    let linkattr = $('[class="ds-py-3 ds-px-4"] [class="ds-inline-flex ds-items-center ds-leading-none"] a')
    let link = linkattr.attr('href')

    let fulllink = 'https://www.espncricinfo.com' + link


    allMatchObj.getAllMatch(fulllink)
}
