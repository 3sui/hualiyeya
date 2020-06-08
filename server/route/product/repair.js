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


    //获取维修表信息
    router.get('/Repair', authMiddle, async (req, res) => {
        let sql = "select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device_type.typename from repair,enterprise,device,device_type where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and device.device_type=device_type.id  and device.enterprise_id= enterprise.id order by repair.created_time Desc"
        let results = await connection(sql)
        // console.log(results)
        res.send(results)
    })
    //获取维修设备详情
    router.get('/RepairInfo', authMiddle, async (req, res) => {

        let id = req.query.id
        let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device.device_supplier,device.device_model,device.device_description,device.address,device.principal,device_type.typename from repair,enterprise,device,device_type where repair.id=${id} and repair.device_id= device.id and device.device_type=device_type.id  and device.enterprise_id= enterprise.id `
        let results = await connection(sql)

        res.send(results)
    })
    //添加维修记录表信息
    router.post('/AddRepair', authMiddle, async (req, res) => {
        let query = req.body;

        console.log(query)
        let sql = "insert into repair set ? "
        let results = await connection(sql, query)

        res.send(results)
    })

    //修改维修表信息
    router.post('/UpdateRepair', authMiddle, async (req, res) => {
        let id = req.body.id;
        let query = req.body;
        let results = await connection(sql, query)

        let sql = "update repair set ? where id=" + id
        // console.log(results)
        res.send(results)
    })


    //单个删除行业表信息
    router.get('/DeleteRepair', authMiddle, async (req, res) => {
        let id = req.query.id;
        let sql = "update industry set is_deleted=1 where id=" + id
        let results = await connection(sql)

        res.send(results)
    })
    //查询行业表信息
    router.post('/SearchIndustry', authMiddle, async (req, res) => {
        let keyword = req.body.keyword;
        let sql = "select * from  industry where ( is_deleted=0 or is_deleted is NULL) and industry_name like '%" + keyword + "%' order by created_time Desc"
        let results = await connection(sql)

        console.log(results)
        res.send(results)
    })

    //获得故障种类选择对象
    router.get('/FaultTypeChoose', authMiddle, async (req, res) => {
        let sql = "select fault_type,fault_phenomenon from fault_type where is_deleted = 0 or is_deleted is NULL"
        let results = await connection(sql)

        if (results) {
            let faultTypelist = [];
            let typeContainer = {};
            results.forEach(element => {

                typeContainer[element.fault_type] = typeContainer[element.fault_type] || [];
                typeContainer[element.fault_type].push(element)
            });
            // console.log(typeContainer);
            var TypeName = Object.keys(typeContainer);

            TypeName.forEach(element => {
                // console.log(element);                  
                let typeItem = {}
                typeItem['fault_type'] = element
                let phenomenonlist = []
                typeContainer[element].forEach(item => {
                    phenomenonlist.push(item.fault_phenomenon)
                })
                typeItem['fault_phenomenon'] = phenomenonlist

                faultTypelist.push(typeItem)
            });
            // console.log(faultTypelist);           
            res.send(faultTypelist)
        }

    })

    //根据企业id获取设备
    router.post('/Devices', authMiddle, async (req, res) => {
        let id = req.body.enterprise_id

        let sql = `select id,eq as value from device where  enterprise_id=${id} and is_deleted = 0 or is_deleted is NULL `
        let results = await connection(sql)

        if (results) {

            res.send(results)
        }
    })











    app.use('/api', router)
}