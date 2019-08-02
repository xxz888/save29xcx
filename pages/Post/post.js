// pages/Post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderImg:"../../images/tabbar/添加图片.png",
    photo1: "../../images/添加图片.png",
    photo2: "../../images/添加图片.png",
    photo3: "../../images/添加图片.png",

  },
  gotoShow:function(event){
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: 'http://192.168.101.22:8001/users/test/', 
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'ios'
          },
          success: function (res) {
            var data = res.data
            //do something
            console.log(res);
            self.setData({
              photo1: data
            })
          }
        })
        return;










        var index = event.currentTarget.dataset.index;
        if(index == 1){
          self.setData({
            photo1: res.tempFilePaths
          })
        }else if(index == 2){
          self.setData({
            photo2: res.tempFilePaths
          })        
        }else{
          self.setData({
            photo3: res.tempFilePaths
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   

   sdfs
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})