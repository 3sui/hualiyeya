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
        assert(req.user.role < 2, 405, '您没有权限查看维修记录')

        // let sql = "select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device_type.typename from repair,enterprise,device,device_type where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and device.device_type=device_type.id  and device.enterprise_id= enterprise.id order by repair.created_time Desc"
        let sql = "select * from repair r where r.is_deleted = 0"

        let results = await connection(sql)
        // console.log(results)
        res.send(results)
    })
    //获取维修设备详情
    router.get('/RepairInfo', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行维修详情查看')

        let eq = req.query.eq
        // let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device.device_supplier,device.device_model,device.device_description,device.address,device.principal,device_type.typename from repair,enterprise,device,device_type where repair.id=${id} and repair.device_id= device.id and device.device_type=device_type.id  and device.enterprise_id= enterprise.id `
        // let sql = `select * from (select * from (select * from repair  where device_eq = '${eq}' and is_deleted=0) r left outer join device d on r.device_eq=d.eq) rr left outer join device_type dt on rr.device_type=dt.id`

        let sql = `select son.*,dt.typename from (select r.*,d.device_type,d.device_name,d.device_supplier,d.address,d.device_model,d.device_description from (select * from repair  where device_eq = '${eq}' and is_deleted=0) r left outer join device d on r.device_eq=d.eq) son left outer join device_type dt on son.device_type = dt.id`
        console.log(sql);

        let results = await connection(sql)

        res.send(results)
    })


    //根据eq获取设备图片列表
    router.post('/RepairImage', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限查看维修记录')
        let eq=req.body.eq
        let sql = `select f.file_path from device d,file_store f  where d.eq='${eq}' and d.id=f.device_id and f.type='img'`

        let results = await connection(sql)
        
        // console.log(results)
        res.send(results)
    })


    //添加维修记录表信息
    router.post('/AddRepair', authMiddle, async (req, res) => {
        assert(req.user.role !== 4, 405, '您没有权限进行新增操作')

        let query = req.body;

        console.log(query)
        let sql = "insert into repair set ? "
        let results = await connection(sql, query)

        res.send(results)
    })

    //修改维修表信息
    router.post('/UpdateRepair', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行修改操作')

        let id = req.body.id;
        let query = req.body;
        let results = await connection(sql, query)

        let sql = "update repair set ? where id=" + id
        // console.log(results)
        res.send(results)
    })



    //单个删除维修表信息
    router.get('/DeleteRepair', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行删除操作')

        let id = req.query.id;
        let sql = `update repair set is_deleted=1 where id in (${id}) `
        await connection(sql)
        let results = {
            success: true,
            data: '删除成功'
        }
        res.send(results)

    })
    //查询维修表信息
    router.post('/SearchRepair', async (req, res) => {
        let keyword = req.body.keyword;
        let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device_type.typename from repair,enterprise,device,device_type where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and device.device_type=device_type.id  and device.enterprise_id= enterprise.id and (enterprise.enterprise_name like '%${keyword}%' or device.eq like '%${keyword}%' or device.device_name like '%${keyword}%' or repair.repair_person like '%${keyword}%')order by repair.created_time Desc`
        connection.query(sql, (err, results) => {
            if (err) throw err
            // for (let i = 0; i < results.length; i++) {
            //     results[i].created_time = TimeFomart.Todate(Number(results[i].created_time))
            // }
            console.log(results)
            res.send(results)
        })
    })
    //单个删除行业表信息
    router.get('/DeleteRepair', authMiddle, async (req, res) => {
        assert(req.user.role < 2, 405, '您没有权限进行删除操作')

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