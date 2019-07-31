//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    imgArray:['','',''],
    inputText:" I think hangzhou is the most beautiful city.The west lake in hangzhou is beautiful and the people are friendly.Alibaba group is also in hangzhou."
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  clickPost:function(){
    wx.navigateTo({
      url: '../Post/post'
    })
  },
  zanAction:function(){
    wx.showToast({
      title: '操作成功',
      icon: 'success',
      duration: 2000
    })

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  tapName: function(event){
    console.log(event)
  }
})
