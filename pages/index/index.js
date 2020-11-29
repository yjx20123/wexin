// pages/index/index.js

var db= require('../../db/db')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:null
  },
gotap:function(){
wx.navigateTo({
  url: 'bow/bow',
  
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      history:db.history
    })
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
    console.log(this.data.history);
    var totalScore = 0
    var totalBow = 0

    this.setData({
      history:db.history
    })
    this.data.history.item.forEach(item=>{
        totalScore +=  item.sum
        totalBow +=  item.arrow
    })
    if(totalScore==0){
      var averageScore=0
    }
    else{
       averageScore = (totalScore/totalBow).toFixed(2)
    }
    

    this.setData({
      totalScore:totalScore,
      totalBow:totalBow,
      averageScore:averageScore
    })
  },
  numberTap:function(){
    wx.navigateTo({
      url: 'history/history',
    })
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