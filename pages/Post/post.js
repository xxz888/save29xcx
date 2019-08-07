// pages/Post/post.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //类型
    array: ['History', 'Tourism', 'Scenery', 'The humanities','The popular science'],
    //默认选择
    index: 0,

    photo1: app.globalData.host + "添加图片.png",
    photo2: app.globalData.host + "添加图片.png",
    photo3: app.globalData.host + "添加图片.png",
    details:"",
    tempFilePaths:[],
    textareaValue:"",
    type:"",//q提问 a回答
    question_id:"", //如果是回答的话，要把问题的id传过来
  },
  //选择器选择方法
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
  //输入内容即时改变
  bindinput: function (e) {
    this.setData({
      textareaValue: e.detail.value
    });
  },
  //提交的方法
  submitAction(){
    var self = this;

//判断是否为空
    if(this.data.textareaValue == ""){
      wx.showToast({
        title: this.data.type == "q" ? 'Post my questions' : 'Write dowm your thoughts...',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    var parDic = {};
    var url = "";

    if(this.data.type == "q"){
      parDic = {
        details: this.data.textareaValue,
        type: parseInt(this.data.index) + 1
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

//这一步是判断是否传有图片
      if(self.data.tempFilePaths.length > 0){
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
            self.jumpWorkVC();
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
    var testUrl = app.globalData.hosturl +  "users/picture/";
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
            duration: 1000
          })
          setTimeout(
            function () {
              self.jumpWorkVC();
            }, 2000);
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
      question_id: options.question_id,
    })
  },

  jumpWorkVC: function (){ 

if(this.data.type == "q"){
  wx.navigateTo({
    url: '../samehome/samehome?question_type=' + (parseInt(this.data.index) + 1) + '&qa=' +         this.data.type
  })
}else{
  wx.navigateBack({
    delta: 1,
  })
}

  }
})