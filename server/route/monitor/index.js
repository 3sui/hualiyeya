/*
 * @Author: your name
 * @Date: 2020-06-17 09:21:33
 * @LastEditTime: 2020-06-17 15:50:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\monitor\index.js
 */
module.exports = app => {
    const connection = require('../../mysql/mysql')()

    async function monitor() {
        let results = {}
        let sql = `select * from devicedata where is_s = 0`
        let a = await connection(sql)
        sql = 'select * from devicedata_limit'
        let b = await connection(sql)

        a.forEach(async aItem => {
            sql = `update devicedata set is_s = 1 where id = '${aItem.id}'`
            await connection(sql)
            let arr = b.filter(bItem => {
                return bItem.eq == aItem.eq
            })
            arr.forEach(async cItem => {
                if (aItem[cItem.cp_id] * cItem.k > cItem.limit_up) {
                    // console.log(`${aItem.eq}设备的${cItem.cp_name}在${aItem.ts}时候超过上限值${cItem.limit_up}, 值为${aItem[cItem.cp_id] * cItem.k}`)
                    sql = `insert into alarm (device_eq, devicedata_id, cp_name, cp_value, message, limit_up, limit_down, ts) values ('${aItem.eq}', ${aItem.id}, '${cItem.cp_name}', ${aItem[cItem.cp_id] * cItem.k}, '${`${aItem.eq}设备的${cItem.cp_name}在${aItem.ts}时候超过上限值${cItem.limit_up}, 值为${aItem[cItem.cp_id] * cItem.k}`}', '${cItem.limit_up}', '${cItem.limit_down}', '${aItem.ts}')`
                    console.log(sql);

                    await connection(sql)
                    console.log(sql);
                }
                if (aItem[cItem.cp_id] * cItem.k < cItem.limit_down) {
                    // console.log(`${aItem.eq}设备的${cItem.cp_name}在${aItem.ts}时候低于下限值${cItem.limit_down}, 值为${aItem[cItem.cp_id] * cItem.k}`)
                    sql = `insert into alarm (device_eq, devicedata_id, cp_name, cp_value, message, limit_up, limit_down, ts) values ('${aItem.eq}', ${aItem.id}, '${cItem.cp_name}', ${aItem[cItem.cp_id] * cItem.k}, '${`${aItem.eq}设备的${cItem.cp_name}在${aItem.ts}时候低于下限值${cItem.limit_down}, 值为${aItem[cItem.cp_id] * cItem.k}`}', '${cItem.limit_up}', '${cItem.limit_down}', '${aItem.ts}')`
                    await connection(sql)
                    console.log(sql);
                }
            })
        });
    }
    monitor()
}