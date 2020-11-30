// pages/setting/setting.js

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   
    cache:[{
       iconurl:'/images/huancun.png',
       title:'缓存清理',
       tap:'clearCache'
    },{
      iconurl:'/images/history.png',
      title:'历史记录',
      tap:'history'
   },
   {
    iconurl:'/images/notebook.png',
    title:'训练笔记',
    tap:'notebook'
 }],
    device: [{
      iconurl: '/images/picture.png',
      title: '系统信息',
      tap: 'showSystemInfo'
    },
    {
      iconurl: '/images/web.png',
      title: '网络状态',
      tap: 'showNetWork'
    },
    {
      iconurl: '/images/map.png',
      title: '地图显示',
      tap: 'showMap'
    },
    
    {
      iconurl: '/images/map_1.png',
      title: '当前位置、速度',
      tap: 'showLonLat'
    },
    
    {
      iconurl: '/images/Ewm.png',
      title: '二维码',
      tap: 'scanQRCode'
    },
  ],
  
  },

  history:function(){
  wx.navigateTo({
    url: 'history/history',
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang:"zh_CN",
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    lang:"zh_CN",
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal:function(title,content,callback){
wx.showModal({
  title:title,
  cancelColor: '#7f8389',
  content:content,
  confirmColor:'#1f4ba5',
  success:function(res){
    if(res.confirm){
      callback&&callback();
    }
  }
})
  },
  //缓存页面
  clearCache:function(){
    this.showModal('缓存管理','确定要清楚本地缓存吗？',function(){
      wx.clearStorage({
        success: (res) => {
          wx.showToast({
            title: '缓存清理成功',
            duration:1000,
            mask:true,
            icon:'success'
          })
        },
        fail:function (e) {
          console.log(e);
          
        }
      })

    })
  },
  //跳转到系统信息
  showSystemInfo:function(){
    wx.navigateTo({
      url: 'device/device',
    })
  },
  //网络状态
  showNetWork:function(){
    var that=this;
    wx.getNetworkType({
      success: (result) => {
        var networkType=result.networkType
        that.showModal("网络状态",'您当前的网络：'+networkType);
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  //获取当前位置经纬度
  getLonlat:function(callback){
    var that=this;
    wx.getLocation({
      type:'gcj02',
      success:function(res){
        console.log(res);
        
        callback(res.longitude,res.latitude,res.speed);
      }
    })
    
  },
//显示当前位置坐标
showLonLat:function(){
  var that=this;
  this.getLonlat(function(lon,lat,speed){
    var lonStr=lon>=0?'东经':'西经',
    latStr=lat>=0?'南纬':'北纬',
    lon=lon.toFixed(2);
    lat=lat.toFixed(2);
    lonStr+=lon;
    latStr+=lat;
    speed=(speed||0).toFixed(2);
    that.showModal('当前位置和速度',"当前位置："+lonStr+','+latStr+','+"速度"+speed+'m/s');
  })
},
//在地图上显示当前位置
showMap:function(){
  this.getLonlat(function(lon,lat){
    wx.openLocation({
      latitude: lat,
      longitude:lon,
      scale:15,
      fail:function(){
        wx:showToast({
           title:'地图打开失败',
           duration:1000,
           icon:'cancel'
        })
      }

    })
  })
},
//扫码
scanQRCode:function(){
  var that=this;
  wx.scanCode({
   
    success: (res)=>{
      console.log(res);
      that.showModal('扫描二维码/条形码',res.result,false);
    },
    fail: (res)=>{
      that.showModal('扫描二维码/条形码',"扫码失败，请重新扫码",false);
    },
    complete: ()=>{}
  });
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