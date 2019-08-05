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
    var startdic = event.currentTarget.dataset.startdic;
    let data = JSON.stringify(startdic);
    wx.navigateTo({
      url: '../homeDetail/homeDetail?startdic=' + data
    })
  },
  onLoad: function () {
    this.getVCData(this.data.page);
  },
  getVCData:function(page){
    var par = 'users/question?type=0&page=' + page ;
    util.SEND(par, "GET", null, res => {
      if(res.data.length == 0){
        wx.showToast({
          title: '已经加载所有',
          icon: 'none',
          duration: 1000
        })
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
      }
  
    }, res => {
      console.log(res);
    })
  },
  upper: function () {
    this.setData({
      page:1
    })
    wx.showNavigationBarLoading()
    this.getVCData(this.data.page);
    setTimeout(
      function(){
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
