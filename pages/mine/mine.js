Page({
  data: {
    user: {
      nickName: 'Yuan',
      avatar: '#3B6CFF',
      avatarText: 'Y'
    },
    orderCount: 0,
    funcs: [
      { id: 'archive',  title: '档案管理', desc: '0份',     emoji: '📂', badge: '' },
      { id: 'publish',  title: '发布管理', desc: '需求、领养与寻狗信息', emoji: '📨', badge: '' },
      { id: 'message',  title: '消息中心', desc: '查看通知', emoji: '🐾', badge: '1' },
      { id: 'dog',      title: '我的狗狗', desc: '小家伙的档案', emoji: '🐶', badge: '' }
    ],
    accounts: [
      { id: 'coupon',  title: '我的卡券',   desc: '优惠券与代金券', emoji: '🎫' },
      { id: 'support', title: '保障与客服', desc: '7x12 在线',    emoji: '🛡️' },
      { id: 'privacy', title: '隐私保护',   desc: '信息与隐私设置', emoji: '🔒' }
    ]
  },
  onShow() { this.syncTabBar() },
  syncTabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },
  goProfileSetup() { wx.navigateTo({ url: '/pages/profile-setup/profile-setup' }) },
  goOrders()       { wx.showToast({ title: '订单列表开发中', icon: 'none' }) },
  goFunc(e) {
    const id = e.currentTarget.dataset.id
    const map = {
      archive: '/pages/profile-setup/profile-setup',
      publish: '/pages/lost-detail/lost-detail',
      message: '/pages/service-list/service-list',
      dog:     '/pages/pet-detail/pet-detail'
    }
    if (map[id]) wx.navigateTo({ url: map[id] })
  },
  goAccount(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: id + ' 开发中', icon: 'none' })
  }
})