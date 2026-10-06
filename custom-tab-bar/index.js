Component({
  data: {
    selected: 0,
    color: '#999999',
    selectedColor: '#2D6A4F',
    list: [
      { pagePath: '/pages/home/home',         text: '首页',     icon: 'home',     badge: '' },
      { pagePath: '/pages/discover/discover', text: '狗探',     icon: 'paw',       badge: '' },
      { pagePath: '/pages/activity/activity', text: '附近活动', icon: 'pin',       badge: '' },
      { pagePath: '/pages/mine/mine',         text: '我的',     icon: 'user',      badge: '1' }
    ]
  },
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index
      const item = this.data.list[idx]
      wx.switchTab({ url: item.pagePath })
      this.setData({ selected: idx })
    }
  }
})