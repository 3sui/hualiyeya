<!--
 * @Author: your name
 * @Date: 2020-04-28 16:25:21
 * @LastEditTime: 2020-05-27 09:28:29
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
                        <baidu-map class="map" @ready="handler" center="中国" :map-click="false">
                            <bml-marker-clusterer :averageCenter="true">
                                <div v-for="(marker, i) of markers" :key="i">
                                    <bm-marker
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
                                            <p>公司: {{marker.company}}</p>
                                            <p>地址: {{marker.address}}</p>
                                            <p>设备ID: {{marker.deviceId}}</p>
                                            <p>设备状态: 开机</p>
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
const markers = [
    {
        lng: 119.946973,
        lat: 31.772752,
        url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
        company: '江苏常州华丽液压润滑设备有限公司',
        address: '中国 江苏 常州市 三河口',
        deviceId: '10000093803899',

        showFlag: false
    },
    {
        lng: 119.946973,
        lat: 31.772752,
        url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
        company: '江苏常州华丽液压润滑设备有限公司',
        address: '中国 江苏 常州市 三河口',
        deviceId: '10000093803934',

        showFlag: false
    },
    {
        lng: 119.946973,
        lat: 31.772752,
        url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
        company: '江苏常州华丽液压润滑设备有限公司',
        address: '中国 江苏 常州市 三河口',
        deviceId: '10000093803937',
        showFlag: false
    }
];

// for (let i = 0; i < 100; i++) {
//     const position = {
//         lng: Math.random() * 40 + 85,
//         lat: Math.random() * 30 + 21,
//         url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
//         showFlag: false
//     };
//     const position1 = {
//         lng: Math.random() * 40 + 85,
//         lat: Math.random() * 30 + 21,
//         url: 'https://cdn.tipe.io/tipe/tipe-cat-no-text.svg',
//         showFlag: false
//     };
//     if (i % 2 === 0) {
//         markers.push(position);
//     } else {
//         markers.push(position1);
//     }
// }
const carList = [{}];
export default {
    name: 'maps',
    data() {
        return {
            BMap: '',
            map: '',
            markers,
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
        this.fetchDeviceNum();
        this.fetchDeviceStatus();
    },
    methods: {
        handler({ BMap, map }) {
            map.enableScrollWheelZoom(true);
            // map.centerAndZoom('青岛市', 13)
            // 赋值，方便调用，本节没用到
            this.BMap = BMap;
            this.map = map;
            window.console.log(BMap, map);
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
            axios({
                method: 'get',
                url: 'getDeviceInfo',
                query: ''
            });
            console.log(marker);
        },
        //获取企业设备数量
        fetchDeviceNum() {
            axios({
                method: 'get',
                url: '/fetchDeviceNum'
            })
                .then(res => {
                    this.deviceNum = res.data.data;
                })
                .catch();
        },

        //获取企业设备各种状态的数据
        fetchDeviceStatus() {
            axios({
                method: 'get',
                url: '/fetchDeviceStatus'
            })
                .then(res => {
                    this.status = res.data;
                })
                .catch();
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
