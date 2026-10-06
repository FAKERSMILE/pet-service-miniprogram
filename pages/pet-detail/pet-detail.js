Page({
  data: {
    pet: {
      name: '嘟嘟',
      breed: '马尔泰',
      gender: '公',
      age: '2岁3个月',
      owner: 'Yuan',
      cover: '#FFD6E0',
      tags: ['2岁3个月', '江阴市', '已解锁', '生日256天'],
      likes: 9,
      lit: false,
      pawSign: {
        title: '朋友爪子签',
        tags: ['今天先闻闻', '带点朋友'],
        desc: '嘟嘟还在慢慢认识新朋友…',
        status: '已认识2只狗狗·今天可以带点朋友'
      }
    }
  },
  onLoad(options) {
    // 支持从狗探滑卡页带入狗狗名字
    if (options && options.name) {
      this.setData({ 'pet.name': decodeURIComponent(options.name) })
      wx.setNavigationBarTitle({ title: decodeURIComponent(options.name) })
    }
  },
  toggleLike() {
    const lit = !this.data.pet.lit
    this.setData({
      'pet.lit': lit,
      'pet.likes': this.data.pet.likes + (lit ? 1 : -1)
    })
  },
  report() { wx.showToast({ title: '已收到举报', icon: 'none' }) },
  onShareAppMessage() { return { title: this.data.pet.name } },
  share() { wx.showToast({ title: '请使用右上角分享', icon: 'none' }) },
  goTogether() { wx.navigateTo({ url: '/pages/service-walk/service-walk' }) }
})