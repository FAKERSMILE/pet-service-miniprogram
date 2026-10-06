Page({
  data: {
    budget: 39,
    times: 1,
    totalAmount: '39.00',
    tags: [
      { id: 'urgent', name: '急单', selected: false },
      { id: 'peak', name: '晚高峰', selected: false },
      { id: 'pickup', name: '需上门接', selected: false },
      { id: 'downstairs', name: '楼下交接', selected: false },
      { id: 'fixed', name: '固定路线', selected: false }
    ],
    customTag: '',
    customTags: [],
    selectedDog: '',
    contactName: '',
    contactPhone: '',
    wechatId: '',
    phone: '',
    remark: ''
  },

  toggleTag(e) {
    const id = e.currentTarget.dataset.id
    const tags = this.data.tags.map(t => {
      if (t.id === id) {
        return Object.assign({}, t, { selected: !t.selected })
      }
      return t
    })
    this.setData({ tags })
  },

  onCustomTagInput(e) {
    this.setData({ customTag: e.detail.value })
  },

  addCustomTag() {
    const tag = this.data.customTag.trim()
    if (!tag) return
    const customTags = this.data.customTags.concat([tag])
    this.setData({ customTags, customTag: '' })
  },

  removeCustomTag(e) {
    const idx = e.currentTarget.dataset.index
    const customTags = this.data.customTags.filter((_, i) => i !== idx)
    this.setData({ customTags })
  },

  selectDog() {
    // 选择狗狗后自动带入联系信息（实际场景应跳转选择页）
    this.setData({
      selectedDog: '旺财',
      contactName: '张先生',
      contactPhone: '138****8888'
    })
  },

  onWechatInput(e) {
    this.setData({ wechatId: e.detail.value })
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value })
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  submit() {
    const { wechatId, phone } = this.data
    if (!wechatId) {
      wx.showToast({ title: '请输入微信号', icon: 'none' })
      return
    }
    if (!phone) {
      wx.showToast({ title: '请输入手机号', icon: 'none' })
      return
    }
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' })
      return
    }
    wx.showToast({ title: '提交成功', icon: 'success' })
  }
})