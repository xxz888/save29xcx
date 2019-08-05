//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    items: []
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  onShareAppMessage: function (ops) {

  },
  onLoad: function () {
    var userInfo = util.getUserInfo();

    var itemsArr = [];
    //这是微信小程序的bug。只能这样写。麻烦一点了
    if (userInfo.gender == 1){
      itemsArr = [
        { name: "Female", value: "Female", checked:true},
        { name: "Mate", value: "Mate"}];
    }else{
      itemsArr = [
        { name: "Female", value: "Female"},
        { name: "Mate", value: "Mate", checked: true }];
    }
    this.setData({
      userInfo: userInfo,
      items: itemsArr
    })
  }
})