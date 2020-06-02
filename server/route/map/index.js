/*
 * @Author: your name
 * @Date: 2020-06-01 11:31:14
 * @LastEditTime: 2020-06-01 16:12:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \远程监控平台\server\route\map\index.js
 */
module.exports = app => {
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()

    router.get('/fetchDeviceNum', async (req, res) => {
        let sql = "select COUNT(*) from device"
        connection.query(sql, (err, results) => {
            if (err) throw err
            let data = {
                success: true,
                data: results[0]['COUNT(*)']
            }
            res.status(200).send(data)
        })
        // res.send('hahah')
    })

    router.get('/fetchDeviceAddress', async (req, res) => {
        let sql = "select eq,address from device"
        connection.query(sql, (err, results) => {
            if (err) throw err
            let data = {
                success: true,
                data: results
            }
            res.status(200).send(data)
        })
    })

    //获取所有设备数据
    router.get('/fetchAllDevice', async (req, res) => {
        let sql = "select * from device"
        connection.query(sql, (err, results) => {
            if (err) throw err
            let data = {
                success: true,
                data: results
            }
            res.status(200).send(data)
        })
        // res.send('hahah')
    })
    app.use('/api/map', router)
}