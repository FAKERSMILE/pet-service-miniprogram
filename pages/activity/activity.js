Page({
  data: {
    location: { city: '南京', district: '建邺区' },
    totalActivities: 39,
    filterTabs: [
      { key: 'all',     label: '全部' },
      { key: 'meetup',  label: '聚会' },
      { key: 'walk',    label: '遛狗' },
      { key: 'training',label: '训练' },
      { key: 'rescue',  label: '公益' }
    ],
    activeTab: 'all',
    activities: [
      {
        id: 1,
        title: '9.26狗友假日聚',
        cat: 'meetup',
        status: '报名中',
        statusType: 'open',
        date: '2026-09-26',
        timeStart: '08:00',
        timeEnd: '20:00',
        location: '南京·六合区·四季宠町宠物公园',
        host: '小七', hostColor: '#3B6CFF',
        signed: 0, total: 200,
        cover: '#FFB997'
      },
      {
        id: 2,
        title: '城西柯基郊游日',
        cat: 'walk',
        status: '即将开始',
        statusType: 'soon',
        date: '2026-09-28',
        timeStart: '09:00', timeEnd: '17:00',
        location: '南京·鼓楼区·古林公园',
        host: '阿明', hostColor: '#52B788',
        signed: 38, total: 80,
        cover: '#FFE4A0'
      },
      {
        id: 3,
        title: '夜间遛狗分享会',
        cat: 'training',
        status: '报名中',
        statusType: 'open',
        date: '2026-10-02',
        timeStart: '19:00', timeEnd: '21:00',
        location: '南京·建邺区·河西中央公园',
        host: '糖糖', hostColor: '#F59E0B',
        signed: 12, total: 50,
        cover: '#D4A373'
      },
      {
        id: 4,
        title: '公益寻狗志愿日',
        cat: 'rescue',
        status: '已结束',
        statusType: 'end',
        date: '2026-09-10',
        timeStart: '08:00', timeEnd: '18:00',
        location: '南京·江宁区·周村',
        host: '小川', hostColor: '#9A9A9A',
        signed: 35, total: 50,
        cover: '#EFEFEF'
      }
    ],
    filteredActivities: []
  },
  onLoad() { this.applyFilter('all') },
  onShow() { this.syncTabBar() },
  syncTabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },
  switchLocation() {
    wx.showActionSheet({
      itemList: ['建邺区', '鼓楼区', '玄武区', '秦淮区', '六合区', '江宁区'],
      success: r => {
        const list = ['建邺区','鼓楼区','玄武区','秦淮区','六合区','江宁区']
        this.setData({ 'location.district': list[r.tapIndex] })
      }
    })
  },
  switchTab(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ activeTab: key })
    this.applyFilter(key)
  },
  applyFilter(key) {
    const list = key === 'all'
      ? this.data.activities
      : this.data.activities.filter(a => a.cat === key)
    this.setData({ filteredActivities: list })
  },
  createActivity() {
    wx.showModal({
      title: '发起活动',
      editable: true,
      placeholderText: '输入活动标题，如：周末滨江遛狗局',
      success: (r) => {
        if (!r.confirm) return
        const title = (r.content || '').trim()
        if (!title) {
          wx.showToast({ title: '活动标题不能为空', icon: 'none' })
          return
        }
        const today = new Date()
        const pad = n => (n < 10 ? '0' + n : '' + n)
        const date = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate())
        const id = this.data.activities.reduce((m, a) => Math.max(m, a.id), 0) + 1
        const activity = {
          id,
          title,
          cat: 'meetup',
          status: '报名中',
          statusType: 'open',
          date,
          timeStart: '08:00',
          timeEnd: '20:00',
          location: this.data.location.city + '·' + this.data.location.district,
          host: '我', hostColor: '#2D6A4F',
          signed: 1, total: 30,
          cover: '#B7E4C7'
        }
        const activities = [activity].concat(this.data.activities)
        this.setData({
          activities,
          totalActivities: this.data.totalActivities + 1
        })
        this.applyFilter(this.data.activeTab)
        wx.showToast({ title: '发布成功', icon: 'success' })
      }
    })
  },
  openActivity(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '活动 #' + id + ' 详情', icon: 'none' })
  }
})