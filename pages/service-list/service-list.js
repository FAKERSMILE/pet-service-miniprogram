const app = getApp()

Page({
  data: {
    cityName: '南京全城',
    pageTitle: '预定狗狗服务',
    // 0=遛狗员, 1=寄养家庭
    tab: 0,
    tabs: [
      { key: 0, label: '遛狗员',   icon: 'paw' },
      { key: 1, label: '寄养家庭', icon: 'home' }
    ],
    publishTag: '发布需求',
    publishTitle: '需要找人遛狗？',
    publishDesc: '平台认证 · 接单中 · 同城可约',
    publishBtn: '立即发布代遛需求',
    // 服务者列表
    serverList: [
      {
        id: 1,
        name: '猫小咪',
        avatar: '#FFD6E0',
        emoji: '🐶',
        badges: [
          { type: 'official', label: '平台官方认证', color: 'blue' },
          { type: 'trained',  label: '已完成培训',     color: 'green' }
        ],
        role: '认证遛狗员',
        orderCount: 0,
        complaintRate: '0%',
        price: '¥59',
        status: '接单中',
        statusColor: 'blue',
        district: '栖霞区'
      }
    ],
    // 两套内容：遛狗员 / 寄养家庭
    contentMap: {
      0: {
        publishTitle: '需要找人遛狗？',
        publishBtn: '立即发布代遛需求',
        goType: 'walk',
        serverList: [
          {
            id: 1, name: '猫小咪', avatar: '#FFD6E0', emoji: '🐶',
            badges: [
              { type: 'official', label: '平台官方认证', color: 'blue' },
              { type: 'trained',  label: '已完成培训',   color: 'green' }
            ],
            role: '认证遛狗员', orderCount: 0, complaintRate: '0%',
            price: '¥59', status: '接单中', statusColor: 'blue', district: '栖霞区'
          },
          {
            id: 2, name: '大壮', avatar: '#D4E6FF', emoji: '🧑',
            badges: [
              { type: 'official', label: '平台官方认证', color: 'blue' }
            ],
            role: '认证遛狗员', orderCount: 23, complaintRate: '0%',
            price: '¥45', status: '接单中', statusColor: 'blue', district: '鼓楼区'
          }
        ]
      },
      1: {
        publishTitle: '需要寄养狗狗？',
        publishBtn: '立即发布寄养需求',
        goType: 'foster',
        serverList: [
          {
            id: 11, name: '温暖小家', avatar: '#FFE4A0', emoji: '🏠',
            badges: [
              { type: 'official', label: '平台官方认证', color: 'blue' },
              { type: 'trained',  label: '已完成培训',   color: 'green' }
            ],
            role: '认证寄养家庭', orderCount: 5, complaintRate: '0%',
            price: '¥89/天', status: '可预约', statusColor: 'green', district: '江宁区'
          },
          {
            id: 12, name: '毛毛乐园', avatar: '#D6FFD6', emoji: '🏡',
            badges: [
              { type: 'official', label: '平台官方认证', color: 'blue' }
            ],
            role: '认证寄养家庭', orderCount: 12, complaintRate: '0%',
            price: '¥75/天', status: '接单中', statusColor: 'blue', district: '玄武区'
          }
        ]
      }
    },
    goType: 'walk'
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

  // 切换Tab: 0=遛狗员, 1=寄养家庭
  switchTab(e) {
    const tab = Number(e.currentTarget.dataset.key)
    const c = this.data.contentMap[tab]
    this.setData({
      tab,
      serverList: c.serverList,
      publishTitle: c.publishTitle,
      publishBtn: c.publishBtn,
      goType: c.goType
    })
  },

  // 跳转：服务详情
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/service-detail/service-detail?id=' + id
    })
  },

  // 跳转：选位置
  goMap() {
    wx.navigateTo({
      url: '/pages/service-map/service-map'
    })
  },

  // 立即发布需求（按当前Tab跳对应表单）
  goPublish() {
    wx.navigateTo({
      url: this.data.goType === 'foster'
        ? '/pages/service-foster/service-foster'
        : '/pages/service-walk/service-walk'
    })
  }
})