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
            let brandid = event.currentTarget.dataset.brandid;
            let bmconfig = require('../../../models/bm_config.js');
            bmconfig.bm_baizao_id = brandid;
            wx.switchTab({
                url: '/pages/brand/info/info',
            })
        }
    }
})
