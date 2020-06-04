module.exports = app => {
    const axios = require('../../plugins/axios')()
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const TimeFomart = require('../../time/time')
    const router = express.Router()
    const fs = require("fs"); // 读写文件的模块
    const path = require("path") // 处理路径的模块

    //获取维修表信息
    router.get('/Repair', async (req, res) => {
        let sql = "select * from repair where is_deleted = 0 or is_deleted is NULL order by created_time Desc"
        connection.query(sql, (err, results) => {
            if (err) throw err
            for (let i = 0; i < results.length; i++) {
                results[i].created_time = TimeFomart.Todate(Number(results[i].created_time))
            }
            // console.log(results)
            res.send(results)
        })
    })
    //添加行业表信息
    router.post('/AddIndustry', async (req, res) => {
        let query = req.body;

        console.log(query)
        let sql = "insert into industry set ? "
        connection.query(sql, query, (err, results) => {
            if (err) throw err
            // console.log(results)
            res.send(results)
        })
    })

    //修改行业表信息
    router.post('/UpdateIndustry', async (req, res) => {
        let id = req.body.id;
        let query = req.body;

        let sql = "update industry set ? where id=" + id
        connection.query(sql, query, (err, results) => {
            if (err) throw err
            // console.log(results)
            res.send(results)
        })
    })


    //单个删除行业表信息
    router.post('/DeleteIndustry', async (req, res) => {
        let id = req.body.id;
        let sql = "update industry set is_deleted=1 where id=" + id
        connection.query(sql, (err, results) => {
            if (err) throw err
            // console.log(results)
            res.send(results)
        })
    })
    //查询行业表信息
    router.post('/SearchIndustry', async (req, res) => {
        let keyword = req.body.keyword;
        let sql = "select * from  industry where ( is_deleted=0 or is_deleted is NULL) and industry_name like '%" + keyword + "%' order by created_time Desc"
        connection.query(sql, (err, results) => {
            if (err) throw err
            console.log(results)
            res.send(results)
        })
    })










    app.use('/api', router)
}