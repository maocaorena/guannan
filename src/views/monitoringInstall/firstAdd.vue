<template>
    <div class="firstAdd">
        <alert-v v-on:close="close" v-on:next="next" :btn="btn">
            <span slot="name">选择位置</span>
            <div class="tep-in" slot="con">
                <div id="map"></div>
                <div id="tip">
                    <input type="text" id="haha" name="keyword" value="请输入关键字：(选定后搜索)" onfocus='this.value=""'/>
                </div>
            </div>
        </alert-v>
    </div>
</template>
<script type="text/javascript">
    import alert from '../../components/alert.vue';
    export default{
        data(){
            return{
                btn: '确定',
                jingwei: {

                },
                addrs: '',
            }
        },
        computed:{
            firstAdd(){
                return this.$store.getters.firstAdd;
            },
            firstAddMessage(){
                return this.$store.getters.firstAddMessage;
            },
        },
        components:{
            'alert-v' : alert,
        },
        methods:{
            close(){
                this.$store.dispatch('SetFirstAddAlert',{
                    state: false,
                });
            },
            next(){
                //提交编辑或者新增的信息到vuex
                this.$store.dispatch('SetFirstAddMessage',{
                    jingwei: JSON.parse(JSON.stringify(this.jingwei)),
                    addrs: this.addrs,
                });
                console.log('aaaa',this.addrs)
                this.$emit('next','')
                this.close()
            },
        },
        created(){

        },
        mounted(){
            let _this = this;
            var map = new AMap.Map('map',{
                resizeEnable: true,
                zoom: 11,
                center: [this.firstAddMessage.jingwei.longtitude,this.firstAddMessage.jingwei.latitude]
            });
            AMap.plugin(['AMap.ToolBar','AMap.Autocomplete','AMap.PlaceSearch','AMap.Geocoder'],function(){
                //创建并添加工具条控件
                var toolBar = new AMap.ToolBar();
                map.addControl(toolBar);

                var autoOptions = {
                    city: "北京", //城市，默认全国
                    input: ""//使用联想输入的input的id
                };
                var autocomplete= new AMap.Autocomplete(autoOptions);
                var placeSearch = new AMap.PlaceSearch({
                    city:'北京',
                    map:map
                })
                AMap.event.addListener(autocomplete, "select", function(e){
                    //TODO 针对选中的poi实现自己的功能
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name)
                });

                //实例化Geocoder
                var geocoder = new AMap.Geocoder({
                    city: "010"//城市，默认：“全国”
                });
                var marker = new AMap.Marker({
                    map:map,
                    bubble:true
                })
                map.on('click',function(e){
                    marker.setPosition(e.lnglat);
                    geocoder.getAddress(e.lnglat,function(status,result){
                        if(status=='complete'){
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
    .firstAdd{
        position: relative;
        z-index: 99999;
        .tep-in{
            height: 100%;
            width: 100%;
            padding-top: 7px;
            position: relative;
        }
        #map{
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
       #tip input[type="text"] {
           height: 25px;
           border: 0;
           padding-left: 5px;
           width: 280px;
           border-radius: 3px;
           outline: none;
       }
    }
</style>
