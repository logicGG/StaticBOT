const axios = require('axios').default
const cloudUrl = "http://api.interpreter.caiyunai.com/v1/translator"
const cloudToken = "hlgg9mzpucpmih3p3795"
let headers = {
    "content-type": "application/json",
    'x-authorization': "token " + cloudToken
}

let cloudTranslate = function (data, someOneMsg) {
    let mode = "zh2en"
    switch (data.raw_message) {
        case "中译英": mode = "zh2en"; break
        case "英译中": mode = "en2zh"; break
        case "日译中": mode = "ja2zh"; break
        case "中译日": mode = "zh2ja"; break
    }
    data.reply("请发送需要" + data.raw_message + "的文本。")
    someOneMsg.once(data.user_id, data => {
        let body = {
            "source": data.raw_message,
            "trans_type": mode,
            "request_id": "demo",
        }
        axios({
            method:'post',
            url:cloudUrl,
            headers,
            data:body
        }).then(res => {
            data.reply(res.data.target)
        }).catch(e => {
            console.log(e)
        })
    })
}

module.exports = { cloudTranslate }