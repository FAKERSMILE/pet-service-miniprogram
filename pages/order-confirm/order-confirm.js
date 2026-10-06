Page({
  data: {
    noPet: true,
    serviceTypes: [
      { key: 'walk',    label: '仅遛狗', desc: '上门遛狗' },
      { key: 'feed',   label: '上门喂养', desc: '喂养+清理' },
      { key: 'walk+feed', label: '遛狗+喂养', desc: '复合服务' }
    ],
    activeService: 'walk',
    todoTags: [
      { key: 'food',     label: '补粮',      sel: false },
      { key: 'water',   label: '换水',      sel: false },
      { key: 'bowl',     label: '清理食盆',   sel: false },
      { key: 'poop',     label: '清理排泄物', sel: false },
      { key: 'walk',    label: '遛狗',      sel: true  },
      { key: 'paw',     label: '擦脚',      sel: true  },
      { key: 'photo',   label: '照片反馈',   sel: true  },
      { key: 'video',   label: '视频反馈',   sel: false }
    ],
    plans: [
      { key: 'once',   label: '单次' },
      { key: 'multi', label: '连续多天' }
    ],
    activePlan: 'once',
    serviceDate: '2026-09-18',
    serviceTime: '18:30',
    addons: [
      { id: 1, name: '多宠服务',     price: 10, sel: false },
      { id: 2, name: '延长15分钟',   price: 18, sel: false }
    ]
  },
  newArchive() { wx.navigateTo({ url: '/pages/profile-setup/profile-setup' }) },
  pickService(e) { this.setData({ activeService: e.currentTarget.dataset.key }) },
  toggleTodo(e) {
    const idx = e.currentTarget.dataset.idx
    const key = 'todoTags[' + idx + '].sel'
    this.setData({ [key]: !this.data.todoTags[idx].sel })
  },
  pickPlan(e) { this.setData({ activePlan: e.currentTarget.dataset.key }) },
  pickDate() {
    wx.showToast({ title: '请使用日期选择器', icon: 'none' })
  },
  pickTime() {
    wx.showToast({ title: '请使用时间选择器', icon: 'none' })
  },
  toggleAddon(e) {
    const idx = e.currentTarget.dataset.idx
    const key = 'addons[' + idx + '].sel'
    this.setData({ [key]: !this.data.addons[idx].sel })
  },
  submit() {
    wx.showToast({ title: '订单已提交（模拟）', icon: 'success' })
  }
})