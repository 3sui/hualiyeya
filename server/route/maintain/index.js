/*
 * @Author: your name
 * @Date: 2020-06-14 14:08:41
 * @LastEditTime: 2020-06-16 14:17:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\maintain\index.js
 */
module.exports = app => {
    const axios = require('../../plugins/axios')()
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const TimeFomart = require('../../time/time')
    const router = express.Router()
    const fs = require("fs"); // 读写文件的模块
    const path = require("path") // 处理路径的模块
    const authMiddle = require('../../middleware/auth')()
    const assert = require('http-assert')

    //获取所有设备
    router.get('/fetchEquipment', async (req, res) => {
        console.log(123);

        let sql = `select * from device d inner join device_type dt on (d.device_type = dt.id) where d.is_deleted = 0`
        let results = {}
        results.success = true
        results.data = await connection(sql)
        res.send(results)
    })

    //根据设备eq获取实时数据
    router.get('/fetchPointInfo', async (req, res) => {
        console.log(req.query);
        let eq = req.query.eq
        let date = 10
        if (req.query.date) {
            date = req.query.date * 24 * 60 * 2

        }
        let results = {}
        results.success = true
        let sql = `select * from devicedata where eq = '${eq}' limit ${date}`

        results.info = await connection(sql)
        sql = `select * from devicedata_limit where eq = '${eq}'`
        results.delimit = await connection(sql)
        res.send(results)

    })
    app.use('/api/maintain', router)
}