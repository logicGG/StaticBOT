const { createClient } = require("oicq")
const fs=require("fs")
const userInfo =JSON.parse(fs.readFileSync("./config.json"))
const bot = createClient(userInfo.uin)

function login() {
    bot.on("system.login.slider", function () {
        console.log("输入ticket:")
        process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
    }).login(userInfo.password ? userInfo.password : null)
    bot.on("system.login.qrcode", function (e) {
  //扫码后按回车登录
  process.stdin.once("data", () => {
    this.login()
  })
})
    return bot
}
module.exports={login}