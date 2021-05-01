const app = getApp()
Component({
  lifetimes:{

    ready(){
      try{
        var that=this
        this.setData({
          userInfo:app.globalData.userInfo
        })      
      }catch(E){
        console.log(0);
      }
    }
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    finishedNum: 8,
    unfinishedNum: 15,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'),
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  methods: {
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    },
    onGetUserInfo: function(e) {
      if (!this.data.logged && e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo,
          hasUserInfo: true,
        })
      }
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
    aboutus(){
      wx.navigateTo({
        url: '../mypage/aboutus/aboutus',
      })
    }
  }
})

