/*
 * @Author: your name
 * @Date: 2020-06-02 10:34:44
 * @LastEditTime: 2020-06-08 14:17:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\deviceRecord\index.js
 */
module.exports = app => {
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()
    const jwt = require('jsonwebtoken')
    const authMiddle = require('../../middleware/auth')()

    //获取所有设备信息
    //超级管理员可以看到所有设备
    //企业管理员可以看到所在企业的设备
    //企业用户能看到自己管理的设备
    router.get('/fetchAllDevice', authMiddle, async (req, res) => {

        if (req.user.role === 1) {
            console.log('超级');
            sql = "select * from device where is_deleted = 0"
        } else if (req.user.role === 2) {
            console.log('企业');
            sql = `select * from device where enterprise_id = ${req.user.enterprise_id} and is_deleted = 0`
        } else {
            console.log('普通');
            sql = `select * from from user_device ud inner join device d on d.id = ud.device_id where ud.user_id = ${req.user.id} and is_deleted = 0`
        }
        let row = await connection(sql)
        let data = {
            success: true,
            data: row
        }
        res.send(data)

    })

  
    app.use('/api/device', router)
}