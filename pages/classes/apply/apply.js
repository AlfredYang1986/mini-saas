// pages/activity/apply/apply.js
let nickname;
let name;
let dob;
let gender;
let guardian_role;
let contact;
let course_name;
let except_time;
let classkids;
let kid;
let address;
let detailSort = wx.getStorageSync('detailSort');
let detailName = wx.getStorageSync('detailName');
let yardname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidePlace: true, //模态框的状态  true-隐藏  false-显示
    hideTime: true,
    hideChild: true,
    animationData: {},
    array: ['女', '男'],
    address: null,
    items: [
      { name: '妈妈', value: '妈妈', },
      { name: '爸爸', value: '爸爸', },
      { name: '其他', value: '其他' },
    ],
    checkItems: [
      { name: 'USA', value: '美国', check: true },
      { name: 'CHN', value: '中国' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    classkids: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.removeStorageSync('kids');
    yardname = wx.getStorageSync('yardname');
    let yard = [];
    yard.push(yardname);
    this.setData({
      address: yard,
    })
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
    classkids = [];
    let ks = require('../../../models/bm_kids_schema.js');
    ks.bmstoreReset();
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
  onShareAppMessage: function () {

  },
  /* 显示遮罩层 */

  addChild: function () {
    var that = this;
    that.setData({
      hideChild: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideChild: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideChild: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    gender = parseInt(e.detail.value);
    console.log(gender)
  },

  bindAddressChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    address = e.detail.value
    console.log(address)
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    dob = new Date(e.detail.value).getTime();
    console.log(dob)
  },

  bindExceptDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    let except_dob = new Date(e.detail.value).getTime();
    except_time = except_dob;
    console.log(except_time)
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    guardian_role = e.detail.value

  },

  selectChildChange: function (e) {
    kid = [];
    let ks = require('../../../models/bm_kids_schema.js');
    let selectedKid = ks.queryLocalKidByID(e.detail.value)
    kid.push(selectedKid);
    console.log(kid)
  },

  checkboxChange: function (e) {
    console.log(e.detail.value)
  },


  bindKeyInput: function (e) {
    nickname = e.detail.value;
    console.log(nickname)
  },

  inputTel: function (e) {
    contact = e.detail.value;
    console.log(contact)
  },

  queryAttendedKids: function () {
    let ks = require('../../../models/bm_kids_schema.js');
    // let kids = ks.queryAllLocalKids();
    // if (kids.length == 0) {
    ks.genOneKid(nickname, 'nickname', dob, gender, guardian_role)
    ks.saveAllKidOnStorage();
    classkids = ks.queryAllLocalKids();
    console.log("this is query local classkids")
    console.log(classkids)
    
    let data = [];
    let that = this;
    classkids.map((ele) => {
      let dob = new Date(ele.dob);
      let dn = new Date();
      let age = dn.getFullYear() - dob.getFullYear();
      ele.age = age;

      let gender = ele.gender;
      console.log('this is gender' + gender)
      if (gender == 0) {
        ele.genders = '女'
      } else if (gender == 1) {
        ele.genders = '男'
      }
      data.push(ele);
      that.setData({
        classkids: data
      })
    })
    // }
    // return kids
  },

  onCommitApply: function (event) {
    // let kids = this.queryAttendedKids();
    console.log(event)
    let childid = event.currentTarget.dataset.childid;
    let callback = {
      onSuccess: function (res) {
        console.log('push apply success');
        console.log(res)

        // wx.navigateTo({
        //   url: '/pages/activity/detail/detail?childid=' + childid,
        // })
      },
      onFail: function () {
        console.log('push apply error');
      }
    }
    var ay = require('../../../models/bm_apply_schema.js');
    ay.pushApply(except_time, detailName, contact, detailSort, kid, callback);

  },
  // TODO: 这是一个假的，你需要从你的输入中读取这些值

})