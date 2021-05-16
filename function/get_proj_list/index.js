// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db = cloud.database()
    const _ = db.command
    const $ = db.command.aggregate
    const data = await db.collection('member').aggregate().match({
        //_id: event.pid
        _openid: event.oid
    })
    .lookup({
        from: 'project',
        localField: 'pid',
        foreignField: '_id',
        as: 'information'
    })
    .lookup({
        from: 'member',
        localField: 'pid',
        foreignField: 'pid',
        as: 'portraits'
    }).end()
    return {data}
}