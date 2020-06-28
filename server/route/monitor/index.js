/*
 * @Author: your name
 * @Date: 2020-06-17 09:21:33
 * @LastEditTime: 2020-06-28 02:55:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\monitor\index.js
 */
module.exports = app => {
    console.log('aaa');

    const connection = require('../../mysql/mysql')()
    const {
        Todate
    } = require('../../time/time')


    async function monitor() {
        let results = {}
        let sql = `select * from devicedata where is_s = 0`
        let a = await connection(sql)
        // console.log(a)
        if (a.length == 0) {
            console.log(a)

            sql = `update device set is_on = 0, status = '无状态' where is_deleted = 0`
            await connection(sql)
            return
        }
        //获取所有设备eq
        sql = `select eq from device where is_deleted = 0`
        let c = await connection(sql)
        // console.log(c);


        sql = 'select * from devicedata_limit where is_deleted = 0'
        let b = await connection(sql)
        let openD = []

        a.forEach(async aItem => {

            c.forEach(item => {


                if (item.eq == aItem.eq) {
                    openD.push(item.eq)
                }

            })
            for (var i = 0; i < openD.length; i++) {
                for (var j = i + 1; j < openD.length; j++) {
                    if (openD[i] == openD[j]) { //第一个等同于第二个，splice方法删除第二个
                        openD.splice(j, 1);
                        j--;
                    }
                }
            }
            // openD = ['01', '02']
            // console.log(openD);
            console.log(openD, '22222222222222222222222222');

            openD.forEach(async item => {
                console.log(item);

                sql = `update device set is_on = 1 where eq = '${item}' and is_deleted = 0`
                console.log(sql);

                await connection(sql)

                sql = `update device set status = '无状态' where eq not in ('${item}') and is_deleted = 0`

                await connection(sql)


            })



            sql = `update devicedata set is_s = 1 where id = '${aItem.id}'`
            console.log(sql);

            await connection(sql)
            let arr = b.filter(bItem => {
                return bItem.eq == aItem.eq
            })
            console.log(arr);

            arr.forEach(async cItem => {

                sql = `update device set status = '正常' where eq = '${cItem.eq}' and is_deleted = 0`
                console.log(sql, 90);

                await connection(sql)

                if (aItem[cItem.cp_id] * cItem.k > cItem.limit_up) {
                    // console.log(`${aItem.eq}设备的${cItem.cp_name}在${aItem.ts}时候超过上限值${cItem.limit_up}, 值为${aItem[cItem.cp_id] * cItem.k}`)
                    sql = `insert into alarm (device_eq, devicedata_id, cp_name, cp_value, message, limit_up, limit_down, ts) values ('${aItem.eq}', ${aItem.id}, '${cItem.cp_name}', ${aItem[cItem.cp_id] * cItem.k}, '${`${aItem.eq}设备的${cItem.cp_name}在${Todate(+aItem.ts)}时候超过上限值${cItem.limit_up}, 值为${aItem[cItem.cp_id] * cItem.k}`}', '${cItem.limit_up}', '${cItem.limit_down}', '${aItem.ts}')`
                    // console.log(sql);

                    await connection(sql)
                    sql = `update device set status = '报警' where eq = '${aItem.eq}' and is_deleted = 0`
                    console.log(sql);
                    await connection(sql)


                }
                if (aItem[cItem.cp_id] * cItem.k < cItem.limit_down) {
                    // console.log(`${aItem.eq}设备的${cItem.cp_name}在${aItem.ts}时候低于下限值${cItem.limit_down}, 值为${aItem[cItem.cp_id] * cItem.k}`)
                    sql = `insert into alarm (device_eq, devicedata_id, cp_name, cp_value, message, limit_up, limit_down, ts) values ('${aItem.eq}', ${aItem.id}, '${cItem.cp_name}', ${aItem[cItem.cp_id] * cItem.k}, '${`${aItem.eq}设备的${cItem.cp_name}在${Todate(+aItem.ts)}时候低于下限值${cItem.limit_down}, 值为${aItem[cItem.cp_id] * cItem.k}`}', '${cItem.limit_up}', '${cItem.limit_down}', '${aItem.ts}')`
                    await connection(sql)
                    console.log(sql, '------------------------------');
                    sql = `update device set status = '报警' where eq = '${aItem.eq}' and is_deleted = 0`
                    await connection(sql)
                }
            })
        });
    }
    // monitor()

    setInterval(() => {
        monitor()
    }, 120000);

    // monitor()

}