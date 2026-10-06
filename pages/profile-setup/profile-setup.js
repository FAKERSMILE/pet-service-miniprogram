Page({
  data: {
    avatarColor: '#3B6CFF',
    avatarText: '我',
    avatarUrl: '',
    nickName: 'Yuan',
    city: '南京',
    location: '',
    photo: ''
  },
  onChooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ avatarUrl: res.tempFiles[0].tempFilePath, avatarText: '' })
      }
    })
  },
  onChooseNickName(e) {
    this.setData({ nickName: e.detail.value })
  },
  onChoosePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ photo: res.tempFiles[0].tempFilePath })
      }
    })
  },
  onChooseCity() {
    wx.showToast({ title: '选择城市开发中', icon: 'none' })
  },
  onChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({ location: res.name || res.address })
      },
      fail: () => {}
    })
  },
  onComplete() {
    wx.switchTab({ url: '/pages/home/home' })
  }
})