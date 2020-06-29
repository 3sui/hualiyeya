<!--
 * @Author: your name
 * @Date: 2020-04-28 16:25:21
 * @LastEditTime: 2020-06-29 16:02:19
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
                        <baidu-map
                            class="map"
                            center="中国"
                            :map-click="false"
                            v-if="allDevice"
                            :scroll-wheel-zoom="true"
                        >
                            <bml-marker-clusterer :averageCenter="true">
                                <div v-for="(marker, i) of allDevice" :key="i">
                                    <bm-marker
                                        :icon="{url: marker.status == '正常'? require('../../../public/bposition.png') :  marker.status == '报警' ? require('../../../public/rposition.png') : require('../../../public/yposition.png'), size: {width: 60, height: 60}}"
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
                                            <p>设备状态: {{marker.is_on == '0'?'关机':'开机'}}</p>
                                            <p>设备报警: {{marker.status}}</p>
                                            <el-button
                                                class="my-2"
                                                @click="showDrawer(marker.id)"
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
                            <p>设备总数</p>
                        </div>
                        <div class="info-one">
                            <!-- <el-progress type="circle" :percentage="100"></el-progress> -->
                            <div>
                                <p>{{run}}</p>
                                <p>运行设备数</p>
                            </div>
                        </div>
                        <div class="info-one">
                            <!-- <el-progress type="circle" :percentage="0"></el-progress> -->
                            <div>
                                <p>{{bed}}</p>
                                <p>异常设备数</p>
                            </div>
                        </div>
                        <div class="info-one">
                            <!-- <el-progress type="circle" :percentage="0"></el-progress> -->
                            <div>
                                <p>{{repair}}</p>
                                <p>累计维修数</p>
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
                    <el-image
                        v-for="(item, index) in imgList"
                        :key="index"
                        style="width: 100px; height: 100px"
                        :src="axios.defaults.baseURL.slice(0, -4) + item.file_path.split('.').shift()"
                        fit="scale-down"
                    ></el-image>
                </div>
                <div class="fs-lg device_info">
                    <p>设备id: {{drawerData.eq}}</p>
                    <p>设备名称: {{drawerData.device_name}}</p>
                    <p>设备型号: {{drawerData.device_model}}</p>
                    <p>工作状态: {{drawerData.status}}</p>
                    <p>设备地址: {{drawerData.address}}</p>
                    <p>设备负责人: {{drawerData.username}}</p>
                </div>

                <el-button
                    @click="$router.push({path: '/ProductDetails', query: {
                        id: drawerData.id
                    }})"
                >跳转到详情页</el-button>
                <div class="d-flex flex-column ai-start jc-between">
                    <a
                        target="_blank"
                        :href="axios.defaults.baseURL.slice(0, -4) + item.file_path"
                        :underline="false"
                        style="margin-top:15px"
                        v-for="(item, index) in wordList"
                        :key="index"
                    >
                        <el-button size="mini" type="warning">{{item.file_name}} 下载</el-button>
                    </a>
                </div>
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
            deviceNum: 0,
            repair: 0,
            run: 0,
            bed: 0,
            imgList: [],
            wordList: []
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
    },
    methods: {
        //显示侧边栏设备详情
        showDrawer(id) {
            window.console.log(id);
            this.drawerData = this.allDevice.filter(item => {
                return item.id == id;
            })[0];
            axios({
                method: 'get',
                url: '/map/fetchImgList',
                params: {
                    id: id
                }
            }).then(res => {
                if (res.data.success) {
                    window.console.log(res.data);

                    this.imgList = res.data.list.filter(item => {
                        return item.type == 'img';
                    });
                    this.wordList = res.data.list.filter(item => {
                        return item.type == 'word';
                    });
                    window.console.log(this.imgList);
                }
            });
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
                url: '/home/fetchDeviceInfo'
            })
                .then(res => {
                    window.console.log(res);
                    if (res.data.success) {
                        this.repair = res.data.repair;
                        this.unread = res.data.unread;
                        this.read = res.data.read;
                        this.run = res.data.run;
                        this.bed = res.data.bed;
                        this.deviceNum = res.data.deviceNum;
                    }
                })
                .catch(err => {
                    window.console.log(err);
                });
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
.device_info p {
    line-height: 40px;
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
