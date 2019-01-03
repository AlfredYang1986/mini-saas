// component/common/brand-card/brand-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: "Array",
            value: [],
            observer: function (news, olds, path) {
                console.log(news)
                this.setData({
                    list: news
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo.png",
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showBrandDetail: function (event) {
            wx.navigateTo({
                url: '/pages/brand/info/info',
            })

            wx.setStorage({
                key: "brandid",
                data: event.currentTarget.dataset.brandid
            })
        }
    }
})
