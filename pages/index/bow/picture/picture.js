// pages/index/picture/picture.js
var db = require("../../.../../../../db/db")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bows: db.bows,
    Meters: db.Meters,
    groups: db.groups,
    nums: [],
    input: 0,
    sum: 0.00
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bow: db.bows,
      Meters: db.Meters,
      groups: db.groups,
    })
    /* 获取训练设置中的值 */
    var that = this;
    var checkedBow = that.data.bow.item.find(function (e) {
      return e.id === that.data.bow.checkedId
    })

    var checkedMeters = that.data.Meters.item.find(function (e) {
      return e.id === that.data.Meters.msChecked
    })
    var checkGroup = that.data.groups.item.find(function (e) {
      return e.id === that.data.groups.groupChecked
    })
    console.log(checkedBow);
    // console.log(checkGroup);

    that.setData({
      checkedBow: checkedBow,
      checkedMeters: checkedMeters,
      checkGroup: checkGroup
    })
  },


  //获取焦点事件
  numberfocus(e) {
    
    
    //是否第一次输入
    if (e.detail.value == "") {
      this.setData({
        input: 0
      })
      return;
    }

    //第二次输入的
    this.setData({
      input: e.detail.value //保存原来的值
    })

    //我是获取焦点
    //console.log("我是获取焦点触发的" + this.data.input);


  },
  //失去焦点
  numberBlur: function (e) {

    //当前的值
    var num = e.detail.value / 1
    //数值
    let nums = this.data.nums

    //原数值
    let input = this.data.input;

    //当前数组的index
    let index;

    var sum = 0

    console.log("我是数组相加值：" + sum);


    console.log("我是失去焦点触发的" + input);

    //相同时
    if (num == input) {
      return;
    }

    //判断状态
    switch (input) {
      case 0: //第一次输入
        nums.push(num)
        break;
      default: //修改数据
        index = nums.findIndex(item => {
          return input == item
        });
        console.log(index);
        nums[index] = num;

    }
    for (var i = 0; i < nums.length; i++) {
      sum += nums[i]
    }

    this.setData({
      nums: nums,
      sum: sum
    })

    console.log(this.data.nums);

  },
  /*判断输入数值是否大于十 */
  numberinput:function(e){
      var value=e.detail.value
   if(value>10){
     wx.showToast({
       title: '已超10，重新输',
       icon:"none"
     })
     this.setData({
       value:0
     })
   }else{
     value:value
   }
   
  },
  /*保存记录 */
  baoTap: function () {
    let num = 0
    this.data.nums.forEach(e => {
      num += e
    })
    /*判断input是否输入完整*/
    if (this.data.nums.length === this.data.checkGroup.column * this.data.checkGroup.row) {
      wx.switchTab({
        url: '/pages/index/index',
      })
      console.log(this.data.checkedBow);
      
      var history = {
        bow: this.data.checkedBow,
        Meters: this.data.checkedMeters,
        sum: this.data.sum,
        arrow: this.data.checkGroup.column * this.data.checkGroup.row,
        average: (this.data.sum /(this.data.checkGroup.column * this.data.checkGroup.row )).toFixed(2)
      }
      db.historyFunction(history);

      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 3]
      console.log(pages);
      
      prevPage.setData({
        history:history
      })
    } else {
      wx.showToast({
        title: '您输入的值不完整',
        icon: 'none'
      })
    }
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