// app.js - 狗狗大队 全局逻辑
App({
  globalData: {
    appName: '狗狗大队',
    city: '南京',
    brandColor: '#2D6A4F',
    accentColor: '#3B6CFF',
    bgColor: '#F5F5F5',
    cardColor: '#FFFFFF',
    userInfo: {
      nickName: 'Yuan',
      avatar: '',
      city: '南京',
      location: '建邺区'
    },
    activeTab: 'pages/home/home'
  },
  onLaunch() {
    const sys = wx.getSystemInfoSync()
    this.globalData.statusBarHeight = sys.statusBarHeight
    this.globalData.windowHeight = sys.windowHeight
  }
})