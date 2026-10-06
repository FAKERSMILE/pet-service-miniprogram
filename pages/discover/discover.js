const app = getApp()

Page({
  data: {
    myDog: '米米',
    likeCount: 1,
    remain: 14,
    remainTotal: 20,
    // 卡片队列：第一张在最上层
    cards: [
      { id: 1, name: '代代', breed: '灰收阿拉斯加', location: '玄武区', fate: 74, tags: ['亲人','精力旺','会坐下','大体型'], emoji: '🐕', bg: 'linear-gradient(160deg,#4A5D4E 0%,#2F3E33 100%)' },
      { id: 2, name: '煤球', breed: '黑色拉布拉多', location: '鼓楼区', fate: 68, tags: ['温顺','会握手','不怕生'], emoji: '🐶', bg: 'linear-gradient(160deg,#5A6B75 0%,#39454C 100%)' },
      { id: 3, name: '年糕', breed: '白色比熊', location: '秦淮区', fate: 81, tags: ['粘人','不掉毛','会坐下'], emoji: '🐩', bg: 'linear-gradient(160deg,#8A9B7A 0%,#5C6E50 100%)' },
      { id: 4, name: '铁蛋', breed: '黄色柴犬', location: '建邺区', fate: 59, tags: ['精力旺','爱叫','亲水'], emoji: '🐕‍🦺', bg: 'linear-gradient(160deg,#9A8A5E 0%,#6B5E3E 100%)' },
      { id: 5, name: '雪碧', breed: '银色雪纳瑞', location: '栖霞区', fate: 77, tags: ['亲人','会打滚','小体型'], emoji: '🦮', bg: 'linear-gradient(160deg,#7A8A99 0%,#4E5A66 100%)' }
    ],
    // 动画状态
    swipeX: 0,        // 当前卡片位移
    rotate: 0,        // 旋转角度
    animating: false,  // 是否正在飞出动画
    flyDir: '',        // 'left' | 'right'
    dragged: false
  },

  touchStart(e) {
    if (this.data.animating) return
    this._sx = e.touches[0].clientX
    this._sy = e.touches[0].clientY
    this._dx = 0
    this.setData({ dragged: false })
  },

  touchMove(e) {
    if (this.data.animating) return
    const dx = e.touches[0].clientX - this._sx
    const dy = e.touches[0].clientY - this._sy
    // 水平意图大于垂直才拖卡
    if (Math.abs(dx) > Math.abs(dy)) {
      this._dx = dx
      this.setData({
        swipeX: dx,
        rotate: dx / 18,
        dragged: true
      })
    }
  },

  touchEnd() {
    if (this.data.animating) return
    const dx = this._dx || 0
    if (dx > 60) {
      this.flyOut('right')
    } else if (dx < -60) {
      this.flyOut('left')
    } else {
      // 回弹
      this.setData({ swipeX: 0, rotate: 0 })
    }
  },

  // 按钮触发：不感兴趣
  onTapPass() { this.flyOut('left') },
  // 按钮触发：加入喜欢
  onTapLike() { this.flyOut('right') },
  // 按钮触发：查看档案
  onViewProfile() {
    const top = this.data.cards[0]
    if (top) wx.navigateTo({ url: '/pages/pet-detail/pet-detail?name=' + top.name })
  },
  // 喜欢列表
  goLikeList() { wx.showToast({ title: '喜欢列表（' + this.data.likeCount + '）', icon: 'none' }) },

  flyOut(dir) {
    if (this.data.animating || !this.data.cards.length) return
    this.setData({ animating: true, flyDir: dir })
    const W = 375
    const x = dir === 'right' ? W * 1.6 : -W * 1.6
    setTimeout(() => {
      const cards = this.data.cards.slice(1)
      const liked = dir === 'right'
      this.setData({
        cards,
        swipeX: 0,
        rotate: 0,
        animating: false,
        flyDir: '',
        dragged: false,
        likeCount: this.data.likeCount + (liked ? 1 : 0),
        remain: Math.max(0, this.data.remain - 1)
      })
      if (liked) wx.showToast({ title: '已加入喜欢 ❤️', icon: 'none', duration: 800 })
      else wx.showToast({ title: '已跳过', icon: 'none', duration: 600 })
      if (!cards.length) {
        // 重置卡组
        setTimeout(() => this.resetDeck(), 1200)
      }
    }, 320)
  },

  resetDeck() {
    this.setData({
      cards: [
        { id: 1, name: '代代', breed: '灰收阿拉斯加', location: '玄武区', fate: 74, tags: ['亲人','精力旺','会坐下','大体型'], emoji: '🐕', bg: 'linear-gradient(160deg,#4A5D4E 0%,#2F3E33 100%)' },
        { id: 2, name: '煤球', breed: '黑色拉布拉多', location: '鼓楼区', fate: 68, tags: ['温顺','会握手','不怕生'], emoji: '🐶', bg: 'linear-gradient(160deg,#5A6B75 0%,#39454C 100%)' },
        { id: 3, name: '年糕', breed: '白色比熊', location: '秦淮区', fate: 81, tags: ['粘人','不掉毛','会坐下'], emoji: '🐩', bg: 'linear-gradient(160deg,#8A9B7A 0%,#5C6E50 100%)' },
        { id: 4, name: '铁蛋', breed: '黄色柴犬', location: '建邺区', fate: 59, tags: ['精力旺','爱叫','亲水'], emoji: '🐕‍🦺', bg: 'linear-gradient(160deg,#9A8A5E 0%,#6B5E3E 100%)' },
        { id: 5, name: '雪碧', breed: '银色雪纳瑞', location: '栖霞区', fate: 77, tags: ['亲人','会打滚','小体型'], emoji: '🦮', bg: 'linear-gradient(160deg,#7A8A99 0%,#4E5A66 100%)' }
      ]
    })
    wx.showToast({ title: '今天也没有更多狗狗啦，已为你刷新', icon: 'none' })
  }
})