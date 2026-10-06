Page({
  data: {
    images: [
      "/images/dog1.png",
      "/images/dog2.png",
      "/images/dog3.png"
    ],
    currentIndex: 0
  },

  onSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },

  onContact() {
    wx.showModal({
      title: "联系方式",
      content: "电话：138****8888\n微信：yaluota_helper",
      showCancel: false,
      confirmText: "我知道了"
    });
  },

  onReport() {
    wx.showActionSheet({
      itemList: ["信息不实", "违规内容", "其他原因"],
      success: (res) => {
        wx.showToast({
          title: "已提交举报",
          icon: "success"
        });
      }
    });
  },

  onShare() {
    // open-type=share 会自动触发 onShareAppMessage
  },

  onShareAppMessage() {
    return {
      title: "寻狗详情 - 请帮我找到雅罗塔",
      path: "/pages/lost-detail/lost-detail"
    };
  }
});