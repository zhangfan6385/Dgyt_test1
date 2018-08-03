import Mock from 'mockjs'

const configList = []
configList.push(Mock.mock({
    sysname: [{
        'CONF_VALE': '大港研发'
    }],
    copyright: [{
        'CONF_VALE': '大港研发'
    }],
    cloudorg: true,
    itemtype: [
        { 'key': 'ptr', 'user_code': 'PTR' }
    ]
}))


export default {
    GetTitle: config => {
        return {
            total: configList.length,
            items: configList,
            code: 2000,
            message: '查询成功'
        }
    }
}
