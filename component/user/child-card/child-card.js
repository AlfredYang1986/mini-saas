// component/user/child-card/child-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        kids: {
            type: Array,
            value: [],
            observer: function (news, olds, path) {
                let that = this;
                if(news != null && news.length != 0) {
                    news.map((ele) => {
                        if (ele.gender == 0) {
                            that.setData({
                                sex: "女",
                            })
                        } else if (ele.gender == 1) {
                            that.setData({
                                sex: '男',
                            })
                        } else {
                            that.setData({
                                sex: '未知'
                            })
                        }

                        let dob = new Date(ele.dob);
                        let dn = new Date();
                        let res_age = dn.getFullYear() - dob.getFullYear();
                        that.setData({
                            age: res_age
                        })
                    }) 
                    that.setData({
                        noValue: false,
                        child: news,
                    })
                } else {
                    that.setData({
                        noValue: true
                    })
                }
                
                
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        noValue: false,
        sex: '',
        age: '',
        icon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_chevron_right_dark%402x.png",
        child: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addChild: function (event) {
            let childid = event.currentTarget.dataset.childid;
            wx.navigateTo({
              url: '/pages/booking/appointment/addkid/addkid?wherefrom=managerkids&&candel=1&childid=' + childid
            })
        }
    }
})
