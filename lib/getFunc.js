const axios = require('axios').default
const translateUrl = 'https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=10&is_need_mean=2&word='
const sentenceUrl = 'https://api.iculture.cc/api/yiyan'
const historyUrl = 'https://api.iculture.cc/api/lishi/'

let translate = function (data, word) {
    axios.get(translateUrl + word)
        .then(res => {
            data.reply(res.data.message[0].paraphrase)
        }).catch(e => {
            data.reply(e)
        })
}
let sentence = function (data) {
    axios.get(sentenceUrl)
        .then(res => {
            data.reply(res.data)
        }).catch(e => {
            data.reply(e)
        })
}
let history = function (data) {
    axios.get(historyUrl)
        .then(res => {
            data.reply(res.data)
        }).catch(e => {
            data.reply(e)
        })
}


module.exports = { translate, sentence, history }