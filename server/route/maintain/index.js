/*
 * @Author: your name
 * @Date: 2020-06-14 14:08:41
 * @LastEditTime: 2020-06-29 15:15:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\maintain\index.js
 */
module.exports = app => {
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const TimeFomart = require('../../time/time')
    const router = express.Router()
    const fs = require("fs"); // 读写文件的模块
    const path = require("path") // 处理路径的模块
    const authMiddle = require('../../middleware/auth')()
    const assert = require('http-assert')

    //获取所有设备
    router.get('/fetchEquipment', authMiddle, async (req, res) => {
        if (req.user.role === 1) {
            console.log('超级');
            sql = "select * from device where is_deleted = 0"
        } else if (req.user.role === 2) {
            console.log('企业');
            sql = `select * from device where enterprise_id = ${req.user.enterprise_id} and is_deleted = 0`
        } else {
            console.log('普通');
            sql = `select ud.user_id uid, ud.device_id did, d.eq, d.device_name,d.created_time, d.device_type, d.device_supplier, d.address,d.device_description,d.is_on,d.status,d.device_model from user_device ud inner join device d on d.id = ud.device_id where ud.user_id = ${req.user.id} and d.is_deleted = 0`
            console.log(sql);

        }
        let row = await connection(sql)
        let data = {
            success: true,
            data: row
        }
        res.send(data)
    })

    //根据设备eq获取实时数据
    router.get('/fetchPointInfo', authMiddle, async (req, res) => {
        console.log(req.query);
        let eq = req.query.eq
        let date = 10
        if (req.query.date) {
            date = req.query.date * 24 * 60 * 2

        }
        let results = {}
        results.success = true
        let sql = `select * from (select * from devicedata where eq = '${eq}' ORDER BY ts DESC limit ${date}) aa ORDER BY ts asc`

        results.info = await connection(sql)
        sql = `select * from devicedata_limit where eq = '${eq}'`
        results.delimit = await connection(sql)
        res.send(results)

    })

    //设备监控
    router.get('/fetchAlarmRecord', authMiddle, async (req, res) => {
        // let offset = (req.query.offset - 1) * 10

        let sql
        let results = {}
        results.success = true
        // console.log(offset);

        if (req.user.role == 1) {
            sql = `select *,a.created_time, a.id from alarm a left outer join device d on a.device_eq = d.eq inner join device_type dt on dt.id = d.device_type where a.is_deleted = 0 and d.is_deleted = 0 order by a.is_handled,a.ts desc`
            results.data = await connection(sql)
            // sql = `select count(*) from alarm where is_deleted = 0`
            // let a = await connection(sql)
            // results.pageTotal = a[0]['count(*)']

        } else if (req.user.role == 2) {
            sql = `select *,dt.typename,a.created_time, a.id from alarm a left outer join device d on a.device_eq = d.eq inner join device_type dt on dt.id = d.device_type where a.is_deleted = 0 and d.enterprise_id = ${req.user.enterprise_id} order by a.is_handled,a.ts desc`
            results.data = await connection(sql)

        } else if (req.user.role == 3) {
            sql = `select *,a.created_time, a.id from alarm a inner join device d on a.device_eq = d.eq inner join user_device ud on d.id = ud.device_id where a.is_deleted = 0 and ud.user_id = ${req.user.id} order by a.is_handled,a.ts desc`
            console.log(sql);
            results.data = await connection(sql)


        }
        console.log(results);
        res.send(results)
    })

    //修改报警状态
    router.post('/changeHandled', authMiddle, async (req, res) => {
        let id = req.body.id
        let sql = `update alarm set is_handled = 1 where id = ${id}`
        await connection(sql)
        let results = {
            success: true
        }
        res.send(results)
        console.log(sql);
    })

    //删除报警记录
    router.post('/deleted', authMiddle, async (req, res) => {
        let id = req.body.id
        let sql = `update alarm set is_deleted = 1 where id = ${id}`
        await connection(sql)
        let results = {
            success: true
        }
        res.send(results)
        console.log(sql);
    })

    app.use('/api/maintain', router)
}