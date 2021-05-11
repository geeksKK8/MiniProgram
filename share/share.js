// share/share.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    eye:true,
    userInfo:null,
    hasUserInfo:false,
    openid: null, 
    pid:0,
    projInfo: null,
    inviter:null
  },
  // options: {
  //   addGlobalClass: true,
  // },
  bind_joinProj:function(options){
    //待添加 判断是否已加入
    const db = wx.cloud.database();
    db.collection('member').add({
      data:{
        id: this.data.openid,
        url: this.data.userInfo.avatarUrl,
        name:this.data.userInfo.nickName,
        pid: this.data.pid,
        own: 0
      },
      success: function(res){
        console.log(res)
        // if(res.data == 'Already in'){
        //   wx.showToast({
        //     title: '已经加入！',
        //   })
        // }else{
        //   wx.showToast({
        //     title: '加入成功！',
        //   })
        // };
      },
      fail: function(res){
        console.log("请求join proj的request 失败！")
      }
    })

    // wx.request({
    //   url: 'https://wychandsome12138.xyz/api/post/join_proj',
    //   method: "POST",
    //   data:{
    //     "id": this.data.openid,
    //     "url": this.data.userInfo.avatarUrl,
    //     "name":this.data.userInfo.nickName,
    //     "pid": this.data.pid,
    //   },
    //   success: function(res){
    //     console.log(res)
    //     if(res.data == 'Already in'){
    //       wx.showToast({
    //         title: '已经加入！',
    //       })
    //     }else{
    //       wx.showToast({
    //         title: '加入成功！',
    //       })
    //     };
    //   },
    //   fail: function(res){
    //     console.log("请求join proj的request 失败！")
    //   }
    // });
    this.refuse();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    
    this.setData({
      pid: options.pid,
      inviter: options.inviter,
    },()=>{
      this.get_proj_info();
    });
    this.getUserInfoFun();
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getProj',
      // 传给云函数的参数
      data: {},
      success: function(res) {
        //console.log(res.result.userInfo.openId)
        _this.setData({
          openid:res.result.userInfo.openId
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfoFun: function (){
    var _this = this;
    wx.getUserInfo({
        success: function (res){
          // console.log(res)　　　　　　　//do anything
          _this.setData({
            userInfo: res.userInfo,
            eye: true
          })
        },
        fail: function(res){
          // _this.showPrePage();
          _this.setData({
            eye: false
          })
        }
      })
  },
  showPrePage:function(){
      console.log("show PrePage");
      this.setData({
        eye:false
      })
  },
  get_proj_info(){
    var _this=this
    wx.cloud.callFunction({
      name: 'get_proj_all',
      data:{
        pid: this.data.pid
      },
      success: res=>{
        console.log('调用云函数成功',res)
        const path = res.result.data.list[0]
        _this.setData({
          projInfo: path
          //projContent: path,
          //percentage: ( (path.done_tasks.length + path.undone_tasks.length) > 0 )?Math.floor(path.done_tasks.length / (path.done_tasks.length + path.undone_tasks.length) * 100).toString() + '\%':'0%',
        }, ()=>{
            //隐藏loading 提示框
            wx.hideLoading();
            //隐藏导航条加载动画
            wx.hideNavigationBarLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
        })
      }      
    })

    // wx.request({
    //   url: 'https://wychandsome12138.xyz/api/get/get_one_proj_all',
    //   method: "POST",
    //   data:{
    //     "pid": _this.data.pid
    //   },
    //   success: function(res){
    //     // console.log(res.data)
    //     console.log("get proj info success")
    //     _this.setData({
    //       projInfo: res.data,
    //     })
    //   },
    //   fail: function(res){
    //     console.log("请求proj 所有数据的request 失败！")
    //   }
    // });
  },
  refuse: function(){
    console.log("refuse inviter")
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})