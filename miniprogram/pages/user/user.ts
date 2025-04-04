// pages/user/user.ts
const app = getApp();


type PageData = {
  isLogin:boolean;
  personalInfo:{
    avatar:string;
    nickname:string;
    id:string;
  };
  listData:Array<{
    icon:string;
    text:string;
    path:string;
  }>;
}

type FunctionType = {
  toLogin:()=>void,
  handleItemClick:(e:any)=>void
}

Page<PageData,FunctionType>({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:app.globalData.isLogin,
    personalInfo:{
      avatar:'',
      nickname:'',
      id:''
    },
    listData:[
      {
        icon:'https://tse3-mm.cn.bing.net/th/id/OIP-C.o-dqT5Z2SopUGkVn0TsN9wHaHa?rs=1&pid=ImgDetMain',
        text:'收藏',
        path:'pages/addProgramme/addProgramme'
      },
      {
        icon:'https://tse3-mm.cn.bing.net/th/id/OIP-C.o-dqT5Z2SopUGkVn0TsN9wHaHa?rs=1&pid=ImgDetMain',
        text:'添加挑战',
        path:'/pages/addProgramme/addProgramme'
      },
      {
        icon:'https://tse3-mm.cn.bing.net/th/id/OIP-C.o-dqT5Z2SopUGkVn0TsN9wHaHa?rs=1&pid=ImgDetMain',
        text:'添加朋友',
        path:'/pages/addFriend/addFriend'
      },
    ]
  },

  handleItemClick: function (e) {
    
    const index = e.currentTarget.dataset.index;
    const item = this.data.listData[index];
    console.log('触发了点击事件',index,item,item.path);
    wx.navigateTo({
      url:item.path,
      fail: (err) => {
        console.error('导航失败', err);
      }
    });

  },

  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login'
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
    const isLogin = wx.getStorageSync('isLogin');
    console.log("app.globalData.isLogin:",isLogin)
    this.setData({isLogin})
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