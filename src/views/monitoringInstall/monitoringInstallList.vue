<template>
    <div id="monitoringRunList">
        <div class="rightTabbar">
            <div class="rt-item rtItemSelect">
                监控列表
            </div>
            <div class="rt-handle">
                <div class="handle-item">
                    <button type="button" name="button">搜索</button>
                </div>
                <div class="handle-item">
                    <input type="text" name="" value="">
                </div>
                <div class="handle-item">
                    <button type="button" name="button" @click="del(2)">批量删除</button>
                </div>
                <div class="handle-item">
                    <button type="button" name="button" @click="add(1)">增加监控点</button>
                </div>
            </div>
        </div>
        <div class="content" v-loading.body="loading">
            <div class="list-tit">
                <table class="list" border="1" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col width="4">
                        <col width="4">
                        <col width="10">
                        <col width="11">
                        <col width="7">
                        <col width="11">
                        <col width="17">
                        <col width="9">
                        <col width="9">
                        <col width="9">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                <input type='checkbox' v-model='checked' v-on:change='checkedAll'>
                            </th>
                            <th>序号</th>
                            <th>监控点名称</th>
                            <th>监控器型号</th>
                            <th>监控器UID</th>
                            <th>监控器出厂编号</th>
                            <th>安装单位</th>
                            <th>安装日期</th>
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="list-container">
                <table class="list" border="1" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col width="4">
                        <col width="4">
                        <col width="10">
                        <col width="11">
                        <col width="7">
                        <col width="11">
                        <col width="17">
                        <col width="9">
                        <col width="9">
                        <col width="9">
                    </colgroup>
                    <tbody class="list-con">
                        <tr class="list-con-item" v-for="(item,index) of list">
                            <td>
                                <input type="checkbox" name="checkboxinput" v-model='checkboxModel' :value="item.id">
                            </td>
                            <td v-if="index<9"> {{pageNum-1}}{{index+1}} </td>
                            <td v-else>{{index+1}} </td>
                            <td>
                                <router-link to="/monitoringInstall/item">
                                    {{item.monitorplacename}}
                                </router-link>
                            </td>
                            <td>{{item.monitormodel}}</td>
                            <td>{{item.monitoruid}}</td>
                            <td>{{item.monitorno}}</td>
                            <td>{{item.installname}}</td>
                            <td>{{item.createtime | cutTime}}</td>
                            <td>{{item.remark}}</td>
                            <td>
                                <a href="javascript:;" class="mode" @click="del(1,item)">删除</a>
                                <a href="javascript:;" class="mode" @click="add(2,item)">编辑</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="downpage">
            <pages-v :pageNum="pageNum" :pageSize="pagesize" :total="total" v-on:pagechange="pagechange" v-on:selectall="selectall"></pages-v>
        </div>
        <step-v v-if="firstStepAlert.state > 0"></step-v>
    </div>
</template>
<script>
import pages from '../../components/pages.vue';
import step from './step.vue';
import { Util } from '../../lib/util.js'
export default {
    data() {
        return {
            pageNum: 1,
            pagesize: 10,
            total: 200,
            list: [],
            loading: false,
            checkboxModel:[],
            checked: false,
        }
    },
    components: {
        'pages-v': pages,
        'step-v': step,
    },
    filters:{
        cutTime(val){
            return Util.dateTime(val,'date')
        }
    },
    computed: {
        firstStepAlert() {
            return this.$store.getters.firstStepAlert;
        },
    },
    watch: {
        '$route' (to, from) {
            this.pageNum = 1;
            this.getList();
        },
        'checkboxModel': {
            handler: function (val, oldVal) {
                console.log(this.checkboxModel)
                if (this.checkboxModel.length === this.list.length) {
                    this.checked=true;
                }else{
                    this.checked=false;
                };
            },
            deep: true
        }
    },
    methods: {
        checkedAll() {
            let _this = this;
            if (this.checked) {//实现反选
                _this.checkboxModel = [];
                _this.list.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }else{//实现全选
                _this.checkboxModel = [];
            }
        },
        pagechange(val) {
            console.log(val + '页')
            this.pageNum = val;
            this.getList();
        },
        selectall(val) {
            console.log(val)
        },
        add(type,item) {//1是新增，2是编辑
            if(type == 2){
                this.$store.dispatch('SetAddId',item.id);
            };
            this.$store.dispatch('SetFirstStepAlert', {
                type: type,
                state: 1,
            })
        },
        del(type,item){
            let delname = '';
            if(type==1){//1为单个删除，2为删除多个
                this.checkboxModel = [];
                this.checkboxModel.push(item.id);
                delname = item.monitorplacename;
            }else{
                delname = '多个';
                console.log('more',delname)
            };
            this.$confirm('是否删除'+delname+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                let _this = this;
                let ids = this.checkboxModel.join(',')
                this.api.postN({
                    url: '/monitorplace/deleteMonitorPlaceById',
                    params: {
                        ids: ids,
                    },
                    success: function(res){
                        console.log(res);
                        _this.loading = false;
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            _this.getList();
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getList(){
            let _this = this;
            this.loading = true;
            this.api.postN({
                url : '/monitorplace/findMonitorplaceByConditions',
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
        this.getList();
    },
    mounted() {

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
                background: url("../../assets/img/bg_sheng.png") repeat-x;
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
