const interface = [{
        path: "dashboard",
        interfacepath: ["fetchDeviceInfo", ],
        public: false,
    },
    {
        path: "map",
        interfacepath: ["/fetchAllDevice", "/fetchImgList"],
        public: false,
    },
    {
        path: "DeviceList",
        interfacepath: ["/fetchAllDevice", "/deleteProducts", "/saveEdit", "/fetchSetting", "/saveSetting", "/fetchCaseInfo", "/addNewProduct", "/getDeviceInfo", "/getMaintenanceRecord", ],
        public: false,
    },
    {
        path: "MaintenanceRecords",
        interfacepath: ["/Repair", "/DeleteRepair", "/RepairImage", "/FaultTypeChoose", "/RepairInfo", "UpdateRepair"],
        public: false,
    },

    {
        path: "EquipmentMonitoring",
        interfacepath: ["/fetchEquipment", "/fetchPointInfo"],
        public: false,
    },
    {
        path: "AlarmRecord",
        interfacepath: ["/fetchAlarmRecord", "/changeHandled", "/deleted"],
        public: false,
    },

    {
        path: "DeviceAnalysis",
        interfacepath: ["/DeviceByType"],
        public: false,
    },
    {
        path: "IndustryAnalysis",
        interfacepath: ["/EnterprisesByIndustry"],
        public: false,
    },
    {
        path: "FaultAnalysis",
        interfacepath: ["/FaultByType"],
        public: false,
    },

    {
        path: "DeviceType",
        interfacepath: ["/DeviceType", "/CheckDeviceTypeId", "/DeleteDeviceType", "/AddDeviceType", "/updateDeviceType"],
        public: false,
    },

    {
        path: "FaultType",
        interfacepath: ["/FaultType", "/DeleteFaultType", "/AddFaultType", "/updateFaultType"],
        public: false,
    },

    {
        path: "Enterprise",
        interfacepath: ["/Industry", "/Enterprise", "/checkEnterpriseID", "/DeleteEnterprise", "/AddEnterprise", "/updateEnterprise", ],
        public: false,
    },
    {
        path: "Industry",
        interfacepath: ["/Industry", "/CheckIndustryId", "/DeleteIndustry", "/AddIndustry", "/updateIndustry"],
        public: false,
    },

    {
        path: "Authority",
        interfacepath: ["/addNewUserAvatar", "/fetchAuthList", "/changeAuth", "/addNewUser", "/fetchDealing", "/dealingDevice", "/DeleteUserInfo", "/UpdatePassword"],
        public: false,
    },
    {
        path: "RoleInfo",
        interfacepath: [

            "/DeleteRole",
            "/checkRoleID",
            "/UpdateRoleright",
            "/UpdateRole",
            "/AddRole",
            "/RoleInfo",
        ],
        public: false,
    },

    {
        path: "",
        interfacepath: ["/getRights", "/fetchDeviceInfo", "/upload", "/check/file", "/uploads", "/merge", "/changePass"],
        public: true,
    },
    {
        path: "DeviceManage",
        interfacepath: ["/devicelist", "/devicedetail", "/devicedetailpoint", "/currentpoint", "/files", "/download"],
        public: false,
    },
    {
        path: "DeviceAlarm",
        interfacepath: ["/AlarmRecordCount", "/AlarmRecordDetail", "/UpdateAlarmRecord", "/AlarmRecord"],
        public: false,
    },
    {
        path: "RepairRecord",
        interfacepath: ["/Repair", "/states", "/UpdateRepair", "/FaultTypeChoose", "/RepairInfo", "/UpdateRepair"],
        public: false,
    },
    {
        path: "NewRepairRecord",
        interfacepath: ["/AddRepair", "/states", "/FaultTypeChoose"],
        public: false,
    },
    {
        path: "Settings",
        interfacepath: ["/ModifyPassword"],
        public: false,
    },
]

module.exports =
    interface


//页面的接口