//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    SAVE29Img: app.globalData.host + "SAVE29.png",

    bgImg: app.globalData.host + "圆角矩形@2x.png",
    flag: true,
    motto: 'Hello World',
    userInfo: {},
    islogin:false,
    requestImg:"",
    erweimasaveImg: app.globalData.host + "QR@2x.png",
    fenxiangImg: app.globalData.host + "分享@2x.png",
    Img1: app.globalData.host + "发布1@2x.png",
    Img2: app.globalData.host + "评论@2x.png",
    Img3: app.globalData.host + "收藏1@2x.png",
    Img4: app.globalData.host + "关于SAVE29@2x.png",
    Img5: app.globalData.host + "投诉意见@2x.png",
    Img6: app.globalData.host + "联系客服@2x.png",
    Img7: app.globalData.host + "返回键1@2x.png",
    erweimacancle: app.globalData.host + "erweimacancle.png",

  },
  //二维码的界面显示
  show: function () {
    this.setData({ flag: false })
  },
  //二维码的界面消失
  hide: function () {
    this.setData({ flag: true })
  },
  loginAction:function(){
    util.wxlogin();
  },
  bindErWeiMa:function(){
    var self = this;
    var commonUrl = 'https://api.weixin.qq.com/cgi-bin/';
    var url = commonUrl + 'token?grant_type=client_credential&appid=' + 'wxbaa2095ba254a772' + '&secret=' + '0c335623e5eefb9782199dc918f4350f';
    wx.request({
      url: url ,
      success(res) {
        var access_token = res.data.access_token;
        wx.request({
          url:  'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + access_token,
          method: "POST",
          data:{
            "path": "pages/home/home",
            "width": 430
          },
          responseType:"arraybuffer",
          success(res){
            let buffer = res.data;
            self.transformArrayBufferToBase64(buffer);
          }
        })
      }
    })
  },
  transformArrayBufferToBase64: function (buffer){
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    
    this.setData({
      erweimaImg: 'data:image/png;base64,' + util.btoa(binary)
    })
    this.show();
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
  indexPostQuestionAction: function () {
    wx.navigateTo({
      url: '../samehome/samehome?type=1'
    })
  },
  indexAnswerQuestionAction:function(){
    wx.navigateTo({
      url: '../samehome/samehome?type=2'
    })
  },
  indexCollectionAction: function () {
    wx.navigateTo({
      url: '../samehome/samehome?type=3'
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
  // bindShare: function () {
  //   wx.showShareMenu({
  //     withShareTicket: true
  //   })
  // },
  // onShareAppMessage: function (ops) {
  //   if (ops.from === 'button') {
  //     // 来自页面内转发按钮
  //     console.log(ops.target)
  //   }
  //   return {
  //     title: '来自SVAE的分享',
  //     imageUrl: '',//图片地址
  //     path: '',// 用户点击首先进入的当前页面
  //     success: function (res) {
  //       // 转发成功
  //       console.log("转发成功:");
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //       console.log("转发失败:");
  //     }
  //   }
  // },
  onShow:function(){
    var userInfo = util.getUserInfo();
    this.setData({
      islogin: userInfo ? true : false ,
      userInfo: userInfo
    })
  },
  onLoad: function () {}
 
})