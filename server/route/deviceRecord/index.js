/*
 * @Author: your name
 * @Date: 2020-06-02 10:34:44
 * @LastEditTime: 2020-06-29 16:16:27
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

        if (req.user.role === 1 || req.user.role === 4) {
            console.log('超级');
            sql = "select d.*,dt.typename from device d inner join device_type dt on dt.id = d.device_type where d.is_deleted = 0"
        } else if (req.user.role === 2) {
            console.log('企业');
            sql = `select d.*,dt.typename from device d inner join device_type dt on dt.id = d.device_type where d.enterprise_id = ${req.user.enterprise_id} and d.is_deleted = 0`
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
    //企业用户没有权限
    router.get('/deleteProducts', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行删除操作')
        let body = req.query
        let sql = 'update device set is_deleted = 1 WHERE id in (' + body.id + ')'
        console.log(sql);
        console.log(body.id);
        await connection(sql)
        res.send('数据删除成功')
    })

    //保存编辑内容
    router.post('/saveEdit', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行编辑操作')

        let {
            id,
            device_name,
            address,
            device_supplier,
            device_description
        } = req.body
        console.log(req.body);
        let sql = 'update device set device_name = ?, address = ?, device_supplier = ?, device_description = ? where id = ?'
        await connection(sql, [
            device_name,
            address,
            device_supplier,
            device_description,
            id
        ])
        let results = {
            success: true,

            message: '数据保存成功'
        }
        res.send(results)

    })

    //获取设备配置信息
    router.get('/fetchSetting', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行配置操作')

        console.log(123)

        console.log(req.query)
        let eq = req.query.eq
        let sql = `select * from devicedata_limit where eq = '${eq}'`
        let a = await connection(sql)
        console.log(a)
        let results = {
            success: true,
            data: a
        }
        res.send(results)
    })

    //保存配置更新
    router.post('/saveSetting', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行更新操作')

        console.log(req.body)
        let eq = req.body.eq
        let point = req.body.point
        let sql = `delete from devicedata_limit where eq = '${eq}'`
        await connection(sql)
        point.forEach(async item => {
            item.eq = eq
            sql = `insert into devicedata_limit set ?`
            console.log(sql);
            console.log(item);


            await connection(sql, item)
        })
        let results = {
            success: true,
            message: '数据保存成功'
        }
        res.send(results)
    })

    //新增页面------------------------------------------------
    //获取新增页面基本信息
    router.get('/fetchCaseInfo', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行新增操作')

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


    //添加设备信息
    router.post('/addNewProduct', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行添加操作')
        console.log(req.body);
        req.body.created_by = req.user.username
        let {
            eq
        } = req.body
        sql = 'select * from device where is_deleted = 0 and eq = ?'

        let a = await connection(sql, eq)
        console.log(a)
        assert(a.length == 0, 406, '此id已存在,请重新输入正确的id')
        sql = 'insert into device set ?'

        let results = {}

        a = await connection(sql, req.body)
        results.success = true
        results.insertId = a.insertId
        results.message = '设备添加成功'
        console.log(results.insertId)
        res.send(results)
    })


    //上传设备文档和图片
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    router.post('/upload', authMiddle, upload.single('file'), async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行添加操作')
        const file = req.file
        const id = req.body.id
        const type = req.body.type
        let url
        let results = {}
        if (type == 'img') {
            url = '/uploads/' + file.filename + '.' + file.originalname.split('.').pop()
            sql = `insert into file_store (file_name, file_path,device_id, file, type) values ('${file.originalname}', '${url}', '${id}', '${file.filename}', 'img')`

            let a = await connection(sql)

        } else {
            url = '/uploads/' + file.filename + '.' + file.originalname.split('.').pop()
            sql = `insert into file_store (file_name, file_path,device_id, file, type) values ('${file.originalname}', '${url}', '${id}', '${file.filename}', 'word')`

            let a = await connection(sql)
        }
        results = {
            success: true,
            message: '上传完成'
        }
        res.send(results)

    })

    //配置设备阈值-------------------------------------------
    router.post('/settings', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行添加操作')

        console.log(req.body);
        let eq = req.body.eq.id
        let point = req.body.point
        point.forEach(async item => {
            item.eq = eq
            console.log(item);

            let sql = `insert into devicedata_limit set ?`
            await connection(sql, item)
            // let {
            //     cp_id,
            //     cp_name,
            //     unit,
            //     k,
            //     limit_up,
            //     limit_down
            // } = point
        })
        let results = {
            success: true,
            message: '数据保存成功'
        }
        res.send(results)
    })

    //设备详情页面----------------------------

    //获取设备基本信息
    router.get('/getDeviceInfo', async (req, res) => {
        let id = req.query.id

        console.log(id)
        let sql = `select *,dt.typename from device d inner join device_type dt on dt.id = d.device_type where d.id = '${id}' and d.is_deleted = 0`
        let results = {}
        results.info = await connection(sql) //设备基本信息
        sql = `select * from file_store where device_id = '${id}' and type = 'img'`
        results.imgList = await connection(sql) //设备图片

        sql = `select * from file_store where device_id = '${id}' and type = 'word'`
        results.wordList = await connection(sql) //设备文件

        sql = `select eq from device where id = '${id}' and is_deleted = 0`
        let eq = await connection(sql)
        console.log(eq);

        sql = `select * from repair where device_eq = '${eq[0].eq}' and is_deleted = 0`
        console.log(sql);

        results.repair = await connection(sql) //维修记录
        results.success = true
        res.send(results)
    })

    //手机端
    //获取设备列表
    router.get('/fetchDevices', authMiddle, async (req, res) => {

        if (req.user.role === 1 || req.user.role === 4) {
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


    app.use('/api/device', router)
}