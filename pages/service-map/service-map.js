Page({
  data: {
    location: '南京',
    view: 'map',
    filters: [
      { key: 'all',    label: '全部' },
      { key: 'walk',   label: '一起遛' },
      { key: 'need',   label: '需求' },
      { key: 'walked', label: '代遛' },
      { key: 'foster', label: '寄养' }
    ],
    activeFilter: 'foster',
    pins: [
      { id: 1, x: 30, y: 40, type: 'foster', label: '猫小咪' },
      { id: 2, x: 55, y: 25, type: 'walk',    label: '小七' },
      { id: 3, x: 70, y: 60, type: 'walked',  label: '阿明' },
      { id: 4, x: 42, y: 70, type: 'need',    label: '糖糖' },
      { id: 5, x: 22, y: 55, type: 'walk',    label: '小川' }
    ]
  },
  switchView(e) { this.setData({ view: e.currentTarget.dataset.v }) },
  switchFilter(e) { this.setData({ activeFilter: e.currentTarget.dataset.key }) },
  switchLocation() {
    wx.showActionSheet({
      itemList: ['南京', '上海', '杭州', '苏州'],
      success: r => this.setData({ location: ['南京','上海','杭州','苏州'][r.tapIndex] })
    })
  },
  chooseLocation() { wx.chooseLocation && wx.chooseLocation({ success: () => {} }) },
  openPin(e) {
    const name = e.currentTarget.dataset.name
    wx.navigateTo({ url: '/pages/service-detail/service-detail?name=' + name })
  }
})