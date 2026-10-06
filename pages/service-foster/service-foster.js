Page({
  data: {
    leaveDate: '2026-09-19',
    startTime: '09:00',
    days: 1,
    location: '',
    dailyBudget: '89',
    totalFee: '89.00',
    tags: [
      { id: 'holiday', name: '节假日寄养', selected: false },
      { id: 'daily-video', name: '需每日视频', selected: false },
      { id: 'individual-care', name: '需单独照看', selected: false },
      { id: 'no-cage', name: '不笼养优先', selected: false }
    ],
    customTag: '',
    customTags: []
  },

  onLoad() {
    this.calculateFee()
  },

  onLeaveDateChange(e) {
    this.setData({ leaveDate: e.detail.value })
    this.calculateFee()
  },

  onStartTimeChange(e) {
    this.setData({ startTime: e.detail.value })
  },

  onLocationInput(e) {
    this.setData({ location: e.detail.value })
  },

  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({ location: res.address || res.name })
      }
    })
  },

  onBudgetInput(e) {
    this.setData({ dailyBudget: e.detail.value })
    this.calculateFee()
  },

  calculateFee() {
    const budget = parseFloat(this.data.dailyBudget) || 0
    const total = (budget * this.data.days).toFixed(2)
    this.setData({ totalFee: total })
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
    if (!tag) {
      wx.showToast({ title: '请输入标签内容', icon: 'none' })
      return
    }
    const customTags = this.data.customTags.concat([tag])
    this.setData({ customTags, customTag: '' })
  },

  removeCustomTag(e) {
    const idx = e.currentTarget.dataset.index
    const customTags = this.data.customTags.filter((_, i) => i !== idx)
    this.setData({ customTags })
  },

  submit() {
    if (!this.data.location.trim()) {
      wx.showToast({ title: '请填写大致地点', icon: 'none' })
      return
    }
    if (!this.data.dailyBudget) {
      wx.showToast({ title: '请填写每日预算', icon: 'none' })
      return
    }
    wx.showToast({ title: '需求已提交', icon: 'success' })
  }
})