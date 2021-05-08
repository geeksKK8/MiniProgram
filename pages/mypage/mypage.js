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
    nickName: "点击登录",
    avatarUrl: app.globalData.avatarUrl,
    hasUserInfo: false,
    canIUseGetUserProfile: true,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login: 0,
    exp: 0,
  },
  methods: {
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          console.log(res)
          var appid ='wx8d5a947dca8f7394';//微信公众号开发者id
          var secret ='6feadcff71f7e71b065d525345c960af';//微信公众号开发者secret_key
          var that = this;
          
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

