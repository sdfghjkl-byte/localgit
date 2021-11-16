// index.js
// 获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    time:'25',
    cateActive:'0',
    clockShow:false,
    rate:'',
    windowHeight:'0',
    mTime:30000,
    timeStr:'25.00',
    cateArr:[
      {
        icon:'tcy_avatar_30',
        text:'工作'
      },
      {
        icon:'tcy_avatar_33',
        text:'学习'
      },
      {
        icon:'tcy_avatar_35',
        text:'思考'
      },
      {
        icon:'tcy_avatar_36',
        text:'写作'
      },
      {
        icon:'tcy_avatar_39',
        text:'运动'
      },
      {
        icon:'tcy_avatar_40',
        text:'阅读'
      }
    ],
    onShow:false,
    pauseShow:true,
    continueCancleShow:false,
    timer:null,
  },
  
 
  onLoad() {//750rpx
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    this.setData({
      rate:rate,
      windowHeight:rate * res.windowHeight,
    })
    // rate = 750rpx / res.windowWidth = ? / res.windowHeight
  },
  
  slideChange:function (e){
    this.setData({
      time:e.detail.value
    })
  },
  clickCate:function (e){
    this.setData({
      cateActive:e.currentTarget.dataset.index
    })
  },
  start:function (e){
    this.setData({
      clockShow:true,
      mTime:this.data.time*60*1000,
      timeStr:parseInt(this.data.time) >= 10 ? this.data.time + ":00" : "0" + this.data.time + ":00"

    }),
    this.drawBg(),//调用函数,
    this.drawActive();
  },
  drawBg:function (){
    var lineWidth = 6 / this.data.rate;//将rpx转化为px
    var ctx = wx.createCanvasContext('progress_bg');
    ctx.setStrokeStyle("#000000");
    ctx.setLineWidth(lineWidth);
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2-lineWidth,0,2 * Math.PI,false);
    ctx.stroke();
    ctx.draw();
  },
  drawActive:function (){
    var _this = this;
    var timer = setInterval(function(){
      var angle = 1.5 + 2*(_this.data.time*60*1000 - _this.data.mTime) / (_this.data.time*60*1000);
      var currentTime=_this.data.mTime - 100;
      _this.setData({
        mTime:currentTime,
      });
      if(angle < 3.5){
        if(currentTime % 1000 == 0){
          var timeStr1 = currentTime / 1000;//转化为秒
          var timeStr2 = parseInt(timeStr1 / 60);
          var timeStr3 = (timeStr1 - timeStr2*60) >= 10 ? (timeStr1 - timeStr2*60) : '0' + (timeStr1 - timeStr2*60);
          var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2;
          _this.setData({
            timeStr:timeStr2 + ':' + timeStr3
          })
        }
        var lineWidth = 6 / _this.data.rate;//将rpx转化为px
        var ctx = wx.createCanvasContext('progress_active');
        ctx.setStrokeStyle("#fff");
        ctx.setLineWidth(lineWidth);
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2-lineWidth,1.5 * Math.PI,angle * Math.PI,false);
        ctx.stroke();
        ctx.draw();
        }else{
          var logs = wx.getStorageSync('logs');
          logs.unshift({
            date:util.formatTime(new Date),
            cate:_this.data.cateActive,
            time:_this.data.time
          });
          wx.setStorageSync('logs',logs);
          _this.setData({
            timeStr:'00:00',
            pauseShow:false,
            continueCancleShow:false,
            okShow:true
          })
          clearInterval(timer);
        }
    },100);
    _this.setData({
      timer:timer
    })
  },
  pause:function(){
    clearInterval(this.data.timer);
    this.setData({
      pauseShow:false,
      continueCancleShow:true,
      okShow:false
    })
  },
  continue:function(){
    this.drawActive();
    this.setData({
      pauseShow:true,
      continueCancleShow:false,
      okShow:false
    })
  },
  cancle:function(){
    clearInterval(this.data.timer);//清除定时器
    // this.drawActive();
    this.setData({
      pauseShow:true,
      continueCancleShow:false,
      okShow:false,
      clockShow:false
    })
  },
  ok:function(){
    this.drawActive(this.data.timer);
    this.setData({
      pauseShow:false,
      continueCancleShow:false,
      okShow:false,
      clockShow:false
    })
  }
})
