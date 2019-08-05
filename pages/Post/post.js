// pages/Post/post.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderImg: "../../images/tabbar/添加图片.png",
    photo1: "../../images/添加图片.png",
    photo2: "../../images/添加图片.png",
    photo3: "../../images/添加图片.png",
    details:"",
    tempFilePaths:[],
    textareaValue:"",
    type:"",//q提问 a回答
    question_id:"" //如果是回答的话，要把问题的id传过来
  },
  gotoShow: function(event) {
    var self = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        self.setData({
          tempFilePaths: self.data.tempFilePaths.concat(res.tempFilePaths)
        })
        var index = event.currentTarget.dataset.index;
        if (index == 1) {
          self.setData({
            photo1: res.tempFilePaths
          })
        } else if (index == 2) {
          self.setData({
            photo2: res.tempFilePaths
          })
        } else {
          self.setData({
            photo3: res.tempFilePaths
          })
        }
      }
    })
  },

  bindinput: function (e) {
    this.setData({
      textareaValue: e.detail.value
    });
  },
  //提交的方法
  submitAction(){
    var self = this;


    var parDic = {};
    var url = "";

    if(this.data.type == "q"){
      parDic = {
        details: this.data.textareaValue,
        type: "1"
      }
      url = 'users/question/';
    }else{
      parDic = {
        details: this.data.textareaValue,
        question_id: this.data.question_id
      }
      url = 'users/answer/'
    }
    
    util.SEND(url, "POST", parDic, res => {

      var successUp = 0; //成功
      var failUp = 0; //失败
      var length = self.data.tempFilePaths.length; //总数
      var count = 0; //第几张

      if(self.data.tempFilePaths > 0){
        var xxzid = self.data.type == "q" ? res.data.question_id : res.data.answer_id;
        self.uploadOneByOne(self.data.tempFilePaths, successUp, failUp, count, length, xxzid);
      }else{
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 1000
        })

        setTimeout(
          function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000);
       
      }
  

    })
  },

  /**
  * 采用递归的方式上传多张
  */
  uploadOneByOne(imgPaths, successUp, failUp, count, length, xxzid) {
    var par = util.getUserInfo();
    var that = this;
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })
    var testUrl = "http://192.168.101.22:8001/users/picture/";
    var self = this;

    wx.uploadFile({
      url: testUrl, //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: "file",//示例，使用顺序给文件命名
      header: {
        'content-type': 'application/json',
        'Authorization': "JWT " + par.token
      },
      formData: {
        'type': self.data.type == "q" ? "1" : "2",
        "foreign_key": xxzid,
      },
      method: 'POST',
      success: function (e) {
        successUp++;//成功+1
      },
      fail: function (e) {
        failUp++;//失败+1
      },
      complete: function (e) {
        count++;//下一张
        if (count == length) {
          //上传完毕，作一下提示
          console.log('上传成功' + successUp + ',' + '失败' + failUp);
          wx.showToast({
            title: '上传成功' + successUp,
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1,
            duration: 2000
          })
        } else {
          //递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length, xxzid);
          console.log('正在上传第' + count + '张');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //判断是回答界面进来的还是提问界面进来的
    this.setData({
      type: options.type,
      question_id: options.question_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   

   sdfs
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})