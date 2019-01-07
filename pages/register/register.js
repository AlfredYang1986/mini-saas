// pages/info-two/info-two.js 
var OSS = require('../../models/ali-oss.js')

//导入模块：组件wechatlogin
const loginComponent = require('../../component/auth/wechatlogin.js');
//合并导入模块
Page(Object.assign({}, loginComponent,{
  /**
  * 页面的初始数据
  */
  data: {
    modalHidden: true,
    logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/%E6%AC%A2%E8%BF%8E%E9%A1%B5logo%E6%9B%BF%E6%8D%A2.png",
    slogan: "百造学堂，一百种方法玩转知识",
    showModalStatus: true,
    subLogo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_dongdalogo26%403x.png"
  },

  /**
  * 生命周期函数--监听页面加载
  */
onLoad: function (options) {
    let tmp = options.redir
    console.log('tmp: ', tmp)
    if (tmp) {
        wx.setStorageSync('qr_page', tmp)
    }
    let tid = options.reservableid
    console.log('tid: ', tid)
    if (tid) {
        wx.setStorageSync('qr_page_id', tid)
    }
    let brandid = options.brandid
    if (brandid) {
        wx.setStorageSync('brandid', brandid)
    }

    let client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAINO7wSDoWJRfN',
        accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
        bucket: 'bmsass'
    });
    let that = this;
    let callback = {
        onSuccess: function (res) {
            let newres = res.map((ele) => {
                let logo = ele.logo;
                ele.dealLogo = client.signatureUrl(logo);
                return ele
            })
            that.setData({
                brandList: res
            })
        },
        onFail: function () {
            // TODO : 报错 ...
        }
    }
    var bmbrand = require('../../models/bm_brand_schema.js')
    console.log(bmbrand)
    bmbrand.queryMultiBrands(callback)

    wx.stopPullDownRefresh();
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {

  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {

  },

  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {

  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {

  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (event) {
    
  },

showBrandDetail: function (event) {
    wx.navigateTo({
        url: '/pages/brand/info/info',
    })
},


})
)