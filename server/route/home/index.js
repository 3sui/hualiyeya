/*
 * @Author: your name
 * @Date: 2020-06-18 11:10:04
 * @LastEditTime: 2020-06-18 20:41:51
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
    router.get('/fetchDeviceInfo', authMiddle, async (req, res) => {
        let sql
        let results = {
            success: true
        }
        if (req.user.role == 1) {
            console.log('超级');
            sql = `select * from repair where is_deleted = 0`
            let a = await connection(sql)
            results.repair = a.length
            console.log(results.repair);

            sql = `select message title,created_time date,id from alarm where is_deleted = 0 and is_handled = 0`
            a = await connection(sql)
            results.unread = a
            sql = `select message title,created_time date,id from alarm where is_deleted = 0 and is_handled = 1`
            a = await connection(sql)
            results.read = a

            sql = `select * from device where is_on = 1 and is_deleted = 0`
            a = await connection(sql)
            results.run = a.length

            sql = `select * from device where status = '报警' and is_deleted = 0`
            a = await connection(sql)
            results.bed = a.length
            console.log(results);

            sql = "select * from device where is_deleted = 0"
            a = await connection(sql)
            results.deviceNum = a.length

        } else if (req.user.role == 2) {
            console.log('企业');
            sql = `select r.*,d.* from repair r left outer join device d on r.device_id = d.id where r.is_deleted = 0 and d.enterprise_id = ${req.user.enterprise_id}`
            let a = await connection(sql)
            results.repair = a.length

            sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq where a.is_deleted = 0 and a.is_handled = 0 and d.enterprise_id = ${req.user.enterprise_id}`
            console.log(req.user.enterprise_id);

            a = await connection(sql)
            results.unread = a
            sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq where a.is_deleted = 0 and a.is_handled = 1 and d.enterprise_id = ${req.user.enterprise_id}`
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
            console.log(results);

        } else if (req.user.role == 3) {
            console.log('普通');
            sql = `select * from repair r left outer join user_device ud on r.device_id = ud.device_id where r.is_deleted = 0 and ud.user_id = ${req.user.id}`
            let a = await connection(sql)
            results.repair = a.length

            sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq left outer join user_device ud on d.id = ud.device_id where a.is_deleted = 0 and a.is_handled = 0 and ud.user_id = ${req.user.id}`
            // console.log(req.user.enterprise_id);

            a = await connection(sql)
            results.unread = a
            sql = `select message title,a.created_time date,a.id from alarm a left outer join device d on a.device_eq = d.eq left outer join user_device ud on d.id = ud.device_id where a.is_deleted = 0 and a.is_handled = 1 and ud.user_id = ${req.user.id}`
            a = await connection(sql)
            results.read = a
            console.log(results);

            sql = `select * from device d inner join user_device ud on ud.device_id = d.id where d.is_on = 1 and d.is_deleted = 0 and ud.user_id = ${req.user.id}`
            a = await connection(sql)
            results.run = a.length

            sql = `select * from device d inner join user_device ud on ud.device_id = d.id where d.status = '报警' and d.is_deleted = 0 and ud.user_id = ${req.user.id}`
            a = await connection(sql)
            results.bed = a.length

            sql = `select * from user_device ud inner join device d on d.id = ud.device_id where ud.user_id = ${req.user.id} and is_deleted = 0`
            a = await connection(sql)
            results.deviceNum = a.length
            console.log(results);

        }
        res.send(results)
    })


    app.use('/api/home', router)
}