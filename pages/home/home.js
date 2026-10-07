const app = getApp()

Page({
  data: {
    cityName: '南京',
    bannerText: '狗狗大队·南京',
    cityCount: 3165,
    rentCards: [
      { id: 1, title: '带狗出游', desc: '一起去看世界', cover: '#52B788', emoji: '🏕️', price: '¥99/次' },
      { id: 2, title: '陪伴散步', desc: '专业遛狗员陪走', cover: '#3B6CFF', emoji: '🚶', price: '¥39/次' }
    ],
    quickEntries: [
      { id: 1, title: '我的狗狗', emoji: '🐶', desc: '2份档案' },
      { id: 2, title: '蜡笔拼图', emoji: '🧩', desc: 'DIY' },
      { id: 3, title: '小狗蛋', emoji: '🥚', desc: '惊喜掉落' }
    ],
    squareFilterTabs: [
      { key: 'city',    label: '同城狗狗' },
      { key: 'life',    label: '狗窝生活' },
      { key: 'lost',    label: '寻狗信息' },
      { key: 'adopt',   label: '领养信息' }
    ],
    squareActive: 'city',
    squareDogs: [
      { id: 1, name: '奶茶', breed: '比熊·2岁', avatar: '#FFD6E0', emoji: '🐕' },
      { id: 2, name: '咖啡', breed: '泰迪·3岁', avatar: '#D4A373', emoji: '🐩' },
      { id: 3, name: '布丁', breed: '柯基·1岁', avatar: '#FFE4A0', emoji: '🐶' }
    ],
    squareContentMap: {
      city: [
        { id: 1, name: '奶茶', breed: '比熊·2岁', avatar: '#FFD6E0', emoji: '🐕' },
        { id: 2, name: '咖啡', breed: '泰迪·3岁', avatar: '#D4A373', emoji: '🐩' },
        { id: 3, name: '布丁', breed: '柯基·1岁', avatar: '#FFE4A0', emoji: '🐶' }
      ],
      life: [
        { id: 11, name: '豆豆的日常', breed: '今天学会了握手', avatar: '#D4E6FF', emoji: '🐾' },
        { id: 12, name: '球球睡姿', breed: '四脚朝天式', avatar: '#FFE4A0', emoji: '😴' },
        { id: 13, name: '肉包干饭', breed: '干饭第一名', avatar: '#FFD6E0', emoji: '🍚' }
      ],
      lost: [
        { id: 21, name: '雅罗塔', breed: '白色犬·江宁区周村', avatar: '#EFEFEF', emoji: '🔎' },
        { id: 22, name: '大黄', breed: '田园犬·玄武区', avatar: '#FFE4A0', emoji: '📢' },
        { id: 23, name: '小黑', breed: '拉布拉多·鼓楼区', avatar: '#D4E6FF', emoji: '🔍' }
      ],
      adopt: [
        { id: 31, name: '糯米', breed: '比熊·待领养', avatar: '#FFD6E0', emoji: '🏡' },
        { id: 32, name: '旺财', breed: '田园犬·待领养', avatar: '#D4A373', emoji: '❤️' },
        { id: 33, name: '年糕', breed: '萨摩耶·待领养', avatar: '#EFEFEF', emoji: '🐶' }
      ]
    }
  },

  onLoad() {
    this.syncTabBar()
  },
  onShow() {
    this.syncTabBar()
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  syncTabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  // 跳转：完善资料
  goProfileSetup() { wx.navigateTo({ url: '/pages/profile-setup/profile-setup' }) },
  // 跳转：服务列表
  goServiceList() { wx.navigateTo({ url: '/pages/service-list/service-list' }) },
  // 跳转：寻狗详情
  goLostDetail() { wx.navigateTo({ url: '/pages/lost-detail/lost-detail' }) },
  // 跳转：宠物详情
  goPetDetail() { wx.switchTab({ url: '/pages/discover/discover' }) },
  // 跳转：附近活动
  goActivity() { wx.switchTab({ url: '/pages/activity/activity' }) },

  switchCity() {
    wx.showActionSheet({ itemList: ['南京', '上海', '杭州', '苏州'], success: r => {
      this.setData({ cityName: ['南京','上海','杭州','苏州'][r.tapIndex], bannerText: '狗狗大队·' + ['南京','上海','杭州','苏州'][r.tapIndex] })
    }})
  },
  onSearch() {
    // 快捷搜索入口：跳转对应页面
    const targets = [
      '/pages/service-list/service-list?type=walk',
      '/pages/service-list/service-list?type=foster',
      '/pages/discover/discover',
      '/pages/activity/activity'
    ]
    wx.showActionSheet({
      itemList: ['找遛狗员', '找寄养家庭', '逛狗探广场', '看附近活动'],
      success: (r) => {
        const url = targets[r.tapIndex]
        if (url.indexOf('/pages/discover/') > -1 || url.indexOf('/pages/activity/') > -1) {
          wx.switchTab({ url })
        } else {
          wx.navigateTo({ url })
        }
      }
    })
  },
  switchSquareTab(e) {
    const key = e.currentTarget.dataset.key
    this.setData({
      squareActive: key,
      squareDogs: this.data.squareContentMap[key] || []
    })
  },
  onRentTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/service-list/service-list?type=' + id })
  }
})