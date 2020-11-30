// pages/index/history/history.js
import * as echarts from '../../../ec-canvas/echarts';
var db=require("../../../db/db")
let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var source =  [
    ['product', '总箭数', '总环数', '平均环数']
  ]

  var history = db.history

  for(var i =0; i<db.history.item.length; i++){
    source.push([
      '第'+(i+1)+'组',
      history.item[i].arrow,
      history.item[i].sum,
      history.item[i].average
    ])
  }

  console.log(source);
  
 
   var option = {
      legend: {},
      tooltip: {},
      dataset: {
        source:source
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {},
      
      series: [{
          type: 'bar'
        },
        {
          type: 'bar'
        },
        {
          type: 'bar'
        }
      ]


    };

    chart.setOption(option);
    return chart;
  }

 
Page({

  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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