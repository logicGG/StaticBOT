const events = require("events")
//方法库
const { repeat } = require("./lib/repeater")
const { simpleFunc } = require("./lib/simpleFunc")
const { translate } = require("./lib/getFunc")
const { playImg } = require("./lib/playImg")
const { cloudTranslate } = require("./lib/cloudTranslate")
const { serendipity } = require("./lib/serendipity")

let someOneMsg = new events.EventEmitter()

let listeners = function (bot) {
    bot.once("system.online", () => console.log("bot online!"))
    bot.on("message", async data => {
        repeat(data)//复读功能
        someOneMsg.emit(data.user_id, data)
        try {
            simpleFunc[data.raw_message](data, bot, someOneMsg)
        } catch { }

        //正则匹配库
        if (data.raw_message.search(/翻译 /) == 0) {
            translate(data, data.raw_message.split(" ", 2)[1])
        }
        if (data.raw_message.search(/[顶吸捣摸拍]/) == 0) {
            playImg(data)
        }
        if (["中译英", "英译中", "日译中", "中译日"].some(item => item == data.raw_message)) {
            cloudTranslate(data, someOneMsg)
        }
        if (data.raw_message.search(/测情缘/) == 0) {
            serendipity(data)
        }
    })
    bot.on('notice.group.poke', async data => {
        if (data.operator_id != bot.uin) {
            setTimeout(() => {
                { bot.sendGroupPoke(data.group_id, data.operator_id) }
            }, Math.random() * 10000)
        }
    })
}
//捕获其他异常
process.on('unhandledRejection', _error => {
})


module.exports = { listeners }