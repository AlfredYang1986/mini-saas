// component/common/navigation-bar/navigation-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        noback: {
            type: String,
            value: 'false',
        },
        title: {
            type: "String",
            value: '',
            observer: function (news, olds, path) {
                console.log(news)
                this.setData({
                    title: news
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        backIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_back_light%402x.png",
        title: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        backTo: function () {
            wx.navigateBack({
                delta: 1
            })
        }
    }
})
