// npm i --save-dev request casual moment
var request = require('request');
var casual = require('casual').ja_JP;
var moment = require('moment');
var options = {
  // uri: "http://localhost:3000/api/v1/cm_mdmms/20967357/6",
  uri: "http://localhost:8340/api/v1/cm_mdmms",
  method: 'POST',
  headers: {
    //"Content-type": "application/x-www-form-urlencoded",
    "Content-type": "application/json",
  },
  form: {
  "md_idmdmm": "",
  // "md_cdcstm": casual.integer(from = 20900001, to = 20999999) ,
  "md_cdcstm": casual.random_element(['24242424','23232323']),
  "md_nommrb": casual.integer(from = 1, to = 9),
  "md_nmmmbr": casual.random_element(['問い合わせ', '要望', 'その他メモ']) ,
  "md_txmdmm": casual.random_element(['セミナーメモ', '大会メモ', '物販メモ']) ,
  "md_fganch": casual.integer(from = 1, to = 9),
  "md_clmdmm": casual.random_element(['Red', 'Blue', 'Green']) ,
  "md_ccdate": moment().format("YYYY-MM-DD"),
  "md_ccadip": "127.0.0.1",
  "md_ccmodu": "post-test",
  //"createdAt": 2019-04-24,
  //"createdAt": casual.date(format = 'YYYY-MM-DD'),
  "createdAt": moment().format("YYYY-MM-DD"),
  "updatedAt": moment().format("YYYY-MM-DD")
  //"updatedAt": ""
  }
};


request.post(options, function(error, response, body){console.log(body)});
