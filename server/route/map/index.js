/*
 * @Author: your name
 * @Date: 2020-06-01 11:31:14
 * @LastEditTime: 2020-06-29 15:59:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \远程监控平台\server\route\map\index.js
 */
module.exports = app => {
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()
    const authMiddle = require('../../middleware/auth')()


    //获取设备数量
    router.get('/fetchDeviceNum', authMiddle, async (req, res) => {
        let sql
        if (req.user.role === 1 || req.user.role === 4) {
            console.log('超级');
            sql = "select COUNT(*) from device where is_deleted = 0"
        } else if (req.user.role === 2) {
            console.log('企业');
            sql = `select COUNT(*) from device where enterprise_id = ${req.user.enterprise_id} and is_deleted = 0`
        } else {
            console.log('普通');
            sql = `select COUNT(*) from user_device ud inner join device d on d.id = ud.device_id where ud.user_id = ${req.user.id} and is_deleted = 0`
        }

        let row = await connection(sql)
        let data = {
            success: true,
            data: row[0]['COUNT(*)']
        }
        console.log(row);

        res.status(200).send(data)

    })

    //获取所有设备数据
    router.get('/fetchAllDevice', authMiddle, async (req, res) => {
        let sql
        if (req.user.role === 1 || req.user.role === 4) {
            console.log('超级');
            sql = "select d.*,u.username from device d left outer join user_info u on d.principal = u.id where d.is_deleted = 0"
        } else if (req.user.role === 2) {
            console.log('企业');
            sql = `select *,d.id from device d inner join user_info u on d.principal = u.id where d.enterprise_id = ${req.user.enterprise_id} and d.is_deleted = 0`
        } else {
            console.log('普通');
            sql = `select ud.*,d.*,d.id from user_device ud inner join device d on d.id = ud.device_id inner join user_info u on d.principal = u.id where ud.user_id = ${req.user.id} and d.is_deleted = 0`
        }
        let row = await connection(sql)
        let data = {
            success: true,
            data: row
        }
        res.status(200).send(data)
        // console.log(row);
    })

    //获取设备图片
    router.get('/fetchImgList', authMiddle, async (req, res) => {
        let id = req.query.id
        console.log(id);

        let results = {}
        let sql = `select * from file_store where device_id = '${id}'`
        results.success = true
        results.list = await connection(sql)
        res.send(results)
    })
    app.use('/api/map', router)
}