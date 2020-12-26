// share/share.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projId:0,
    projContent: null
  },
  options: {
    addGlobalClass: true,
  },
  joinProj:function(){
    // console.log(app.globalData.userinfo)
    wx.request({
      url: 'https://wychandsome12138.xyz/api/post/join_proj',
      method: "POST",
      data:{
        "id":app.globalData.openid,
        "url": app.globalData.userinfo.avatarUrl,
        "name":app.globalData.userinfo.nickname,
        "projid": projId,
      },
      success: function(res){
        console.log(res)
       
        wx.showToast({
          title: '加入成功',
        })
      },
      fail: function(res){
        console.log("请求加入proj的request 失败！")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})