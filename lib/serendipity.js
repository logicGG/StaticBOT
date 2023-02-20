const md5=require('md5')
const { segment } = require("oicq")

let form={
    0:0,
    1:2.7,
    2:5.5,
    3:8.3,
    4:11.1,
    5:13.8,
    6:16.6,
    7:19.4,
    8:22.2,
    9:24.9,
    a:27.7,
    b:30.5,
    c:33.3,
    d:36.1,
    e:38.8,
    f:41.6,
    g:44.4,
    h:47.2,
    i:49.9,
    j:52.7,
    k:55.5,
    l:58.3,
    m:61.1,
    n:63.8,
    o:66.7,
    p:69.4,
    q:72.2,
    r:74.9,
    s:77.8,
    t:80.6,
    u:83.3,
    v:86.1,
    w:88.9,
    x:91.7,
    y:94.4,
    z:97.2
}

let serendipity=function(data){
    let code = md5((data.user_id * 1) + (data.message[1].qq*1))
    let grade=0
    for(let i=0;i<code.length;i++){
        let temp=code[i]
        grade+=form[temp]
    }
    grade = grade%100
    let text=[
        "你与",
        segment.at(data.message[1].qq),
        "\n情缘分为:"+grade.toFixed(1)+"/100\n(仅供娱乐)"
    ]
    data.reply(text)
}

module.exports={serendipity}
