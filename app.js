const { createClient } = require("oicq");
const events = require("events");
var someOneMsg = new events.EventEmitter();
var calculator = require("calculator");
const messagefunction = require("./messagefunction");
const { englishData } = require("./getData");

const uin = "your QQ";
const bot = createClient(uin);

var memoary='';
var count=0;

bot.once("system.online", () => console.log("bot online!"));
bot.on("message", (data) => {
    if(data.raw_message==memoary){
        count=count+1;
        if(count==2){
            if (data.group_id > 0) {
                bot.sendGroupMsg(data.group_id,data.raw_message);
            }
            else {
                bot.sendPrivateMsg(data.user_id,data.raw_message);
            }
        }
    }else{
        count=0;
    }
    memoary=data.raw_message;
    someOneMsg.emit(data.user_id, data, bot);
    try {
        messagefunction[data.raw_message](data, bot, someOneMsg);
    } catch { }
})
bot.on("message", async (data) => {
    try {
        if (data.raw_message.match(/涩图/) != null || data.raw_message.match(/瑟图/) != null) {
            let img = {
                "type": "image",
                "data": {
                    "file": "./data/ing1.jpg"
                }
            }
            console.log(data);
            if (data.group_id > 0) {
                bot.sendGroupMsg(data.group_id, img);
            }
            else {
                bot.sendPrivateMsg(data.user_id, img);
            }
        }
    } catch { }

    try {
        if (data.raw_message.match(/翻译/).index == 0 && data.raw_message.match(/ /).index == 2) {
            try {
                let word = data.raw_message.split(" ", 2);
                if (word[1] != null) {
                    let text = await englishData(word[1]);
                    if (data.group_id > 0) {
                        bot.sendGroupMsg(data.group_id, text);
                    }
                    else {
                        bot.sendPrivateMsg(data.user_id, text);
                    }
                }
            } catch(e) {
                if (data.group_id > 0) {
                    bot.sendGroupMsg(data.group_id, e);
                }
                else {
                    bot.sendPrivateMsg(data.user_id, e);
                }
            }
        }
    } catch { }

    try {
        if (data.raw_message.match(/计算/).index == 0 && data.raw_message.match(/ /).index == 2) {
            try {
                    let num = data.raw_message.substr(3);
                    let text = calculator.func('f(x) =' + num.replace(/&amp;/, "&").replace(/while/,"").replace(/for/,""));
                    if (data.group_id > 0) {
                        bot.sendGroupMsg(data.group_id, "计算结果: " + text(1));
                    }
                    else {
                        bot.sendPrivateMsg(data.user_id, "计算结果: " + text(1));
                    }
            } catch(e) {
                if (data.group_id > 0) {
                    //var text = JSON.stringify(e)
                    bot.sendGroupMsg(data.group_id, e);
                }
                else {
                    bot.sendPrivateMsg(data.user_id,e);
                }
            }
        }
    } catch { }

})

bot.login('yourPassword');