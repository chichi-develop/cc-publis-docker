// npm i --save-dev request casual moment
var request = require('request')
var casual = require('casual').ja_JP
var moment = require('moment')
var options = {
  // uri: "http://localhost:3000/api/v1/cm_mdmms/20967357/6",
  uri: 'http://localhost:8082/ccdb/csmm',
  method: 'PUT',
  headers: {
    //"Content-type": "application/x-www-form-urlencoded",
    'Content-type': 'application/json'
  },
  form: {
    CM_CDCSTM: '20191108',
    CM_RBCSMM: '1',
    CM_NMCMBR: 'メモ',
    CM_TXCSMM: '顧客マスタメモのテスト',
    CM_DTTUTI: ' ',
    CM_CCDATEC: '20080130',
    CM_CCTIMEC: '144029',
    CM_CCTERMC: 'CT_CCTERMC',
    CM_CCOUSRC: 'IKOU',
    CM_CCUSERC: 'IKOU',
    CM_CCFUNCC: 'CT_CCFUNCC',
    CM_CCDATEX: '20180612',
    CM_CCTIMEX: '172143',
    CM_CCTERMX: 'LM-IH533S-SH-18',
    CM_CCOUSRX: 'taro',
    CM_CCUSERX: 'CCUSER',
    CM_CCFUNCX: 'WA'
    // al_idactv: '',
    // al_nmactv: casual.random_element(['大会', '一般注文', 'セミナー']),
    // al_noactv: casual.integer((from = 1111), (to = 9999999)),
    // al_dtactv: moment().format('YYYY-MM-DD'),
    // al_cdsqsk: casual.random_element(['23232323', '21212121']),
    // // "al_cdsqsk": casual.integer(from = 20900001, to = 20999999) ,
    // al_nmsqsk: casual.random_element(['株式会社　致知出版社']),
    // al_nmsqbu: '',
    // // "al_nmsqtn": casual.full_name,
    // al_nmsqtn: casual.random_element(['毛利　竹志']),
    // al_txactv: casual.random_element([
    //   '新春大会',
    //   '別刊「母」',
    //   '一日セミナー'
    // ]),
    // al_susury: casual.integer((from = 1), (to = 10)),
    // al_kgtnka: casual.random_element([1200, 5000, 12000]),
    // al_kggoke: casual.random_element([1200, 5000, 12000]),
    // al_txbiko: '',
    // al_cdcstm: casual.integer((from = 20900001), (to = 20999999)),
    // al_nmcstm: casual.full_name,
    // al_nmtnbu: '',
    // al_nmtnto: '',
    // createdAt: moment().format('YYYY-MM-DD'),
    // updatedAt: moment().format('YYYY-MM-DD')
  }
}

request.put(options, function(error, response, body) {
  console.log(body)
})
