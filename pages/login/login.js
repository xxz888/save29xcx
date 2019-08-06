var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //wx.login返回的code，需要传给后台
    code:"",
    open_id:"",
    SAVE29Img: app.globalData.host + "SAVE29.png"
  },
  onLoad: function () {
  },

  //用户点击登录按钮，需要登录
  bindGetUserInfo: function (e) {
    var that = this;
    //调用微信登录接口
    wx.login({
      success(res) {
        that.code = res.code;
        //调用微信获取个人资料
        wx.getUserInfo({
          success: function (res) {
            //缓存登录个人信息
            wx.setStorageSync("userInfo", res.data);
            //从数据库获取用户信息,并且请求登录接口
            that.queryUsreInfo();
          },
          fail: function () {
           //获取个人资料失败,调用的方法   
          }
        })
      },
      fail(fail){
      //wx.login失败,调用的方法
      }
    })
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    var that = this;
    var url = 'users/user?code=' + this.code;
    util.SEND(url, "GET", null, res => {
      //这个说明是老用户，已经注册过
      if(res.data.status == 1){
        //从服务器上拉去用户的基本信息
        //缓存登录状态 1登录 0未登录
        that.loginSuccessFinishAction(res);
      }
      //这个说明是新用户，需要注册
      if(res.data.status == 2){
        //新用户，需要调用注册的后台方法
        that.open_id = res.data.open_id;
        that.registerUserAction();
      }
      //微信调用失败
      if (res.data.status == -1) {

      }
    })
  },
  //注册用户的方法
  registerUserAction: function () {
    var that = this;
    var url = 'users/user/';
    var par = this.getUserInfo();
    par.open_id = that.open_id;
    util.SEND(url, "POST", par, res => {
      that.loginSuccessFinishAction(res);
    })
  },

  //登录成功后跳转首页
  loginSuccessFinishAction:function(res){
    //缓存登录信息
    wx.setStorageSync("userInfo", res.data);
    //用户已经授权过并且请求服务器成功，跳转首界面
    wx.switchTab({
      url: '../home/home'
    })
  }










})



