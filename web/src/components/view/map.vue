<!--
 * @Author: your name
 * @Date: 2020-04-28 16:25:21
 * @LastEditTime: 2020-06-01 18:02:01
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
                        <baidu-map class="map" center="中国" :map-click="false" v-if="allDevice">
                            <bml-marker-clusterer :averageCenter="true">
                                <div v-for="(marker, i) of allDevice" :key="i">
                                    <bm-marker
                                        :icon="{url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591015785174&di=0f3d1082e6d3de97a898b433b136582f&imgtype=0&src=http%3A%2F%2Fimages.669pic.com%2Felement_pic%2F90%2F37%2F17%2F46%2Fdd97a3cd5a139633ceb99f292b1aea8c.jpg%2521w700wb', size: {width: 300, height: 157}}"
                                        :dragging="false"
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
                                            <p>设备报警: 0</p>
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
                            <el-progress type="circle" :percentage="status.yxs*2" v-if="status.yxs"></el-progress>
                            <div>
                                <p>{{status.yxs}}</p>
                                <p>运行设备数</p>
                            </div>
                        </div>
                        <div class="info-three">
                            <el-progress
                                type="circle"
                                :percentage="(deviceNum-status.yxs)*2"
                                v-if="status.yxs"
                            ></el-progress>
                            <div>
                                <p>{{deviceNum-status.yxs}}</p>
                                <p>关机设备数</p>
                            </div>
                        </div>
                        <div class="info-four">
                            <el-progress type="circle" :percentage="status.djs*2" v-if="status.yxs"></el-progress>
                            <div>
                                <p>{{status.djs}}</p>
                                <p>设备故障数</p>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { BmlMarkerClusterer } from 'vue-baidu-map';
// 引入marker
import BmMarker from 'vue-baidu-map/components/overlays/Marker';
// 插入 100 个随机点
// const markers = [
//     {
//         lng: 119.946973,
//         lat: 31.772752,
//         // url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
//         company: '江苏常州华丽液压润滑设备有限公司',
//         address: '中国 江苏 常州市 三河口',
//         deviceId: '10000093803899',

//         showFlag: false
//     },
//     {
//         lng: 119.946973,
//         lat: 31.772752,
//         // url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
//         company: '江苏常州华丽液压润滑设备有限公司',
//         address: '中国 江苏 常州市 三河口',
//         deviceId: '10000093803934',

//         showFlag: false
//     },
//     {
//         lng: 119.946973,
//         lat: 31.772752,
//         // url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
//         company: '江苏常州华丽液压润滑设备有限公司',
//         address: '中国 江苏 常州市 三河口',
//         deviceId: '10000093803937',
//         showFlag: false
//     }
// ];

const carList = [{}];
export default {
    name: 'maps',
    data() {
        return {
            imgUrl: ['./src/assets/img/bpositon.png'],
            allDevice: null,
            BMap: '',
            map: '',
            carList,
            show: false,
            deviceNum: 0,
            status: {}
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

        //获取企业设备数量
        async fetchDeviceAddress() {},

        //获取企业设备各种状态的数据
        fetchDeviceStatus() {
            // axios({
            //     method: 'get',
            //     url: '/fetchDeviceStatus'
            // })
            //     .then(res => {
            //         this.status = res.data;
            //     })
            //     .catch();
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

                                    // _this.allDevice[i].lng = point.lng;
                                    // _this.allDevice[i].lat = point.lat;
                                    // _this.allDevice[i].showFlag = false;
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
</style>
<style>
.el-progress-circle {
    height: 100px !important;
    width: 100px !important;
}
</style>
