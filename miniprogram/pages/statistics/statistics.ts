// pages/statistics/statistics.ts

import { getStatisticsData } from "../../interface/statistics";

export type statisticsVO = {
  info:{
    avatar:string;
    days:number;
    ratio:string;
    ranking:string;
  },
  listHeader:{
    myName:string;
    oppositeName:string;
  },
  listContent:Array<{
    itemName:string;
    myCount:number;
    oppositeCount:number;
  }>,
  listBottom:{
    myRatio:string;
    oppositeRatio:string;
  }
}

Page<statisticsVO,{fetchData:()=>void}>({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      avatar:'https://img.zcool.cn/community/011d125bada9dda801213deae4ed54.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100',
      days:35,
      ratio:'70%',
      ranking:'1',
    },
    listHeader:{
      myName:'仙女',
      oppositeName:'聪明'
    },
    listContent:[
      {
        itemName:'早上八点起床',
        myCount:35,
        oppositeCount:35
      },
      {
        itemName:'一小时活动',
        myCount:35,
        oppositeCount:35
      },
      {
        itemName:'读十页书',
        myCount:35,
        oppositeCount:35
      }
    ],
    listBottom:{
      myRatio:'70%',
      oppositeRatio:'70%'
    }
  },

  fetchData(){
    getStatisticsData({date:''}).then((res)=>{
      const data = res.data;
      this.setData({...data});
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})