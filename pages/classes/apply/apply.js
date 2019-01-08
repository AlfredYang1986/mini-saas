// pages/activity/apply/apply.js
let nickname;
let name;
let dob;
let gender;
let guardian_role;
let contact;
let except_time;
let kids;
let kid;
let address;
let detailSort;
let detailName;
let yardname;
let haveChild = true;
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
    deleteImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_delete%20copy%402x.png",
    kids: null,
    nowDate: '',
    haveChild: true,
    exp_date: '',
    phone: wx.getStorageSync('dd_phoneno'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lm = require('../../../models/bm_applyee_schema.js');
    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }

    let ks = require('../../../models/bm_kids_schema.js');
    ks.bmstoreReset();
    wx.removeStorageSync('kids');
    yardname = wx.getStorageSync('yardname');
    detailSort = wx.getStorageSync('detailSort');
    detailName = wx.getStorageSync('detailName');
    let yard = [];
    yard.push(yardname);
    let date = this.getNowFormatDate();
    haveChild = true;
    this.setData({
      address: yard,
      nowDate: date,
      haveChild: true,
        bar: wx.getStorageSync('mername')
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
    nickname = undefined;
    dob = undefined;
    gender = undefined;
    nickname = undefined;
    except_time = undefined;
    guardian_role = undefined;
    kids = null;
    contact = wx.getStorageSync('dd_phoneno');
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

  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  // 显示遮罩层
  showPlace: function () {
    var that = this;
    that.setData({
      hidePlace: false
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

  showTime: function () {
    var that = this;
    that.setData({
      hideTime: false
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



  addChild: function () {
    if (haveChild) {
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
    } else {
      console.log("请先删除当前孩子")
    }

  },

  // 隐藏遮罩层
  hidePlace: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hidePlace: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

  hideTime: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideTime: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

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
      exp_date: e.detail.value
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

  deleteChild: function (e) {
    let ks = require('../../../models/bm_kids_schema.js');
    ks.bmstoreReset()
    haveChild = true;
    kids = null;
    this.setData({
      kids: null,
      haveChild: true
    })
  },

  queryAttendedKids: function () {
    let ks = require('../../../models/bm_kids_schema.js');
    // let kids = ks.queryAllLocalKids();
    // if (kids.length == 0) {
    let that = this;
    if (nickname != undefined && nickname != '' && dob != undefined && gender != undefined && guardian_role != undefined && guardian_role != null) {
      ks.genOneKid(nickname, 'realnickname', dob, gender, guardian_role)
      ks.saveAllKidOnStorage();
      kids = ks.queryAllLocalKids();
      console.log(kids)
      let data = [];
      kids.map((ele) => {
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
        haveChild = false;
        kids = data;
        that.setData({
          kids: data,
          haveChild: false
        })
      })
    } else {
      wx.showModal({
        title: '添加失败',
        content: '还有没填好的地方哦',
        success: function (res) {
          if (res.confirm) {
            that.addChild();
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    // }
    // kids = kids
    // return kids
  },

  onCommitApply: function (e) {
    let that = this;
    if (except_time != undefined && detailName != undefined && contact != undefined && contact != '' && detailSort != undefined && kids != undefined) {
      let callback = {
        onSuccess: function (res) {
          // setTimeout(wx.navigateBack({
          //   delta: 1
          // }), 2000) 
        
          wx.navigateBack({
            delta: 1,
            success: function () {
              wx.showToast({
                title: '将尽快联系您！',
                icon: 'success',
                duration: 2000,
                mask: true,
              })
            }
          })
        },
        onFail: function () {
          console.log('push apply error');
        }
      }
      // kid = [];
      // let ks = require('../../../models/bm_kids_schema.js');
      // let selectedKid = ks.queryLocalKidByID(e.detail.value)
      // kid.push(selectedKid);
      var ay = require('../../../models/bm_apply_schema.js');
      ay.pushApply(except_time, detailName, contact, detailSort, kids, callback);
    } else {
      wx.showModal({
        title: '提交失败',
        content: '还有没填好的地方哦',
        success: function (res) {
          if (res.confirm) {

          } else {

          }

        }
      })
    }

  },
  // TODO: 这是一个假的，你需要从你的输入中读取这些值

})