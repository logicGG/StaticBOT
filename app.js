const login =require("./login")
const bot =login.login()
const {listeners}=require('./listeners')
listeners(bot)
