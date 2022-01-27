var request = require('request');
var fs = require('fs');
const txUrl = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5';
const loveUrl = 'https://chp.shadiao.app/api.php';
const englishUrl = 'https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=10&is_need_mean=2&word=';
const dataPath = './data/'
const cloudUrl = "http://api.interpreter.caiyunai.com/v1/translator";
const cloudToken = "hlgg9mzpucpmih3p3795";

/*
 request('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5', function (err, response, body) {
   if (!err && response.statusCode == 200) {
     //todoJSON.parse(body)
     var res = JSON.parse(body);
   }
 })
*/

var getData = function (reqUrl) {
  return new Promise((resolve, reject) => {
    request(reqUrl, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        //todoJSON.parse(body)
        resolve(body);
      } else if (err) {
        reject(err);
      }
    })
  })
}

var postData = function (reqUrl, body, headers) {
  return new Promise((resolve, reject) => {
    request({
      url: reqUrl,
      method: "POST",
      json: true,
      headers: headers,
      body: body
    }, (err, response, body) => {
      if (!err) {
        //todoJSON.parse(body)
        resolve(body);
      } else if (err) {
        reject(err);
      }
    })
  })
}

var writeData = async function () {
  let body = await getData(txUrl);
  let data = JSON.parse(JSON.parse(body).data);
  fs.writeFileSync(dataPath + 'getOnslnfo.json', body);
  fs.writeFileSync(dataPath + 'Onslnfo.json', JSON.stringify(data));
  let chinaData = {
    lastUpdateTime: data.lastUpdateTime,
    localConfirm: data.chinaTotal.localConfirm,//本土现有确诊人数
    todayConfirm: data.chinaAdd.confirm,//今日新增
    guangdongConfirm: data.areaTree[0].children[8].total.nowConfirm,//广东现有
    guangdongTodayConfirm: data.areaTree[0].children[8].today.confirm,//广东新增
    guangzhouConfirm: data.areaTree[0].children[8].children[6].total.nowConfirm,
    guangzhouTodayConfirm: data.areaTree[0].children[8].children[6].today.confirm
  };
  fs.writeFileSync(dataPath + 'chinaData.json', JSON.stringify(chinaData));
}
var loveData = async function () {
  let body = await getData(loveUrl);
  return body;
}


var englishData = async function (word) {
  let body = await getData(englishUrl + word);
  let englishBody = JSON.parse(body);
  return englishBody.message[0].paraphrase;
}


var cloudData=async function(source,mode){
  let to2="zh2en";
  switch(mode){
    case "中译英": to2 ="zh2en";break;
    case "英译中": to2 ="en2zh";break;
    case "日译中": to2 = "ja2zh"; break;
    case "中译日": to2 = "zh2ja"; break;
  }
  let body = {
    "source":source,
    "trans_type": to2,
    "request_id": "demo",
  }
  let headers = {
    "content-type": "application/json",
    'x-authorization': "token " + cloudToken
  }
  let ret = await postData(cloudUrl, body, headers);
  return ret.target;
}


exports.englishData = englishData;
exports.loveData = loveData;
exports.writeData = writeData;
exports.cloudData=cloudData;