Page({
  data: {
    service: {
      title: '猫小咪·专业代遛服务',
      area: '栖霞区',
      scope: '同城',
      price: 59,
      priceNote: '按次或连续计划计费',
      tags: ['有养狗经验', '可早晚高峰', '可拍照反馈', '熟悉附近路线', '官方认证', '可接中型犬', '免疫状态需确认', '不接强拉拽'],
      scenes: ['#E8F0FF', '#DDE9FF', '#CFE0FF']
    },
    provider: {
      name: '猫小咪',
      verified: true,
      trained: true,
      role: '认证遛狗员',
      orders: 0,
      complaint: 0,
      avatar: '#3B6CFF'
    }
  },
  onLoad() {},
  report()    { wx.showToast({ title: '已收到举报', icon: 'none' }) },
  rules()     { wx.showToast({ title: '规则与保障', icon: 'none' }) },
  onShareAppMessage() { return { title: this.data.service.title } },
  book()      { wx.navigateTo({ url: '/pages/order-confirm/order-confirm' }) }
})