Page({
  data: {
    tabs: [
      { key: 'all',       label: '全部' },
      { key: 'pending',   label: '待服务' },
      { key: 'done',      label: '已完成' },
      { key: 'cancelled', label: '已取消' }
    ],
    activeTab: 'all',
    orders: [
      {
        id: 1,
        orderNo: 'DD20261007001',
        title: '日常遛狗 · 60分钟',
        emoji: '🦮', iconBg: '#D4E6FF',
        date: '2026-10-07', time: '15:00-16:00',
        server: '猫小咪 · 认证遛狗员',
        price: '59',
        statusType: 'pending',
        statusText: '待服务',
        serviceId: 1
      },
      {
        id: 2,
        orderNo: 'DD20261004002',
        title: '周末寄养 · 3天2晚',
        emoji: '🏠', iconBg: '#FFE4A0',
        date: '2026-10-04', time: '09:00 取狗',
        server: '温暖小家 · 认证寄养家庭',
        price: '267',
        statusType: 'pending',
        statusText: '待服务',
        serviceId: 11
      },
      {
        id: 3,
        orderNo: 'DD20260928003',
        title: '日常遛狗 · 60分钟',
        emoji: '🦮', iconBg: '#D4E6FF',
        date: '2026-09-28', time: '10:00-11:00',
        server: '大壮 · 认证遛狗员',
        price: '45',
        statusType: 'done',
        statusText: '已完成',
        serviceId: 2
      },
      {
        id: 4,
        orderNo: 'DD20260920004',
        title: '节假日寄养 · 2天1晚',
        emoji: '🏡', iconBg: '#D6FFD6',
        date: '2026-09-20', time: '14:00 取狗',
        server: '毛毛乐园 · 认证寄养家庭',
        price: '150',
        statusType: 'cancelled',
        statusText: '已取消',
        serviceId: 12
      }
    ],
    filteredOrders: []
  },
  onLoad() { this.applyFilter('all') },
  switchTab(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ activeTab: key })
    this.applyFilter(key)
  },
  applyFilter(key) {
    const list = key === 'all'
      ? this.data.orders
      : this.data.orders.filter(o => o.statusType === key)
    this.setData({ filteredOrders: list })
  },
  copyOrderNo(e) {
    const no = e.currentTarget.dataset.no
    wx.setClipboardData({
      data: no,
      success: () => wx.showToast({ title: '已复制', icon: 'success' })
    })
  },
  goService(e) {
    const id = e.currentTarget.dataset.id
    if (id) wx.navigateTo({ url: '/pages/service-detail/service-detail?id=' + id })
  },
  goReview(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '评价订单',
      content: '订单 DD' + id + '：感谢您的信任！给这次服务打个分吧～',
      showCancel: false,
      confirmText: '好评 5⭐'
    })
  },
  cancelOrder(e) {
    const no = e.currentTarget.dataset.no
    wx.showModal({
      title: '取消订单',
      content: '确定取消订单 ' + no + ' 吗？取消后费用将原路退回。',
      confirmText: '取消订单',
      confirmColor: '#E63946',
      success: (r) => {
        if (!r.confirm) return
        const orders = this.data.orders.map(o =>
          o.orderNo === no
            ? { ...o, statusType: 'cancelled', statusText: '已取消' }
            : o
        )
        this.setData({ orders })
        this.applyFilter(this.data.activeTab)
        wx.showToast({ title: '已取消', icon: 'success' })
      }
    })
  }
})
