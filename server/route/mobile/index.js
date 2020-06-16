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


    //维修工获取维修表信息
    router.get('/Repair',  async (req, res) => {
        let sql = "select enterprise.enterprise_name,repair.*,device.eq,device.device_name from repair,enterprise,device where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and  device.enterprise_id= enterprise.id order by repair.date Desc"
        let results = await connection(sql)
        // console.log(results)
        res.send(results)
    })

    //企业获取维修表信息
    router.get('/Repair', async (req, res) => {
        let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name from repair,enterprise,device where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and  device.enterprise_id= enterprise.id and enterprise.id=${id} order by repair.date Desc`
        let results = await connection(sql)
        // console.log(results)
        res.send(results)
    })


    //获取维修设备详情
    router.get('/RepairInfo', async (req, res) => {

        let id = req.query.id
        let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device.enterprise_id from repair,enterprise,device where repair.id=${id} and repair.device_id= device.id and device.enterprise_id = enterprise.id`
        let results = await connection(sql)


        res.send(results)
    })
    //添加维修记录表信息
    router.post('/AddRepair', async (req, res) => {

        let query = req.body;

        console.log(query)
        let sql = "insert into repair set ? "
        console.log(sql)
        let results = await connection(sql, query)

        res.send(results)
    })

    //修改维修表信息
    router.post('/UpdateRepair',  async (req, res) => {
        // console.log(req.body);
        
        let id = req.body.id;
        let query = req.body;
        let sql = "update repair set ? where id=" + id
        let results = await connection(sql, query)
        // console.log(sql)
        // console.log(results)
        res.send(results)
    })


    //单个删除维修表信息
    // router.get('/DeleteRepair', async (req, res) => {
    //     let id = req.query.id;
    //     let sql = `update repair set is_deleted=1 where id in (${id}) `
    //     connection.query(sql, (err, results) => {
    //         if (err) throw err
    //         // console.log(results)
    //         res.send(results)
    //     })
    // })
    //查询维修表信息
    // router.post('/SearchRepair', async (req, res) => {
    //     let keyword = req.body.keyword;
    //     let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device_type.typename from repair,enterprise,device,device_type where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and device.device_type=device_type.id  and device.enterprise_id= enterprise.id and (enterprise.enterprise_name like '%${keyword}%' or device.eq like '%${keyword}%' or device.device_name like '%${keyword}%' or repair.repair_person like '%${keyword}%')order by repair.created_time Desc`
    //     connection.query(sql, (err, results) => {
    //         if (err) throw err
    //         console.log(results)
    //         res.send(results)
    //     })
    // })
   

    //获得故障种类选择对象
    router.get('/FaultTypeChoose', async (req, res) => {
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
                typeItem['types'] = element
                let phenomenonlist = []
                typeContainer[element].forEach(item => {
                    phenomenonlist.push(item.fault_phenomenon)
                })
                typeItem['phenomenons'] = phenomenonlist

                faultTypelist.push(typeItem)
            });
            // console.log(faultTypelist);           
            res.send(faultTypelist)
        }

    })

    //根据用户获取企业id
    router.get('/enterpriseByid', async(req, res) =>{
        let uaername = req.query.username;
        let sql = `select enterprise_id from user_info where username = '${uaername}' and is_deleted=0`
        let results = await connection(sql, query)
        // console.log(sql)
        // console.log(results)
        res.send(results)
    })

    //根据企业id获取设备
    router.post('/Devices', authMiddle,  async (req, res) => {
        let id = req.body.enterprise_id

        let sql = `select id,eq as value from device where  enterprise_id=${id} and is_deleted = 0 or is_deleted is NULL `
        let results = await connection(sql)

        if (results) {

            res.send(results)
        }
    })

    //获取华立液压的维修工姓名
    router.get('/persons',  async (req, res) => {
        let sql = `select nickname,phone from user_info where  enterprise_id=1 and is_deleted = 0 or is_deleted is NULL `
        let results = await connection(sql)

        if (results) {

            res.send(results)
        }
    })
    //获取维修状态
    router.get('/states', async (req, res) => {
        let sql = `select state from repair_state order by id`
        let results = await connection(sql)

        if (results) {

            res.send(results)
        }
    })

    //企业用户获取自己企业的设备记录
    router.get('/devicelist', async (req, res) => {
        let enterprise_id=req.query.enterprise_id;
        let sql = `select * from (select device.*,b.count  from device,(select eq,count(cp_id) as count from devicedata_limit where is_deleted=0 group by eq) as b  where device.is_deleted=0  and device.enterprise_id=${enterprise_id} and device.eq = b.eq) a left join file_store  on a.id=file_store.device_id AND file_store.type='img'`
        let results = await connection(sql)
        if (results) {
            res.send(results)
        }
    })





    app.use('/api/mobile', router)
}
