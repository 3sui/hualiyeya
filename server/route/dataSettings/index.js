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

    //获取行业表信息
    router.get('/Industry', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')
        let sql = "select * from industry where is_deleted = 0 order by created_time Desc"
        let results = await connection(sql)
        res.send(results)
    })
    //添加行业表信息
    router.post('/AddIndustry', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let query = req.body;

        console.log(query)
        let sql = "insert into industry set ? "
        let results = await connection(sql, query)

        res.send(results)
    })

    //修改行业表信息
    router.post('/UpdateIndustry', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let query = req.body;

        let sql = "update industry set ? where id=" + id
        let results = await connection(sql, query)

        res.send(results)
    })


    //单个删除行业表信息
    router.post('/DeleteIndustry', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let sql = "update industry set is_deleted=1 where id=" + id
        let results = await connection(sql)

        res.send(results)

    })
    //查询行业表信息
    router.post('/SearchIndustry', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let keyword = req.body.keyword;
        let sql = "select * from  industry where is_deleted = 0 and industry_name like '%" + keyword + "%' order by created_time Desc"
        let results = await connection(sql)

        res.send(results)

    })




    //获取设备类型表信息
    router.get('/DeviceType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let sql = "select * from device_type where is_deleted = 0 order by created_time Desc"
        let results = await connection(sql)

        // for (let i = 0; i < results.length; i++) {
        //     results[i].created_time = TimeFomart.Todate(Number(results[i].created_time))
        // }
        res.send(results)

    })
    //添加设备类型表信息
    router.post('/AddDeviceType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let query = req.body;

        console.log(query)
        let sql = "insert into device_type set ? "
        let results = await connection(sql, query)
        res.send(results)
    })

    //修改设备类型表信息
    router.post('/UpdateDeviceType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let query = req.body;

        let sql = "update device_type set ? where id=" + id
        let results = await connection(sql, query)
        res.send(results)
    })


    //单个删除设备类型表信息
    router.post('/DeleteDeviceType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let sql = "update device_type set is_deleted=1 where id=" + id
        let results = await connection(sql)
        res.send(results)
    })
    //查询设备类型表信息
    router.post('/SearchDeviceType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let keyword = req.body.keyword;
        let sql = "select * from  device_type where is_deleted = 0 and typename like '%" + keyword + "%' order by created_time Desc"
        let results = await connection(sql)
        res.send(results)
    })



    //获取故障类型表信息
    router.get('/FaultType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let sql = "select * from fault_type where is_deleted = 0 order by created_time Desc"
        let results = await connection(sql)
        res.send(results)

    })
    //添加故障类型表信息
    router.post('/AddFaultType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let query = req.body;

        console.log(query)
        let sql = "insert into fault_type set ? "
        let results = await connection(sql, query)
        res.send(results)
    })

    //修改故障类型表信息
    router.post('/UpdateFaultType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let query = req.body;
        let sql = "update fault_type set ? where id=" + id
        let results = await connection(sql, query)

        res.send(results)

    })


    //单个删除故障类型表信息
    router.post('/DeleteFaultType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let sql = "update fault_type set is_deleted = 1 where id=" + id
        let results = await connection(sql)
        res.send(results)
    })

    //查询故障类型表信息
    router.post('/SearchFaultType', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let keyword = req.body.keyword;
        let sql = `select * from  fault_type where is_deleted = 0 and (fault_type like '%${keyword}%' or fault_phenomenon like '%${keyword}%') order by created_time Desc`
        // console.log(sql)
        let results = await connection(sql)
        res.send(results)
    })



    //获取企业表信息
    router.get('/Enterprise', authMiddle, async (req, res) => {
        // assert(req.user.role === 1, 403, '您无权访问')

        let sql = `select enterprise.*,industry.industry_name from enterprise,industry where (enterprise.is_deleted = 0)and (enterprise.industry_id=industry.id) order by enterprise.created_time Desc`
        let results = await connection(sql)
        res.send(results)
    })


    //添加企业表信息
    router.post('/AddEnterprise', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let query = req.body;

        console.log(query)
        let sql = "insert into enterprise set ? "
        let results = await connection(sql, query)
        res.send(results)
    })

    //修改企业表信息
    router.post('/UpdateEnterprise', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let query = req.body;
        let sql = "update enterprise set ? where id=" + id
        let results = await connection(sql, query)
        res.send(results)
    })


    //单个删除企业表信息
    router.post('/DeleteEnterprise', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let id = req.body.id;
        let sql = "update enterprise set is_deleted=1 where id=" + id
        let results = await connection(sql)
        res.send(results)
    })
    //查询企业表信息
    router.post('/SearchEnterprise', authMiddle, async (req, res) => {
        assert(req.user.role === 1, 403, '您无权访问')

        let keyword = req.body.keyword;
        let sql = `select enterprise.*,industry.industry_name from enterprise,industry where enterprise.industry_id=industry.id and enterprise.enterprise_name like '%${keyword}%' and (enterprise.is_deleted = 0 or enterprise.is_deleted is NULL ) order by enterprise.created_time Desc`
        // console.log(sql)
        let results = await connection(sql)
        res.send(results)
    })




    //获取用户表信息
    router.get('/UserInfo', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '您无权访问')
        let sql
        if (req.user.role === 1) {
            sql = `select user_info.*,enterprise.enterprise_name from user_info,enterprise where (user_info.is_deleted = 0 or user_info.is_deleted is NULL) and user_info.enterprise_id=enterprise.id order by user_info.created_time Desc`
        }
        let results = await connection(sql)


        // for (let i = 0; i < results.length; i++) {
        //     results[i].created_time = TimeFomart.Todate(Number(results[i].created_time))
        // }
        //  console.log(results)
        res.send(results)
    })
    //添加用户表信息
    router.post('/AddUserInfo', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '您无权访问')

        let query = req.body;
        console.log(query)
        let sql = "insert into user_info set ? "
        let results = await connection(sql, query)
        res.send(results)
    })

    //修改用户表信息
    router.post('/UpdateUserInfo', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '您无权访问')

        let id = req.body.id;
        let query = req.body;
        let sql = "update user_info set ? where id=" + id
        let results = await connection(sql, query)
        res.send(results)
    })
    //重置用户密码信息，默认123456
    router.post('/UpdatePassword', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '您无权访问')

        let id = req.body.id;
        let sql = "update user_info set password='123456' where id=" + id
        let results = await connection(sql)
        res.send(results)
    })

    //单个删除用户表信息
    router.post('/DeleteUserInfo', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '您无权访问')

        let id = req.body.id;
        let sql = "update user_info set is_deleted=1 where id=" + id
        let results = await connection(sql)

        res.send(results)
    })
    //查询用户表信息
    router.post('/SearchUserInfo', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '您无权访问')

        let keyword = req.body.keyword;

        let sql = `select user_info.*,enterprise.enterprise_name from user_info,enterprise where user_info.enterprise_id=enterprise.id and (user_info.is_deleted = 0 or user_info.is_deleted is NULL ) and (user_info.username like '%${keyword}%' or user_info.nickname like '%${keyword}%' or enterprise.enterprise_name like '%${keyword}%' ) order by enterprise.created_time Desc`
        // console.log(sql)
        let results = await connection(sql)
        res.send(results)
    })


    //获取所有用户权限
    router.get('/fetchAuthList', authMiddle, async (req, res) => {
        let sql
        let sql2
        if (req.user.role === 1) {
            console.log('超级');
            sql = `select u.*, e.enterprise_name, ur.role_id, r.id rid, r.name from user_info u left outer join enterprise e ON e.id = u.enterprise_id left outer join user_role ur on ur.user_id = u.id left outer join role r on ur.role_id = r.id where u.is_deleted = 0`
            sql2 = `select * from enterprise e where e.is_deleted = 0`
        } else if (req.user.role === 2) {
            console.log('企业');

            sql = `select u.*, e.enterprise_name, ur.role_id, r.id rid, r.name from user_info u left outer join enterprise e ON e.id = u.enterprise_id left outer join user_role ur on ur.user_id = u.id left outer join role r on ur.role_id = r.id where u.is_deleted = 0 and u.enterprise_id = ${req.user.enterprise_id}`
            sql2 = `select * from enterprise e where e.is_deleted = 0 and e.id=${req.user.enterprise_id}`
        } else {
            assert(false, 403, '没有权限')
        }
        let row = {}
        row.success = true
        row.tableData = await connection(sql)
        sql = `select * from role where id >= ${req.user.role}`
        row.roles = await connection(sql)
        row.enterprise = await connection(sql2)
        console.log(row.enterprise);

        res.send(row)
    })

    //新增用户
    router.post('/addNewUser', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '没有权限')

        console.log(req.body);

        let {
            enterprise_id,
            username,
            nickname,
            role,
            phone,
            email,
            avatar
        } = req.body
        let sql = `select count(*) num from user_info where username= '${username}' and is_deleted = 0`
        let results = await connection(sql)
        console.log(results[0].num);

        if (results[0].num !== 0) {
            results = {
                success: false,
                message: '账号已存在,请重新输入账号'
            }
            return res.send(results)
        }

        sql = `insert into user_info enterprise_id, username, nickname, phone, email, avatar values ?,?,?,?,?,?`
        console.log(sql);

        await connection(sql, [enterprise_id, username, nickname, phone, email, avatar])
        results = {
            success: true,
            message: '用户添加成功'
        }
        res.send(results)


    })

    //修改用户权限
    //无法修改自己权限
    //超级管理员可以改所有人的权限
    //企业管理员可以改普通用户权限
    //普通用户无权限修改
    router.post('/changeAuth', authMiddle, async (req, res) => {
        assert(req.user.role < 3, 403, '没有权限')
        console.log(req.user.role);

        let {
            id, //角色id
            name, //角色名称
            user_id //用户id
        } = req.body
        console.log(id, name, user_id);
        assert(req.user.id !== user_id, 406, '无法修改自己权限')

        let results = {}
        let sql = `update user_role set role_id = ${id} where user_id = ${user_id}`
        results.results = await connection(sql)
        results.success = true
        results.message = '数据修改成功'
        res.send(results)

    })

    app.use('/api/dataSettings', router)
}