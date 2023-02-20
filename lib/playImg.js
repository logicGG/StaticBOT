const { segment } = require("oicq")

let playImg = async function (data) {
    let imgMode = data.raw_message[0].replace(/顶/, 'play').replace(/吸/, 'suck').replace(/捣/, 'pound').replace(/摸/, 'petpet').replace(/拍/, 'pat')
    let QQnumber = data.message[1].qq
    data.reply(segment.image('https://api.iculture.cc/api/face_' + imgMode + '/?QQ=' + QQnumber))
}

module.exports = { playImg }

