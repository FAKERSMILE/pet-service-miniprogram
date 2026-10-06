Page({
  data: {
    intro: '',
    idCardSelected: 0,
    idCardRequired: 2,
    envSelected: 0,
    envRequired: 9,
    envMin: 1,
    envLabels: ['入口', '客厅', '睡眠区', '隔离区', '门窗阳台防护', '原住民宠物'],
    agree: false
  },
  onIntroInput(e) { this.setData({ intro: e.detail.value }) },
  uploadIdCard() {
    wx.chooseMedia && wx.chooseMedia({
      count: 2,
      mediaType: ['image'],
      success: r => this.setData({ idCardSelected: this.data.idCardSelected + r.tempFiles.length })
    }) || wx.showToast({ title: '请上传身份证正反面', icon: 'none' })
  },
  uploadEnv() {
    wx.chooseMedia && wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      success: r => this.setData({ envSelected: this.data.envSelected + r.tempFiles.length })
    }) || wx.showToast({ title: '请上传寄养环境照片', icon: 'none' })
  },
  toggleAgree() { this.setData({ agree: !this.data.agree }) },
  submit() {
    if (!this.data.agree) {
      wx.showToast({ title: '请先同意协议', icon: 'none' })
      return
    }
    if (this.data.idCardSelected < this.data.idCardRequired) {
      wx.showToast({ title: '请上传身份证正反面', icon: 'none' })
      return
    }
    if (this.data.envSelected < this.data.envMin) {
      wx.showToast({ title: '至少上传1张寄养环境', icon: 'none' })
      return
    }
    wx.showToast({ title: '认证已提交（模拟）', icon: 'success' })
  }
})