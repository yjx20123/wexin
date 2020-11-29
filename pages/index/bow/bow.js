// pages/bow/bow.js
var db = require("../../../db/db")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bow: db.bows,
    Meters: db.Meters,
    show: false,
    groups: db.groups,
    columns: db.arrows.column,
    
  },
  /*popup方法 */
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  /*picker组件*/
  onConfirm: function (e) {
    var that=this;
    // console.log(e);
    // console.log(e.detail.value[0]);
    // console.log(e.detail.value[1]);
    // wx.navigateTo({
    //   url: 'picture/picture',
    // })
    var group={
      column:e.detail.value[0],
      row:e.detail.value[1],
    }
    db.groupsFunction(group);
    that.setData({
      groups: db.groups,
    })
    this.onClose()
  },
  onCancel: function (e) {
    this.onClose()
  },
  onChange: function (e) {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groups: db.groups,
    })
  },
/*弓种背景色切换方法*/
  bowChecked: function (e) {
    let id = e.currentTarget.dataset.id
    db.bowChecked(id)
    this.setData({
      bow: db.bows
    })
  },
  /*距离背景色切换方法 */
  meterChecked: function (e) {
    let id = e.currentTarget.dataset.id
    db.metersChecked(id)
    this.setData({
      Meters: db.Meters
    })
  },
  /*组数箭数背景色切换方法*/
  groupsChecked: function (e) {
    console.log(e);
    
    let id = e.currentTarget.dataset.id
    db.groupsChecked(id)
    this.setData({
      groups: db.groups
    })
  },
  playTrain:function(e){
wx.navigateTo({
  url: 'picture/picture',
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