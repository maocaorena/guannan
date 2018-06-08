<template>
    <div class="firstAdd">
        <alert-v v-on:close="close" v-on:next="next" :btn="btn">
            <span slot="name">选择位置</span>
            <div class="tep-in" slot="con">
                <div id="map"></div>
                <div id="myPageTop">
                    <table>
                        <tr>
                            <td>
                                <label>请输入关键字：</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="tipinput"/>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </alert-v>
    </div>
</template>
<script type="text/javascript">
    import alert from '../../components/alert.vue';
    export default {
        data() {
            return {
                btn: '确定',
                jingwei: {

                },
                addrs: '',
            }
        },
        computed: {
            firstAdd() {
                return this.$store.getters.firstAdd;
            },
            firstAddMessage() {
                return this.$store.getters.firstAddMessage;
            },
        },
        components: {
            'alert-v': alert,
        },
        methods: {
            close() {
                this.$store.dispatch('SetFirstAddAlert', {
                    state: false,
                });
            },
            next() {
                //提交编辑或者新增的信息到vuex
                this.$store.dispatch('SetFirstAddMessage', {
                    jingwei: JSON.parse(JSON.stringify(this.jingwei)),
                    addrs: this.addrs,
                });
                console.log('aaaa', this.addrs)
                this.$emit('next', '')
                this.close()
            },
        },
        created() {

        },
        mounted() {
            let _this = this;
            var map = new AMap.Map('map', {
                resizeEnable: true,
                zoom: 11,
                center: [this.firstAddMessage.jingwei.longtitude, this.firstAddMessage.jingwei.latitude]
            });

            //输入提示
            // var autoOptions = {
            //     input: "tipinput"
            // };
            // var auto = new AMap.Autocomplete(autoOptions);
            // var placeSearch = new AMap.PlaceSearch({
            //     map: map
            // });  //构造地点查询类
            // AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
            // function select(e) {
            //     placeSearch.setCity(e.poi.adcode);
            //     placeSearch.search(e.poi.name);  //关键字查询查询
            // }
            // ------------------------------------
            AMap.plugin(['AMap.ToolBar', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'], function() {
                //创建并添加工具条控件
                var toolBar = new AMap.ToolBar();
                map.addControl(toolBar);

                var autoOptions = {
                    input: "tipinput" //使用联想输入的input的id
                };

                var autocomplete = new AMap.Autocomplete(autoOptions);
                var placeSearch = new AMap.PlaceSearch({
                    map: map
                })
                AMap.event.addListener(autocomplete, "select", function(e) {
                    //TODO 针对选中的poi实现自己的功能
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name)
                });

                //实例化Geocoder
                var geocoder = new AMap.Geocoder({
                    city: "010" //城市，默认：“全国”
                });
                var marker = new AMap.Marker({
                    map: map,
                    bubble: true
                })
                map.on('click', function(e) {
                    marker.setPosition(e.lnglat);
                    geocoder.getAddress(e.lnglat, function(status, result) {
                        if (status == 'complete') {
                            console.log(result.regeocode.formattedAddress);
                            _this.addrs = result.regeocode.formattedAddress;
                        }
                    });
                })
            });
            //为地图注册click事件获取鼠标点击出的经纬度坐标
            var clickEventListener = map.on('click', function(e) {
                console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat());
                _this.jingwei = {
                    latitude: e.lnglat.getLat(),
                    longtitude: e.lnglat.getLng(),
                }
                // document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
            });
        }
    }
</script>
<style lang="scss" scoped>
    .firstAdd {
        position: relative;
        z-index: 99999;
        .tep-in {
            height: 100%;
            width: 100%;
            padding-top: 7px;
            position: relative;
        }
        #map {
            width: 100%;
            height: 100%;
        }
        #tip {
            background-color: #ddf;
            color: #333;
            border: 1px solid silver;
            box-shadow: 3px 4px 3px 0px silver;
            position: absolute;
            top: 10px;
            right: 10px;
            border-radius: 5px;
            overflow: hidden;
            line-height: 20px;
        }
        .button-group {
            position: absolute;
            bottom: 20px;
            right: 20px;
            font-size: 12px;
            padding: 10px;
        }
        .button-group .button {
            height: 28px;
            line-height: 28px;
            background-color: #0D9BF2;
            color: #FFF;
            border: 0;
            outline: none;
            padding-left: 5px;
            padding-right: 5px;
            border-radius: 3px;
            margin-bottom: 4px;
            cursor: pointer;
        }
        .button-group .inputtext {
            height: 26px;
            line-height: 26px;
            border: 1px;
            outline: none;
            padding-left: 5px;
            padding-right: 5px;
            border-radius: 3px;
            margin-bottom: 4px;
            cursor: pointer;
        }
        table{
            width: 172px;
        }
        #tip {
            background-color: #fff;
            padding-left: 10px;
            padding-right: 10px;
            position: absolute;
            font-size: 12px;
            right: 10px;
            top: 20px;
            border-radius: 3px;
            border: 1px solid #ccc;
            line-height: 30px;
        }
        .amap-info-content {
            font-size: 12px;
        }
        #myPageTop {
            position: absolute;
            top: 5px;
            right: 10px;
            background: #fff none repeat scroll 0 0;
            border: 1px solid #ccc;
            margin: 10px auto;
            padding: 6px;
            font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
            font-size: 14px;
        }
        #myPageTop label {
            margin: 0 20px 0 0;
            color: #666666;
            font-weight: normal;
        }
        #myPageTop input {
            width: 170px;
        }
        #myPageTop .column2 {
            padding-left: 25px;
        }
    }
</style>