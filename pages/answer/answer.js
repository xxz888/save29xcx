//discovery.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    navTab: ["推荐", "圆桌", "热门", "收藏", "热门", "收藏"],
    currentNavtab: "0",
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0,
    numForm: {
      sum_history: 0,
      sum_tourism: 0,
      sum_scenery: 0,
      sum_humanities: 0,
      sum_popular: 0
    },
    searchImg: app.globalData.host + "搜索.png",
    feijiImg: app.globalData.host + "评论1@2x.png",
    miaozhunImg: app.globalData.host + "锁定@2x.png"
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
    this.getVCData();
  },
  //事件处理函数
  bindItemTap: function (e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../samehome/samehome?question_type=' + type + '&qa=a'
    })
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  bindQueTap: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var feed = util.getDiscovery();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    var next = util.discoveryNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  },
  getVCData: function (page) {
    var par = 'users/sum/';
    util.SEND(par, "GET", null, res => {
      this.setData({
        numForm: res.data
      })
    })
  },

});
