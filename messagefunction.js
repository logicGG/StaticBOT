const fs = require('fs');
const md5 = require('md5');
const newData = require('./getData');
var food = ["馄饨", "拉面", "热干面", "炒面", "重庆小面", "酸辣粉", "麻辣烫", "炒饭", "盖浇饭", "KFC", "麦当当",
    "麻辣香锅", "猪脚饭", "沙县小吃", "火锅", "炸鸡", "三明治", "饺子", "炒粉", "牛肉饭", "牛排", "白粥", "糖水",
    "牛腩饭", "牛杂汤", "汤面", "奶茶", "面包", "海底捞", "烤肉拌饭", "陶陶居", "萨莉亚", "天妇罗", "肠粉", "皮蛋瘦肉粥", "华莱士", "手抓饼", "炸酱面", "热干面", "泡面"]
//var atext = JSON.parse(fs.readFileSync('./data/text.json'));

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
function randomfood() {
    let x = randomNum(0, food.length - 1);
    return food[x];
}
var messagefunction = {
    疫情查询: (data, bot) => {
        newData.writeData().then(() => {
            fs.readFile('./data/chinaData.json', (err, adata) => {
                if (err) {
                    if (data.group_id > 0) {
                        bot.sendGroupMsg(data.group_id, err);
                    }
                    else {
                        bot.sendPrivateMsg(data.user_id, err);
                    }
                    return;
                }
                let chinaData = JSON.parse(adata);

                let text = '本土现有确诊' + chinaData.localConfirm + '人(今日确诊'
                    + chinaData.todayConfirm + '人)，其中广东现有病例'
                    + chinaData.guangdongConfirm + '人(今日确诊'
                    + chinaData.guangdongTodayConfirm + '人)，广州现有病例'
                    + chinaData.guangzhouConfirm + '人(今日确诊' + chinaData.guangzhouTodayConfirm + '人)';

                if (data.group_id > 0) {
                    bot.sendGroupMsg(data.group_id, text);
                }
                else {
                    bot.sendPrivateMsg(data.user_id, text);
                }
            })
        })
    },
    机器人安全下线: (data, bot) => {
        if (data.user_id == '781827926') {
            bot.sendPrivateMsg(data.user_id, 'OK!');
            bot.logout();
        }
    },
    来点骚话: async (data, bot) => {
        let text = await newData.loveData();
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, text);
        }
        else {
            bot.sendPrivateMsg(data.user_id, text);
        }
    },
    中午吃什么: (data, bot) => {
        let text = [{
            "type": "at",
            "data": {
                "qq": data.user_id
            }
        },
        {
            "type": "text",
            "data": {
                "text": " 中午吃" + randomfood()
            }
        }

        ];
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, text);
        }
        else {
            bot.sendPrivateMsg(data.user_id, text);
        }
    },
    晚上吃什么: (data, bot) => {
        let text = [{
            "type": "at",
            "data": {
                "qq": data.user_id
            }
        },
        {
            "type": "text",
            "data": {
                "text": " 晚上吃" + randomfood()
            }
        }

        ];
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, text);
        }
        else {
            bot.sendPrivateMsg(data.user_id, text);
        }
    },
    md5: (data, bot, someOneMsg) => {
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, "请发送需要加密文本。");
        }
        else {
            bot.sendPrivateMsg(data.user_id, " 请发送需要加密文本。");
        }
        someOneMsg.once(data.user_id, (data, bot) => {
            try {
                let text = md5(data.raw_message);
                if (data.group_id > 0) {
                    bot.sendGroupMsg(data.group_id, text);
                }
                else {
                    bot.sendPrivateMsg(data.user_id, text);
                }
            } catch {
                if (data.group_id > 0) {
                    bot.sendGroupMsg(data.group_id, "error");
                }
                else {
                    bot.sendPrivateMsg(data.user_id, "error");
                }
            }
        })
    },
    transLate: function (mode, data, bot, someOneMsg) {
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, "请发送需要" + mode + "的文本。");
        }
        else {
            bot.sendPrivateMsg(data.user_id, "请发送需要" + mode + "的文本。");
        }
        someOneMsg.once(data.user_id, async (data, bot) => {
            try {
                let text = await newData.cloudData(data.raw_message, mode);
                if (data.group_id > 0) {
                    bot.sendGroupMsg(data.group_id, text);
                }
                else {
                    bot.sendPrivateMsg(data.user_id, text);
                }
            } catch {
                if (data.group_id > 0) {
                    bot.sendGroupMsg(data.group_id, "翻译失败");
                }
                else {
                    bot.sendPrivateMsg(data.user_id, "翻译失败");
                }
            }
        })
    },
    中译英: function (data, bot, someOneMsg) {
        this.transLate("中译英", data, bot, someOneMsg);
    },
    英译中: function (data, bot, someOneMsg) {
        this.transLate("英译中", data, bot, someOneMsg);
    },
    中译日: function (data, bot, someOneMsg) {
        this.transLate("中译日", data, bot, someOneMsg);
    },
    日译中: function (data, bot, someOneMsg) {
        this.transLate("日译中", data, bot, someOneMsg);
    },
    最美的诗: function (data, bot) {
        let text = "阳光中鸡鸡摇曳的我，是我年少写过最美的诗。";
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, text);
        }
        else {
            bot.sendPrivateMsg(data.user_id, text);
        }
    },
    忍不住了: function (data, bot) {
        let text = "[CQ:xml,data=<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><msg serviceID=\"1\" templateID=\"-1\" action=\"app\" actionData=\"com.picacomic.fregata\" brief=\" \" sourceMsgId=\"0\" url=\"\" flag=\"2\" adverSign=\"0\" multiMsgFlag=\"0\"><item layout=\"5\" bg=\"2\" advertiser_id=\"0\" aid=\"0\"><title>点击打开你的哔咔</title></item><source name=\"\" icon=\"\" action=\"\" appid=\"-1\" /></msg>,type=1]"
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, text);
        }
        else {
            bot.sendPrivateMsg(data.user_id, text);
        }
    },
    来点色图: function (data, bot) {
        let text = "[CQ:xml,data=<?xml version='1.0' encoding='UTF-8' standalone='yes' ?><msg serviceID=\"146\" templateID=\"1\" action=\"web\" brief=\"&#91;分享&#93; \" sourceMsgId=\"0\" url=\"http://www.ovelya.club/idont.mp4\" flag=\"0\" adverSign=\"0\" multiMsgFlag=\"0\"><item layout=\"2\" advertiser_id=\"0\" aid=\"0\"><picture cover=\"http://ovelya.club/ss.jpg\" w=\"0\" h=\"0\" /><title>色图大全</title><summary>http://www.ovelya.club/idont.mp4</summary></item><source name=\"章鱼私藏\" icon=\"https://url.cn/PWkhNu\" url=\"https://url.cn/UQoBHn\" action=\"app\" a_actionData=\"com.tencent.mtt://http://www.ovelya.club/idont.mp4\" i_actionData=\"tencent100446242://http://Www.ovelya.club/idont.mp4\" appid=\"-1\" /></msg>,type=146]"
        if (data.group_id > 0) {
            bot.sendGroupMsg(data.group_id, text);
        }
        else {
            bot.sendPrivateMsg(data.user_id, text);
        }
    },
    屑瑞奇: function (data, bot) {
        if (data.user_id == 760499451) {
            let text = "好狮子";
            if (data.group_id > 0) {
                bot.sendGroupMsg(data.group_id, text);
            }
            else {
                bot.sendPrivateMsg(data.user_id, text);
            }
        }
    }
}

module.exports = messagefunction;