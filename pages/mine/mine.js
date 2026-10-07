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
  goOrders() { wx.navigateTo({ url: '/pages/orders/orders' }) },
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
    if (id === 'coupon') {
      wx.showModal({
        title: '我的卡券',
        content: '新人立减 ¥10（满 ¥50 可用，有效期至 2026-12-31）\n遛狗次卡 9 折（剩余 5 次）',
        showCancel: false,
        confirmText: '知道了'
      })
    } else if (id === 'support') {
      wx.showModal({
        title: '保障与客服',
        content: '服务全程平台保障\n客服热线：400-000-0000\n在线时间：7x12 小时（8:00-20:00）',
        confirmText: '拨打热线',
        cancelText: '关闭',
        success: (r) => {
          if (r.confirm) wx.makePhoneCall({ phoneNumber: '4000000000', fail: () => {} })
        }
      })
    } else if (id === 'privacy') {
      wx.showModal({
        title: '隐私保护',
        content: '· 地址信息仅对接单服务者可见\n· 狗狗档案默认仅自己可见\n· 可随时在设置中注销并删除全部数据',
        showCancel: false,
        confirmText: '知道了'
      })
    }
  }
})