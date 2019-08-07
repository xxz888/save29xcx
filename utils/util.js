var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')
var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var app = getApp()



//封装请求组件
function SEND(path, method, data, success, fail) {
  var par = this.getUserInfo();
  var headerDic = {'content-type': 'application/json'};
  if(par.token){
    headerDic.Authorization = "JWT " + par.token;
  }
  wx.request({
    url: app.globalData.hosturl + path,
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






//base64 编码
function _btoa(s) {
  if (/([^\u0000-\u00ff])/.test(s)) {
    throw new Error('INVALID_CHARACTER_ERR');
  }
  var i = 0,
    prev,
    ascii,
    mod,
    result = [];

  while (i < s.length) {
    ascii = s.charCodeAt(i);
    mod = i % 3;

    switch (mod) {
      // 第一個6位只需要讓8位二進制右移兩位
      case 0:
        result.push(base64hash.charAt(ascii >> 2));
        break;
      //第二個6位 = 第一個8位的後兩位 + 第二個8位的前4位
      case 1:
        result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
        break;
      //第三個6位 = 第二個8位的後4位 + 第三個8位的前2位
      //第4個6位 = 第三個8位的後6位
      case 2:
        result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
        result.push(base64hash.charAt(ascii & 0x3f));
        break;
    }

    prev = ascii;
    i++;
  }

  // 循環結束後看mod, 為0 證明需補3個6位，第一個為最後一個8位的最後兩位後面補4個0。另外兩個6位對應的是異常的“=”；
  // mod為1，證明還需補兩個6位，一個是最後一個8位的後4位補兩個0，另一個對應異常的“=”
  if (mod == 0) {
    result.push(base64hash.charAt((prev & 3) << 4));
    result.push('==');
  } else if (mod == 1) {
    result.push(base64hash.charAt((prev & 0x0f) << 2));
    result.push('=');
  }

  return result.join('');
}
//解码 成 ASCII
function _atob(s) {
  s = s.replace(/\s|=/g, '');
  var cur,
    prev,
    mod,
    i = 0,
    result = [];

  while (i < s.length) {
    cur = base64hash.indexOf(s.charAt(i));
    mod = i % 4;

    switch (mod) {
      case 0:
        //TODO
        break;
      case 1:
        result.push(String.fromCharCode(prev << 2 | cur >> 4));
        break;
      case 2:
        result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
        break;
      case 3:
        result.push(String.fromCharCode((prev & 3) << 6 | cur));
        break;

    }

    prev = cur;
    i++;
  }

  return result.join('');
}

module.exports = {
  btoa: _btoa,
  atob: _atob,
} 




module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.SEND = SEND;
module.exports.wxlogin = wxlogin;
module.exports.getUserInfo = getUserInfo;



