//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    islogin:false
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  loginAction:function(){
    util.wxlogin();
  },
  bindErWeiMa:function(){
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1000
    })
  },
  clickPost: function () {
    wx.navigateTo({
      url: '../Post/post'
    })
  },
  notify: function () {
    wx.navigateTo({
      url: '../chat/chat'
    })
  },
  indexAction: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  talkAction: function () {
    wx.navigateTo({
      url: '../Talk/Talk'
    })
  },
  editorAction:function(){
    wx.navigateTo({
      url: '../person/person'
    })
  },
  bindShare: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '来自SVAE的分享',
      imageUrl: '',//图片地址
      path: '',// 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  },
  onShow:function(){
    var userInfo = util.getUserInfo();
    this.setData({
      islogin: userInfo ? true : false ,
      userInfo: userInfo
    })
  },
  onLoad: function () {}
 
})