const app = getApp();
Page({
  data: {
    info:[],  
    value:'',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    proj_name: null,
    proj_content: null,
    proj_ddl: null,
    userInfo:null,
    openId:null,
    pid: null
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    var imgList=this.data.imgList;
    console.log(imgList)
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        
        if (imgList.length != 0) {
          this.setData({
            imgList: imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
    additem:function(){ 
    var that=this;
    var info = this.data.info; 
    info.push(1);
    console.log(info)  
    that.setData({  
        info:info 
        }) 
    },
  getValue:function(e){ 
    this.setData({  
        title:e.detail.value,  
        })  
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var mydate = new Date();
    _this.setData({
      proj_ddl: mydate.getFullYear() + '-' + (1 + mydate.getMonth()) + '-' + mydate.getDate(),
      userInfo: app.globalData.userInfo
      // proj_ddl: mydate.toLocaleDateString().replace(/\//g,'-')
      // 用当前时间初始化
    })
    // wx.getUserInfo({
    //   success: res => {
    //     //console.log(res)
    //     _this.setData({
    //       userInfo:res.userInfo
    //     })
    //   }
    // })
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getProj',
      // 传给云函数的参数
      data: {},
      success: function(res) {
        //console.log(res.result.userInfo.openId)
        _this.setData({
          openId:res.result.userInfo.openId
        })
      }
    })
  },
  submit_create: function(){
    var _this = this;
    const db = wx.cloud.database()
    db.collection('project').add({
      data:{
        userid: _this.data.openId,
        pname: _this.data.proj_name,
        content:  _this.data.proj_content,
        ddl: _this.data.proj_ddl
      },
      success: res=>{
        console.log("云数据库project新增成功" , res)
        this.setData({
          pid: res._id
        })
        _this.after_submit(_this)
      },
      fail: err=>{
        console.error("云数据库project新增失败" , err)
      }
    })
    console.log(_this.data.proj_name, _this.data.proj_content, _this.data.proj_ddl,_this.data.openId);
    // 这是绑定给提交按钮的时间，调用接口提交create
    wx.request({
      url: 'https://wychandsome12138.xyz/api/post/create_proj',
      method: "POST",
      data:{
        // "usrid": "create_proj_test_id",
        // ==================== 上为测试id, 下为openid ===============
        "usrid":_this.data.openId,
        "projcolor": 255, //这没什么用
        "projname": _this.data.proj_name,
        "content": _this.data.proj_content,
        "ddl": _this.data.proj_ddl
      },
      success: function(res){
        console.log(res.data)
      },
      fail: function(res){
        console.log("create project 的 wx request 失败！")
      }
      
    })
    console.log('test',_this.data.pid)
    // db.collection('member').add({
    //   data:{
    //     id: _this.data.openid,
    //     url: _this.data.userInfo.avatarUrl,
    //     name: _this.data.userInfo.nickName,
    //     pid: _this.data.pid,
    //     own: 1
    //   }
    // })
    
    wx.reLaunch({
      url: '../index/index'
    })

  },
  after_submit: function(_this){
    const db = wx.cloud.database()
      db.collection('member').add({
      data:{
        id: _this.data.openid,
        url: _this.data.userInfo.avatarUrl,
        name: _this.data.userInfo.nickName,
        pid: _this.data.pid,
        own: 1
      }
    })
  }
})