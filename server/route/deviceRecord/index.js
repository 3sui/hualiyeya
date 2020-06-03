/*
 * @Author: your name
 * @Date: 2020-06-02 10:34:44
 * @LastEditTime: 2020-06-03 11:05:41
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

    router.get('/fetchAllDevice', authMiddle, async (req, res) => {
        let sql = "select * from device"
        let row = await connection(sql)
        let data = {
            success: true,
            data: row
        }
        res.send(data)

    })
    app.use('/api/device', router)
}