//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  bindErWeiMa: function () {
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
  editorAction: function () {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1000
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
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})