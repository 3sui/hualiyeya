<!--
 * @Author: your name
 * @Date: 2020-04-28 16:25:21
 * @LastEditTime: 2020-06-04 15:04:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \远程监控平台\vue-manage-system\src\components\page\map.vue
 -->
 <template>
    <div id="maps">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-emoji"></i> 用户地图
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-row class="container">
                <el-col :span="18">
                    <div class="mapbox">
                        <baidu-map class="map" center="中国" :map-click="false" v-if="allDevice" :scroll-wheel-zoom="true">
                            <bml-marker-clusterer :averageCenter="true">
                                <div v-for="(marker, i) of allDevice" :key="i">
                                    <bm-marker
                                        :icon="{url: marker.status == '正常'? require('../../../public/bposition.png') : require('../../../public/rposition.png'), size: {width: 60, height: 60}}"
                                        :dragging="true"
                                        animation="BMAP_ANIMATION_BOUNCE"
                                        :position="{lng: marker.lng, lat: marker.lat}"
                                        @click="infoWindowOpen(marker)"
                                    >
                                        <bm-info-window
                                            title="设备信息"
                                            :position="{lng: marker.lng, lat: marker.lat}"
                                            :show="marker.showFlag"
                                            @close="infoWindowClose(marker)"
                                            @open="infoWindowOpen(marker)"
                                        >
                                            <p>公司: {{marker.device_supplier}}</p>
                                            <p>地址: {{marker.address}}</p>
                                            <p>设备ID: {{marker.eq}}</p>
                                            <p>设备状态: {{marker.is_on?'开机':'关机'}}</p>
                                            <p>设备报警: {{marker.status}}</p>
                                            <el-button
                                                class="my-2"
                                                @click="showDrawer(marker.eq)"
                                            >查看更多</el-button>
                                        </bm-info-window>
                                    </bm-marker>
                                </div>
                            </bml-marker-clusterer>
                        </baidu-map>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="map-info">
                        <div class="info-one">
                            <p>{{deviceNum}}</p>
                            <p>设备数量</p>
                        </div>
                        <div class="info-two">
                            <el-progress type="circle" :percentage="100"></el-progress>
                            <div>
                                <p>{{deviceNum}}</p>
                                <p>运行设备数</p>
                            </div>
                        </div>
                        <div class="info-three">
                            <el-progress type="circle" :percentage="0"></el-progress>
                            <div>
                                <p>0</p>
                                <p>关机设备数</p>
                            </div>
                        </div>
                        <div class="info-four">
                            <el-progress type="circle" :percentage="0"></el-progress>
                            <div>
                                <p>0</p>
                                <p>待机设备数</p>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-drawer
            :title="drawerData.device_name"
            :visible.sync="drawer"
            direction="rtl"
            size="35%"
        >
            <div class="w-100 px-4">
                <div class="d-flex jc-around my-2">
                    <div class="img">图片</div>
                    <div class="img">图片</div>
                    <div class="img">图片</div>
                    <div class="img">图片</div>
                    <div class="img">图片</div>
                </div>
                <p>设备id: {{drawerData.eq}}</p>
                <p>设备名称: {{drawerData.device_name}}</p>
                <p>设备型号: {{drawerData.device_model}}</p>
                <p>工作状态: {{drawerData.status}}</p>
                <p>设备地址: {{drawerData.address}}</p>
                <p>设备负责人: {{drawerData.principal}}</p>

                <el-button
                    @click="$router.push({path: '/ProductDetails', query: drawerData.eq})"
                >跳转到详情页</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { BmlMarkerClusterer } from 'vue-baidu-map';
// 引入marker
import BmMarker from 'vue-baidu-map/components/overlays/Marker';

export default {
    name: 'maps',
    data() {
        return {
            drawerData: {},
            drawer: false,
            allDevice: null,
            BMap: '',
            map: '',
            show: false,
            deviceNum: 0
        };
    },

    components: {
        BmlMarkerClusterer,
        BmMarker
    },

    computed: {},
    created() {
        this.fetchAllDevice();
        this.fetchDeviceNum();
        this.fetchDeviceStatus();
    },
    methods: {
        //显示侧边栏设备详情
        showDrawer(id) {
            window.console.log(id);
            this.drawerData = this.allDevice.filter(item => {
                return item.eq == id;
            })[0];
            window.console.log(this.drawerData);
            this.drawer = true;
        },
        // 关闭信息窗口 @close 自带的方法
        infoWindowClose(marker) {
            marker.showFlag = false;
            console.log(marker);
        },
        // 首先点击marker时开启信息窗口，其实没必要在 bm-info-window 上写 @open 因为如果是关闭状态根本就点不到，所以就无法触发 @open
        // 如果在 bm-info-window 上写了 @open 在点击marker时会触发两次infoWindowOpen函数，而且可以很明显的看到有延时
        infoWindowOpen(marker) {
            marker.showFlag = true;
            // axios({
            //     method: 'get',
            //     url: 'getDeviceInfo',
            //     query: ''
            // });
            console.log(marker);
        },
        //获取企业设备数量
        fetchDeviceNum() {
            axios({
                method: 'get',
                url: '/map/fetchDeviceNum'
            })
                .then(res => {
                    if (res.data.success) {
                        this.deviceNum = res.data.data;
                        // window.console.log(res.data.data);
                    }
                })
                .catch();
        },


        //获取所有设备数据
        fetchAllDevice() {
            // window.console.log(BMap);
            axios({
                method: 'get',
                url: '/map/fetchAllDevice'
            }).then(res => {
                if (res.data.success) {
                    this.allDevice = res.data.data;
                    window.console.log(this.allDevice);
                    let addressArr = [];
                    this.allDevice.forEach(item => {
                        addressArr.push(item.address);
                    });

                    /***************************************** */
                    var index = 0;
                    var myGeo;

                    //否则会报错BMap.Geocoder is not a constructor
                    setTimeout(() => {
                        myGeo = new BMap.Geocoder();
                        bdGEO();
                    }, 500);
                    let _this = this;
                    function bdGEO() {
                        for (let i = 0; i < _this.allDevice.length; i++) {
                            myGeo.getPoint(_this.allDevice[i].address, function(point) {
                                if (point) {
                                    _this.$set(_this.allDevice[i], 'lng', point.lng);
                                    _this.$set(_this.allDevice[i], 'lat', point.lat);
                                    _this.$set(_this.allDevice[i], 'showFlag', point.showFlag);
                                }
                            });
                        }
                    }
                    window.console.log(this.allDevice);
                }
            });
        }
    }
};
</script>
<style scoped>
.map {
    height: calc(100vh - 220px);
    min-height: 500px;
}
.map-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    height: calc(100vh - 220px);
    min-height: 500px;
}
.map-info > div {
    box-sizing: border-box;
    /* margin-bottom: 13.3px; */
    padding: 15px;
    height: 22%;
    background-color: #eef1f6;
}
.info-one {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 1.5;
    font-size: 26px;
    color: #333;
}
.info-two,
.info-three,
.info-four {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.info-two > div p:nth-child(1),
.info-three > div p:nth-child(1),
.info-four > div p:nth-child(1) {
    font-size: 26px;
}
.img {
    width: 90px;
    height: 90px;
    background: red;
}
</style>
<style>
.el-progress-circle {
    height: 100px !important;
    width: 100px !important;
}
.BMap_Marker img {
    width: 40px;
}
</style>
