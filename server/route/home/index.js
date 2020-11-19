const { forEach } = require('../../middleware/interface');

/*
 * @Author: your name
 * @Date: 2020-06-18 11:10:04
 * @LastEditTime: 2020-06-29 15:58:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\home\index.js
 */
module.exports = app => {
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()
    const fs = require("fs"); // 读写文件的模块
    const path = require("path") // 处理路径的模块
    const authMiddle = require('../../middleware/auth')()

    const assert = require('http-assert')
    router.get('/fetchDeviceInfo', authMiddle, async(req, res) => {
        let sql
        let results = {
            success: true,
            rep_name: [],
            rep_num: [],
            devicefenbu: [],
        }
        if (req.user.read === "查看所有") {
            // console.log('超级');
            // sql = `select ui.nickname from user_role ur inner join user_info ui on ur.user_id = ui.id where ur.role_id = 4 and ui.is_deleted = 0`
            // let r_person = await connection(sql)
            // console.log(r_person);

            // for (let i = 0; i < r_person.length; i++) {
            // sql = `select * from repair where repair_person = '${r_person[i].nickname}' and is_deleted = 0`
            sql = `select repair_person,COUNT(id) as count from repair where is_deleted = 0 GROUP by repair_person`
            let items = await connection(sql)
            items.forEach(element => {
                results.rep_name.push(element.repair_person)
                results.rep_num.push(element.count)

            });



            // }
            //查找维修记录的数目

            sql = `select * from repair where is_deleted = 0`
            let a = await connection(sql)
            results.repair = a.length
                // console.log(results.repair);

            //查找已读和未读的报警信息
            sql = `select message title,created_time date,id from alarm where is_deleted = 0 and is_handled = 0 order by ts desc`
            a = await connection(sql)
            results.unread = a
            sql = `select message title,created_time date,id from alarm where is_deleted = 0 and is_handled = 1 order by date desc`
            a = await connection(sql)
            results.read = a

            sql = `select * from device where is_on = 1 and is_deleted = 0`
            a = await connection(sql)
            results.run = a.length

            sql = `select * from device where status = '报警' and is_deleted = 0`
            a = await connection(sql)
            results.bed = a.length
                // console.log(results);

            sql = "select * from device where is_deleted = 0"
            a = await connection(sql)
            results.deviceNum = a.length

            sql = `select * from device where is_deleted=0`
            let devicelist = await connection(sql)

            devicelist.forEach(element => {
                let index1 = element.address.indexOf('省')
                let index2 = element.address.indexOf('自治区')
                if (index1 > -1) {
                    results.devicefenbu.push(element.address.slice(0, index1))
                } else if (index2 > -1) {
                    results.devicefenbu.push(element.address.slice(0, index2))
                } else if (element.address.indexOf('北京') > -1) {
                    results.devicefenbu.push('北京')
                } else if (element.address.indexOf('天津') > -1) {
                    results.devicefenbu.push('天津')
                } else if (element.address.indexOf('上海') > -1) {
                    results.devicefenbu.push('上海')
                } else if (element.address.indexOf('重庆') > -1) {
                    results.devicefenbu.push('重庆')
                } else {
                    results.devicefenbu.push('其他')
                }
            });
        } else {
            // } else {
            console.log('企业');
            sql = `select r.*,d.* from repair r left outer join device d on r.device_eq = d.eq where r.is_deleted = 0 and d.enterprise_id = ${req.user.enterprise_id}`
            let a = await connection(sql)
            results.repair = a.length

            sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq where a.is_deleted = 0 and a.is_handled = 0 and d.enterprise_id = ${req.user.enterprise_id} order by ts`
            console.log(req.user.enterprise_id);

            a = await connection(sql)
            results.unread = a
            sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq where a.is_deleted = 0 and a.is_handled = 1 and d.enterprise_id = ${req.user.enterprise_id} order by ts desc`
            a = await connection(sql)
            results.read = a
            console.log(results);

            sql = `select * from device where is_on = 1 and is_deleted = 0 and enterprise_id = ${req.user.enterprise_id}`
            a = await connection(sql)
            results.run = a.length

            sql = `select * from device where status = '报警' and is_deleted = 0 and enterprise_id = ${req.user.enterprise_id}`
            a = await connection(sql)
            results.bed = a.length

            sql = `select * from device where enterprise_id = ${req.user.enterprise_id} and is_deleted = 0`
            a = await connection(sql)
            results.deviceNum = a.length



            sql = `select * from device where is_deleted=0 and enterprise_id = ${req.user.enterprise_id}`
            let devicelist = await connection(sql)

            devicelist.forEach(element => {
                let index1 = element.address.indexOf('省')
                let index2 = element.address.indexOf('自治区')
                if (index1 > -1) {
                    results.devicefenbu.push(element.address.slice(0, index1))
                } else if (index2 > -1) {
                    results.devicefenbu.push(element.address.slice(0, index2))
                } else if (element.address.indexOf('北京') > -1) {
                    results.devicefenbu.push('北京')
                } else if (element.address.indexOf('天津') > -1) {
                    results.devicefenbu.push('天津')
                } else if (element.address.indexOf('上海') > -1) {
                    results.devicefenbu.push('上海')
                } else if (element.address.indexOf('重庆') > -1) {
                    results.devicefenbu.push('重庆')
                } else {
                    results.devicefenbu.push('其他')
                }
            });
        }

        // }
        // else if (req.user.role == 3) {
        //     console.log('普通');
        //     sql = `select * from repair r left outer join user_device ud on r.device_id = ud.device_id where r.is_deleted = 0 and ud.user_id = ${req.user.id}`
        //     let a = await connection(sql)
        //     results.repair = a.length

        //     sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq left outer join user_device ud on d.id = ud.device_id where a.is_deleted = 0 and a.is_handled = 0 and ud.user_id = ${req.user.id} order by ts`
        //         // console.log(req.user.enterprise_id);

        //     a = await connection(sql)
        //     results.unread = a
        //     sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq left outer join user_device ud on d.id = ud.device_id where a.is_deleted = 0 and a.is_handled = 1 and ud.user_id = ${req.user.id} order by ts desc`
        //     a = await connection(sql)
        //     results.read = a
        //     console.log(results);

        //     sql = `select * from device d inner join user_device ud on ud.device_id = d.id where d.is_on = 1 and d.is_deleted = 0 and ud.user_id = ${req.user.id}`
        //     a = await connection(sql)
        //     results.run = a.length

        //     sql = `select * from device d inner join user_device ud on ud.device_id = d.id where d.status = '报警' and d.is_deleted = 0 and ud.user_id = ${req.user.id}`
        //     a = await connection(sql)
        //     results.bed = a.length

        //     sql = `select * from user_device ud inner join device d on d.id = ud.device_id where ud.user_id = ${req.user.id} and is_deleted = 0`
        //     a = await connection(sql)
        //     results.deviceNum = a.length
        //     console.log(results);

        // }

        console.log(results);

        res.send(results)
    })


    app.use('/api/home', router)
}