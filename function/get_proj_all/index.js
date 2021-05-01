// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()

    // return {
    //     event,
    //     openid: wxContext.OPENID,
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }
    const db = cloud.database()
    const _ = db.command
    const $ = db.command.aggregate
    const data = await db.collection('project').aggregate().match({
        _id: event.pid
    }).lookup({
      from: 'task',
      let:{
        project_id: '$_id'
      },
      pipeline: $.pipeline()
      .match(_.expr($.and([
        $.eq(['$pid','$$project_id']),
        $.eq(['$done',true])
      ]))).done(),
      as: 'done_tasks',
    })
    .lookup({
      from: 'task',
      let:{
        project_id: '$_id'
      },
      pipeline: $.pipeline()
      .match(_.expr($.and([
        $.eq(['$pid','$$project_id']),
        $.eq(['$done',false])
      ]))).done(),
      as: 'undone_tasks',
    }).lookup({
        from: 'member',
        localField: '_id',
        foreignField: 'pid',
        as: 'portraits'
    }).end()
    // .then(res=>{
    //   console.log(res);
    // }).catch(err => console.error('查询出错',err))
    return {data}
}