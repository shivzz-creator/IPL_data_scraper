const request = require('request')
const cheerio = require('cheerio')

const scoreObj = require('./scorecard')

function getScoreCards(link) {
    request(link, cb)

    function cb(err, response, html) {
        if (err) {
            console.log(err)
        }
        else {
            getScoreCardsHtml(html)
        }
    }
    function getScoreCardsHtml(html) {
        let $ = cheerio.load(html)
        let scoreCards = $('[class="ds-flex ds-mx-4 ds-pt-2 ds-pb-3 ds-space-x-4 ds-border-t ds-border-line-default-translucent"] span:nth-child(3)>a')
        for (let i = 0; i < scoreCards.length; i++) {
            let scoreCardLink = $(scoreCards[i]).attr('href')
            let fullScoreLink = `https://www.espncricinfo.com${scoreCardLink}`
            //console.log(fullScoreLink)
            scoreObj.ps(fullScoreLink)
        }
    }
}

module.exports ={
    getAllMatch : getScoreCards
}
