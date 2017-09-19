<template>
    <div id="monitoringRunList">
        <div class="rightTabbar">
            <div class="rt-item rtItemSelect">
                监控列表
            </div>
            <div class="rt-handle">
                <div class="handle-item">
                    <router-link to="/monitoringRun/map">
                        <button type="button" name="button">地图模式</button>
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
        <div class="content" v-loading.body="loading">
            <div class="list-tit">
                <table class="list" border="1" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col width="4">
                        <col width="14">
                        <col width="11">
                        <col width="11">
                        <col width="7">
                        <col width="11">
                        <col width="7">
                        <col width="9">
                        <col width="9">
                        <col width="9">
                        <col width="9">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>公司名称</th>
                            <th>监控点名称</th>
                            <th>监控点UID</th>
                            <th>环境温度</th>
                            <th>进气滤网负压</th>
                            <th>出气压力</th>
                            <th>出气温度</th>
                            <th>润滑油油压</th>
                            <th>润滑油油温</th>
                            <th>变频器频率</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="list-container">
                <table class="list" border="1" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col width="4">
                        <col width="14">
                        <col width="11">
                        <col width="11">
                        <col width="7">
                        <col width="11">
                        <col width="7">
                        <col width="9">
                        <col width="9">
                        <col width="9">
                        <col width="9">
                    </colgroup>
                    <tbody class="list-con">
                        <tr class="list-con-item" v-for="(item,index) of list">
                            <td v-if="index<9"> {{pageNum-1}}{{index+1}} </td>
                            <td v-else> {{index+1}} </td>
                            <td>
                                <router-link to="/monitoringRun/item">
                                     {{item.clientname}}
                                </router-link>
                            </td>
                            <td> {{item.monitorplacename}} </td>
                            <td> {{item.monitoruid}} </td>
                            <td> {{item.temp}} </td>
                            <td> {{item.infilnegpressure}} </td>
                            <td> {{item.outairpressure}} </td>
                            <td> {{item.outairtemp}} </td>
                            <td> {{item.oilpressure}} </td>
                            <td> {{item.oiltemp}} </td>
                            <td> {{item.tranfrequency}} </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div class="downpage">
            <pages-v :pageNum="pageNum" :pageSize="pageSize" :total="total" v-on:pagechange="pagechange" v-on:selectall="selectall"></pages-v>
        </div>
    </div>
</template>
<script>
import pages from '../../components/pages.vue';
export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 200,
            list: [],
            loading: false,
            checkboxModel:[],
            checked: false,
        }
    },
    components: {
        'pages-v': pages,
    },
    watch:{
        '$route' (to, from) {
            this.pageNum = 1;
            this.getList();
        },
    },
    methods: {
        pagechange(val) {
            console.log(val + '页')
        },
        selectall(val) {
            console.log(val)
        },
        add() {
            this.$store.dispatch('SetFirstStepAlert', 1)
        },
        getList(){
            let _this = this;
            this.loading = true;
            this.api.postN({
                url : '/findmaindata/findMainDataByConditions',
                params: {
                    currentpage: this.pageNum,
                    pagesize: this.pagesize,
                    clientid: _this.$route.query.clientid,
                },
                success: function(res){
                    console.log(res)
                    _this.loading = false;
                    let _res = res.response;
                    if(_res.info.code==100000){
                        _this.list = _res.content.list;
                        _this.total = _res.content.total;
                    }
                }
            })
        }
    },
    created() {
        this.getList()
    }
}

</script>
<style lang="scss" scoped>
#monitoringRunList {
    .rightTabbar {
        width: 100%;
        height: 30px;
        border-bottom: 4px solid #2899ee;
        .rt-item {
            margin-right: 3px;
            float: left;
            width: 120px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            border: 1px solid #cfdde7;
            border-bottom: 0;
            cursor: pointer;
            a {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .rtItemSelect {
            background: #2899ee;
            border-color: #2899ee;
            color: #fff;
        }
        .rt-handle {
            float: right;
            width: 400px;
            height: 30px;
        }
        .handle-item {
            float: right;
            margin-left: 10px;
            button {
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
            input {
                padding: 4px;
                width: 150px;
                height: 24px;
                border: 1px solid #CFDDE7;
                border-radius: 3px;
            }
        }
    }
    .downpage {
        position: absolute;
        bottom: 1px;
        left: 0;
        padding-right: 10px;
        width: 100%;
        height: 30px;
        background: #fff;
    }
}

</style>
