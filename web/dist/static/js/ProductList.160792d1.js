(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ProductList"],{"42bf":function(e,t,a){"use strict";var l=a("e6db"),n=a.n(l);n.a},b216:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-cascades"}),e._v(" 产品档案\n            ")]),a("el-breadcrumb-item",[e._v("产品列表")])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-row",[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"mt-10"},[a("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"el-icon-lx-add"},on:{click:function(t){return e.$router.push("./addnewproduct")}}},[e._v("新增")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.delAllSelection}},[e._v("批量删除")])],1),a("div")]),a("el-col",{attrs:{span:18}},[a("div",{staticClass:"product-status"},[a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入关键字"},model:{value:e.query.msg,callback:function(t){e.$set(e.query,"msg",t)},expression:"query.msg"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-refresh"},on:{click:e.refresh}},[e._v("重置")])],1)])],1)],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:"","header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"序号",width:"55",align:"center",type:"index"}}),a("el-table-column",{attrs:{prop:"DeviceID",label:"设备ID"}}),a("el-table-column",{attrs:{prop:"DeviceName",label:"设备名称"}}),a("el-table-column",{attrs:{prop:"DeviceClass",label:"设备种类"}}),a("el-table-column",{attrs:{prop:"Model",label:"型号描述"}}),a("el-table-column",{attrs:{prop:"SerialNumber",label:"出厂编号"}}),a("el-table-column",{attrs:{prop:"CustomerName",label:"客户名称"}}),a("el-table-column",{attrs:{prop:"CustomerIndustry",label:"客户行业"}}),a("el-table-column",{attrs:{prop:"Province",label:"安装地址(省)"}}),a("el-table-column",{attrs:{prop:"City",label:"安装地址(市)"}}),a("el-table-column",{attrs:{prop:"District",label:"安装地址(区)"}}),a("el-table-column",{attrs:{prop:"Address",label:"安装地址(详情)"}}),a("el-table-column",{attrs:{prop:"Duration",label:"运行时长(h)"}}),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"正常"===t.row.status?"success":"报警"===t.row.status?"danger":""}},[e._v(e._s(t.row.status))])]}}])}),a("el-table-column",{attrs:{label:"开关机",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"开机"===t.row.switch?"success":"关机"===t.row.switch?"danger":""}},[e._v(e._s(t.row.switch))])]}}])}),a("el-table-column",{attrs:{prop:"AlarmTimes",label:"报警次数"}}),a("el-table-column",{attrs:{prop:"LastMaintenance:",label:"上次维修日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.formateTimeStamp(t.row.LastMaintenance)))])]}}])}),a("el-table-column",{attrs:{prop:"Createtime",label:"建档日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.formateTimeStamp(t.row.Createtime)))])]}}])}),a("el-table-column",{attrs:{label:"操作",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-view"},on:{click:function(a){return e.handleDetail(t.$index,t.row)}}},[e._v("详情")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.query.pageIndex,"page-size":e.query.pageSize,total:e.pageTotal},on:{"current-change":e.handlePageChange}})],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"70px"}},[a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"地址"}},[a("el-input",{model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1)],1)},n=[],i=(a("6762"),a("2fdb"),{name:"basetable",data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},query:{province:"",city:"",county:"",kind:"",status:"",switch:"",msg:"",date:"",pageIndex:1,pageSize:10},tableData:[],multipleSelection:[],delList:[],editVisible:!1,pageTotal:0,form:{},idx:-1,id:-1}},created:function(){this.getData()},computed:{},methods:{formateTimeStamp:function(e){var t=new Date;t.setTime(e);var a=t.getFullYear(),l=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,n=t.getDate()<10?"0"+t.getDate():t.getDate(),i=t.getHours()<10?"0"+t.getHours():t.getHours(),s=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),o=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return a+"-"+l+"-"+n+" "+i+":"+s+":"+o},getData:function(){var e=this;axios.get("/getProductList").then((function(t){window.console.log(t),200===t.status?(e.tableData=t.data,e.pageTotal=t.data.length,window.console.log(t.data)):window.console.log("服务器错误")})).catch()},handleSearch:function(){var e=this;this.tableData=this.tableData.filter((function(t,a){for(var l in t)if((t[l]+"").includes(e.query.msg))return!0}))},refresh:function(){this.getData(),this.query.msg=""},handleDelete:function(e,t){var a=this,l=[];l.push(t.DeviceID),this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){axios({method:"get",url:"/deleteProducts",params:{id:l}}).then((function(e){window.console.log(e.data),a.$message.success(e.data),a.getData()})).catch()})).catch((function(){}))},handleDetail:function(e,t){this.$router.push({path:"./ProductDetails",query:{id:t.DeviceID}})},handleSelectionChange:function(e){this.multipleSelection=e},delAllSelection:function(){for(var e=this,t=[],a=0;a<this.multipleSelection.length;a++)t.push(this.multipleSelection[a].DeviceID);window.console.log(t),0!==this.multipleSelection.length?this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){axios({method:"get",url:"/deleteProducts",params:{id:t}}).then((function(t){window.console.log(t.data),e.$message.success(t.data),e.getData()})).catch({}),e.multipleSelection=[]})).catch((function(){})):this.$message.warning("请选择需要删除的项")},handleEdit:function(e,t){this.idx=e,this.form=t,this.editVisible=!0},saveEdit:function(){this.editVisible=!1,this.$message.success("修改第 ".concat(this.idx+1," 行成功")),this.$set(this.tableData,this.idx,this.form)},handlePageChange:function(e){this.$set(this.query,"pageIndex",e),this.getData()}}}),s=i,o=(a("42bf"),a("2877")),r=Object(o["a"])(s,l,n,!1,null,"05120f5f",null);t["default"]=r.exports},e6db:function(e,t,a){}}]);