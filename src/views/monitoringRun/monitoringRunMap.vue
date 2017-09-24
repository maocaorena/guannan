<template>
    <div id="monitoringRunMap" class="wrapper">
        <div class="leftBlock">
            <div class="first-list type1" v-for="(item,index) of leftbars">
                <p class="first-item">
                    <img class="leftIcon" src="../../assets/img/leftbar/icon_sheng.png" alt="">
                    {{item.province}}
                </p>
                <ul class="second-list">
                    <router-link class="second-item"
                        :class="{selected:$route.query.clientid==second.clientid}"
                        :to="{path:'/monitoringRun/map',query:{clientid: second.clientid}}"
                        tag="li"
                        :key="second.clientid"
                        v-for="(second,index2) of item.clientList">
                        <img class="leftIcon" src="../../assets/img/leftbar/icon_gongsi.png" alt="">
                        {{second.clientname}}
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="rightBlock">
            <div class="rightTabbar">
                <div class="rt-item rtItemSelect">
                    监控列表
                </div>
                <div class="rt-handle">
                    <div class="handle-item">
                    	<router-link to="/monitoringRun/list">
                    		<button type="button" name="button">列表模式</button>
                    	</router-link>
                    </div>
                    <div class="handle-item">
                        <button type="button" name="button">搜索</button>
                    </div>
                    <div class="handle-item">
                        <input type="text" name="" value="">
                    </div>
                </div>
            </div>
            <div class="content" style="border:1px solid #ccc;">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leftbars: [],
        }
    },
    components:{

    },
    methods:{
        getBar(){
            let _this1 = this;
            this.api.postN({
                url : "/client/findProvinceAndCompanys",
                success: function(res){
                    let _res = res.response;
                    if(_res.info.code == 100000){
                        _this1.leftbars = _res.content;
                        console.log(_this1.$route.path.indexOf('item'))
                        if(!_this1.$route.query.clientid && _this1.$route.path.indexOf('item')<0){
                            _this1.$router.replace({path:'/monitoringRun/map',query:{clientid: _res.content[0].clientList[0].clientid}})
                        }
                    }
                }
            });
        }
    },
    created(){
        this.getBar();
    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunMap{
       	.rightTabbar{
            width: 100%;
            height: 30px;
            border-bottom: 4px solid #2899ee;
            .rt-item{
                margin-right: 3px;
                float: left;
                width: 120px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                border: 1px solid #cfdde7;
                border-bottom: 0;
                cursor: pointer;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .rtItemSelect{
                background: #2899ee;
                border-color: #2899ee;
                color: #fff;
            }
            .rt-handle{
                float: right;
                width: 400px;
                height: 30px;
            }
            .handle-item{
                float: right;
                margin-left: 10px;
                button{
                    height: 24px;
                    line-height: 24px;
                    padding: 0 7px;
                    border: 1px solid #CFDDE7;
                    border-radius: 3px;
                    background: url(../../assets/img/bg_sheng.png) repeat-x;
                    font-size: 12px;
                    color: #2899EE;
                    cursor: pointer;
                }
                input{
                    padding: 4px;
                    width: 150px;
                    height: 24px;
                    border: 1px solid #CFDDE7;
                    border-radius: 3px;
                }
            }
        }
    }
</style>
