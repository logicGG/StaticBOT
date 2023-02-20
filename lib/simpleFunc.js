const { segment } = require("oicq")
const { sentence } = require('./getFunc')
const { history } = require('./getFunc')
const fs = require("fs")
const userInfo = JSON.parse(fs.readFileSync("./config.json"))
let simpleFunc = {
    机器人下线: async (data, bot) => {
        if (userInfo.administrator.some(item => item == data.user_id)) {
            await data.reply('OK!')
            bot.logout()
        }
    },
    吸我: (data) => {
        data.reply(segment.image('https://api.iculture.cc/api/face_suck/?QQ=' + data.user_id))
    },
    顶我: (data) => {
        data.reply(segment.image('https://api.iculture.cc/api/face_play/?QQ=' + data.user_id))
    },
    摸我: (data) => {
        data.reply(segment.image('https://api.iculture.cc/api/face_petpet/?QQ=' + data.user_id))
    },
    拍我: (data) => {
        data.reply(segment.image('https://api.iculture.cc/api/face_pat/?QQ=' + data.user_id))
    },
    捣我: (data) => {
        data.reply(segment.image('https://api.iculture.cc/api/face_pound/?QQ=' + data.user_id))
    },
    最美的诗: (data) => {
        data.reply("阳光中鸡鸡摇曳的我，是我年少写过最美的诗。")
    },
    来点骚话: (data) => {
        sentence(data)
    },
    历史上的今天: (data) => {
        history(data)
    }
}

module.exports = { simpleFunc }