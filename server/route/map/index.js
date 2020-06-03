/*
 * @Author: your name
 * @Date: 2020-06-01 11:31:14
 * @LastEditTime: 2020-06-03 11:11:21
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
        let sql = "select COUNT(*) from device"
        let row = await connection(sql)
        let data = {
            success: true,
            data: row[0]['COUNT(*)']
        }
        // console.log(row);

        res.status(200).send(data)

    })

    //获取所有设备数据
    router.get('/fetchAllDevice', authMiddle, async (req, res) => {
        let sql = "select * from device"
        let row = await connection(sql)
        let data = {
            success: true,
            data: row
        }
        res.status(200).send(data)
        // console.log(row);
    })
    app.use('/api/map', router)
}