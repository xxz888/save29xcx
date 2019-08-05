//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    page: 1,
    bindinputValue: "",
    type_:"", //type
    whereCome:0// 0代表我的界面 1代表问题和回答 
  },

  //搜索按钮
  bindinput: function (e) {
    this.setData({
      bindinputValue: e.detail.value
    });
    this.requestBindInputChange(this.data.bindinputValue);
  },
  //监听输入的内容。并且做请求
  requestBindInputChange: function (key) {
    var par = 'users/search?key=' + key + '&page=1';
    util.SEND(par, "GET", null, res => {
      if (res.data.length == 0) {
        wx.showToast({
          title: '已经加载所有',
          icon: 'none',
          duration: 1000
        })
      }
      this.setData({
        feed: res["data"],
        feed_length: res["data"].length
      });

    }, res => {
      console.log(res);
    })
  },
  bindQueTap: function (event) {
    var startdic = event.currentTarget.dataset.startdic;
    let data = JSON.stringify(startdic);
    wx.navigateTo({
      url: '../homeDetail/homeDetail?startdic=' + data
    })
  },
  onLoad: function (options) {
    
    //我的界面，提问回答收藏，进来的 type分别为1 2 3
    if(options.type){

      this.setData({
        type_: options.type,
        whereCome : 0
      })
    }
    
    //question界面进来的，type为
    //（0/所有问题列表,1/history,2/tourism,3/scenery,4/ humanities, 5/ popular）

    if (options.question_type) {
      this.setData({
        type_ : options.question_type,
         whereCome: 1
      })
    }

    this.getVCData(this.data.page);
  },
  getVCData: function (page) {
    var par = "";
    //表示是从我的界面进来
    if (this.data.whereCome == 0){
      par = 'users/question_mine?type_=' + this.data.type_ + '&page=' + page;
    }
    //表示是从问题和回答进来
    if (this.data.whereCome == 1){
      par = 'users/question?type=' + this.data.type_ + '&page=' + page;
    }
      
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
          feed: res["data"],
          feed_length: res["data"].length
        });
      } else {
        this.setData({
          feed: this.data.feed.concat(res["data"]),
          feed_length: res["data"].length
        });
      }

    }, res => {
      console.log(res);
    })
  },
  upper: function () {
    this.setData({
      page: 1
    })
    wx.showNavigationBarLoading()
    this.getVCData(this.data.page);
    setTimeout(
      function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }, 1000);
  },
  lower: function (e) {
    this.setData({
      page: this.data.page++
    })
    wx.showNavigationBarLoading();
    var self = this;
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      self.getVCData(self.data.page);
    },
      1000);
  },


})
