// pages/teachers/details.js
import { getTeacherDetail, followerTeacher } from '../../../api/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    teacher_id:'',
    like: 8,
    applys: 10,
    reward: 200,
    school: '北京大学',
    score: 588,
    educational_background: '博士',
    profession: '数学',
    infos:'',
    customerIsFollower:{
      customer_is_follower: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teacher_id: options.id
    })

    this.getStuDetail(this.data.teacher_id);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    return { 
      title: '教师信息', 
      desc: '喵喵教育--教师信息', 
      imageUrl: '../../images/wxapp.png',
      path: '/pages/teachers/details/index?id=' + this.data.teacher_id,
      data: this.data
    }
  },
  sendSys: function(){
    this.onShareAppMessage
  },
  getQueryString: function (id) {  
    var r = window.location;
    console.log(r);
    // this.setData({
    //   teacher_id: id
    // })
  },
  sendApply: function(){
    wx.showModal({
      title: '您尚未注册',
      content: '请先注册后，才能更快的选择老师哦',
      showCancel: true,
      confirmText:'立即注册',
      confirmColor: '#FF4D61',
      success: function(){
        console.log(888);
        wx.navigateTo({
          url: '../../login/login'//实际路径要写全
        })
      }

    })
  },
  applyComplain(){
    wx.navigateTo({
      url: '../../complain/complain?type='//实际路径要写全
    })
  },
  getStuDetail: function (id) {
    var reqData = {
      id: id
    }
    getTeacherDetail(reqData).then((res) => {
      console.log('教师详情', res);
      this.setData({
        infos: res,
        customerIsFollower: {
          customer_is_follower: res.customer_is_follower
        }
      })
    })
  },
  //收藏
  followerUser: function () {
    var reqData = {
      teacher: this.data.teacher_id
    }
    followerTeacher(reqData).then((res) => {
      if (res.status == 0 || res.status == 1) {
        this.setData({
          customerIsFollower: true
        })
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
      
    })

  }

  
})