//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    screenWidth: '',//屏幕的宽度
    keduWidth: '',//一格刻度的宽度
    ruleArrow1: [],//初始化刻度尺取值范围
    ruleArrow2: [],
    chooseValue1: '10',//默认值
    chooseValue2: '30.0',

  },
  // “刻度尺1滑动”
  rule1_scroll: function (e) {
    //计算滑动了多少刻度
    var scrollWidth = (e.detail.scrollLeft / this.data.keduWidth).toFixed(0);
    this.setData({
      chooseValue1: Number(scrollWidth) + 10
    })
  },
  // “刻度尺2滑动”
  rule2_scroll: function (e) {
    //计算滑动了多少刻度
    var scrollWidth = e.detail.scrollLeft / this.data.keduWidth / 10;
    this.setData({
      chooseValue2: (Number(scrollWidth) + 30.0).toFixed(1)
    })
  },

  onLoad: function () {
    var _this = this;
    // 初始"刻度1"取值范围
    for(var i=7; i<=83;i++){
      _this.data.ruleArrow1.push(i);
      _this.setData({
        ruleArrow1: _this.data.ruleArrow1
      })
    }
    // 初始"刻度2"取值范围
    for (var i = 29.7; i <= 40.4; i+=0.1) {
      _this.data.ruleArrow2.push(i.toFixed(1));
      _this.setData({
        ruleArrow2: _this.data.ruleArrow2
      })
    }
    //获取屏幕宽
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          screenWidth: res.windowWidth
        })
      },
    })
  },
  onReady: function(){
    var _this = this;
    //动态获取一格刻度的宽度，解决不同屏幕自适应问题
    wx.createSelectorQuery().select(".rule_kedu").boundingClientRect(function (rect) {
      _this.setData({
        keduWidth: rect.width
      })
    }).exec()
  }
})
