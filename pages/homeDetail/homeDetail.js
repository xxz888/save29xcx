//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    scrollHeight: 0,
    userInfo: {},
    dataArray:[],
    inputText:"",
    //上个界面传过来的id值
    startdic:{},
    page:1
  },

  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  //跳转回答界面
  clickPost:function(){
    wx.navigateTo({
      url: '../Post/post?question_id=' + this.data.startdic.id + '&type=2'
    })
  },
  zanAction:function(){
    wx.showToast({
      title: '操作成功',
      icon: 'success',
      duration: 2000
    })

  },
  onLoad: function (options) {
    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHeight: scrollHeight
    })


    var self = this;
    //上个界面传过来的字典
    this.setData({
      startdic: JSON.parse(options.startdic)
    })


    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      self.setData({
        userInfo:userInfo
      })
    })

  
  },

  onShow:function(){
    //拿到questionid后请求所有回答接口
    this.getVCData(this.data.page);
  },
  upper: function () {
    this.data.page = 1;
    wx.showNavigationBarLoading()
    this.getVCData(this.data.page);
    setTimeout(
      function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }, 1000);
  },
  lower: function (e) {
    this.data.page += 1;
    wx.showNavigationBarLoading();
    var self = this;
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      self.getVCData(self.data.page);
    },
      1000);
  },
  getVCData: function (page) {
    var par = 'users/answer?question_id=' + this.data.startdic.id + '&page=' + page;
    util.SEND(par, "GET", null, res => {
      if (res.data.length == 0) {
        wx.showToast({
          title: '已经加载所有',
          icon: 'none',
          duration: 1000
        })
      }
      if (page == 1) {
        this.setData({
          dataArray: res["data"],
        });
      } else {
        this.setData({
          dataArray: this.data.dataArray.concat(res["data"]),
        });
      }

    }, res => {
      console.log(res);
    })
  },
  tapName: function(event){
    console.log(event)
  },
  //收藏这一个问题
  collectAction:function(){
    var self = this;
    var par = 'users/question_collect?question_id=' + this.data.startdic.id;
    util.SEND(par, "GET", null, res => {
        if(res.data.status == 1){
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1000
          })

          var newstartdic = self.data.startdic;
          newstartdic.is_collect = !self.data.startdic.is_collect;


          self.setData({
            startdic: newstartdic,
          });
          
        }else{

        }
    })
  },
  //点赞这个回答
  praiseAction: function (event){
    var self = this;
    var answerid = event.currentTarget.dataset.answerid;
    var par = 'users/answer_praise?answer_id=' + answerid;
    util.SEND(par, "GET", null, res => {
      if (res.data.status == 1) {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 1000
        })
        //拿到questionid后请求所有回答接口
        self.getVCData(self.data.page);
      } else {

      }
    })
  }
})
