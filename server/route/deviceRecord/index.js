/*
 * @Author: your name
 * @Date: 2020-06-02 10:34:44
 * @LastEditTime: 2020-06-10 17:54:53
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
    const assert = require('http-assert')

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
            sql = `select ud.user_id uid, ud.device_id did, d.eq, d.device_name,d.created_time, d.device_type, d.device_supplier, d.address,d.device_description,d.is_on,d.status from user_device ud inner join device d on d.id = ud.device_id where ud.user_id = ${req.user.id} and d.is_deleted = 0`
            console.log(sql);

        }
        let row = await connection(sql)
        let data = {
            success: true,
            data: row
        }
        res.send(data)

    })

    //产品列表点击删除
    router.get('/deleteProducts', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 405, '您没有权限进行删除操作')
        let body = req.query
        let sql = 'update device set is_deleted = 1 WHERE id in (' + body.id + ')'
        console.log(sql);
        console.log(body.id);
        await connection(sql)
        res.send('数据删除成功')
    })

    //新增页面------------------------------------------------
    //获取新增页面基本信息
    router.get('/fetchCaseInfo', authMiddle, async (req, res) => {
        let sql
        let results = {}
        sql = 'select * from device_type where is_deleted = 0'
        results.type = await connection(sql)
        if (req.user.role == 1) {
            sql = 'select * from enterprise where is_deleted = 0'
            results.enterprise = await connection(sql)
            sql = 'select * from user_info where is_deleted = 0'
            results.user = await connection(sql)
        } else if (req.user.role == 2) {
            console.log(req.user)
            sql = 'select * from enterprise where is_deleted = 0 and id = ' + req.user.enterprise_id
            results.enterprise = await connection(sql)
            sql = 'select * from user_info where is_deleted = 0 and enterprise_id = ' + req.user.enterprise_id
            results.user = await connection(sql)
        } else {
            assert(false, 403, '您没有权限')
        }
        res.send(results)
    })

    router.post('/addNewProduct', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 405, '您没有权限进行添加操作')
        console.log(req.body);
        let {
            eq
        } = req.body
        sql = 'select * from device where is_deleted = 0 and eq = ?'

        let a = await connection(sql, eq)
        assert(a.length !== 0, 406, '此id已存在,请重新输入正确的id')


        sql = 'insert into device set ?'

        let results = {}

        a = await connection(sql, req.body)
        results.success = true
        results.insertId = a.insertId
        results.message = '设备添加成功'
        console.log(results.insertId)
        res.send(results)
    })

    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    router.post('/upload', authMiddle, upload.array('file'), async (req, res) => {
        const files = req.files
        const id = req.body.id
        console.log(files);
        console.log(req.body.id);
        let url
        files.forEach(async (item, index) => {
            url = '/uploads/' + item.filename + '.' + item.originalname.split('.').pop()
            sql = `insert into file_store (file_name, file_path) values ('${item.originalname}', '${url}')`
            console.log(sql);

            await connection(sql)
            sql = `update device set picture${index + 1} where id = '${id}'`
        })

    })

    app.use('/api/device', router)
}