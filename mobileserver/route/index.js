/*
 * @Author: your name
 * @Date: 2020-05-08 14:36:20
 * @LastEditTime: 2020-05-12 15:13:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\admin\productProfile\index.js
 */
module.exports = app => {
    const axios = require('../../../plugins/axios')()
    const connection = require('../../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()




    app.use('/', router)
}