var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')



//封装请求组件
function SEND(path, method, data, success, fail) {
  var par = this.getUserInfo();
  var headerDic = {'content-type': 'application/json'};
  if(par.token){
    headerDic.Authorization = "JWT " + par.token;
  }
  var testUrl   =   "http://192.168.101.22:8001/";
  var formalUrl =   "http://thegdlife.com:8001/";
  wx.request({
    url: testUrl + path,
    header: headerDic,
    method: method,
    data: data,
    success(res) {
      success(res);
    },
    fail(res) {
      fail(res);
    }
  });
}
//根据登录状态，做的登录操作
function wxlogin(){
  if(this.getUserInfo){
    wx.navigateTo({
      url: '../login/login'
    })
  }
}
//获取登录状态
function getUserInfo() {
  var status = wx.getStorageSync("userInfo");
  return status;
}















function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function getScale() {
  wx.getSystemInfo({
    success: function (res) {
      console.log(res.windowHeight)
      let windowHeight = (res.windowHeight * (750 / res.windowWidth));
      console.log(windowHeight)
    }
  })
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
};


function getData2() {
  return index.index;
}

function getNext() {
  return index_next.next;
}

function getDiscovery() {
  return discovery.discovery;
}

function discoveryNext() {
  return discovery_next.next;
}
function getData(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}
module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.SEND = SEND;
module.exports.wxlogin = wxlogin;
module.exports.getUserInfo = getUserInfo;



