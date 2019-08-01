//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    page:1
  },
  bindQueTap: function(event) {
    var startid = event.currentTarget.dataset.startid;
    wx.navigateTo({
      url: '../homeDetail/homeDetail?id=' + startid
    })
  },
  onLoad: function () {
    this.getVCData(this.data.page);
  },
  getVCData:function(page){
    console.log(page);
    var par = 'users/post/?type=-1&page=' + page;
    util.SEND(par, "GET", null, res => {
      if(res.data.length == 0){
        wx.showToast({
          title: '已经加载所有',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      if(page == 1){
        this.setData({
          feed: res["data"],
          feed_length: res["data"].length
        });
      }else{
        this.setData({
          feed: this.data.feed.concat(res["data"]),
          feed_length: res["data"].length
        });
        wx.showToast({
          title: '加载成功',
          icon: 'success',
          duration: 1000
        })
      }
  
    }, res => {
      console.log(res);
    })
  },
  upper: function () {
    this.data.page = 1;
    wx.showNavigationBarLoading()
    this.getVCData(this.data.page);
    setTimeout(
      function(){
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


})
