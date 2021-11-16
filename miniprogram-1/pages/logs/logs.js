// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    activeIndex:0,
    dayList:[],//当天储存信息
    list:[],
    sum:[
      {
        title:'今日番茄次数',
        val:'0'
      },
      {
        title:'累计番茄次数',
        val:'0'
      },
      {
        title:'今日专注时长',
        val:'0分钟'
      },
      {
        title:'累计专注时长',
        val:'0分钟'
      }
    ],
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
    ]
  },
  onShow() {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return {
    //       date: util.formatTime(new Date(log)),
    //       timeStamp: log
    //     }
    //   })
    // })
    var logs = wx.getStorageSync('logs') || [];
    var day = 0;//今日次数
    var total = logs.length;//累计次数
    var dayTime = 0;//今日时长
    var totalTime = 0;//累计时长
    var dayList = [];
    if(logs.length > 0){
      for(var i=0;i<logs.length;i++){
        if(logs[i].date.sunstr(0,10) == util.formatTime(new Date).substr(0,10)){
          day = day + 1;
          dayTime = dayTime + parseInt(logs[i].time);
          dayList.push(logs[i]);
          this.setData({
            dayList:dayList,
            list:dayList
          })
        }
        totalTime = totalTime + parseInt(logs[i].time)
      }
      this.setData({
        'sum[0].val':day,
        'sum[1].val':total,
        'sum[2].val':dayTime + '分钟',
        'sum[3].val':totalTime + '分钟'
      })
    }
  },
  changeType:function(e){
    var index = e.currentTarget.dataset.index;
    if(index == 0){
      this.setData({
        list:this.data.dayList
      })
    }else if(index == 1){
      var logs = wx.getStorageSync('logs') || [];
      this.setData({
        list:logs
      })
    }
    this.setData({
      activeIndex:e.currentTarget.dataset.index
    })
  }
})
