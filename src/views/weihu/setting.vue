<template>
    <div id="setting" class="wrapper">
        <div class="leftBlock">
        	<div v-for="(item,index) of leftbars">
	            <router-link :to="{path:item.url}" class="first-list type1">
		            <p class="first-item" :class="{selected:$route.fullPath==item.url}">
		              {{item.tit}}
		            </p>
		        </router-link>
        	</div>
        </div>
        <div class="rightBlock" v-if="$route.path.indexOf('item')>0">
            <router-view></router-view>
        </div>
        <div class="rightBlock" v-if="$route.path.indexOf('item')<0">
            <div class="rightTabbar">
                <div class="rt-item rtItemSelect">
                    设置	
                </div>
                <div class="rt-handle">
                    <div class="handle-item">
                        <button type="button" name="button" @click="search">搜索</button>
                    </div>	
                    <div class="handle-item">
                        <input type="text" placeholder="" v-model="keyWords">
                    </div>
                    <div class="handle-item">
                        <button type="button" name="button" @click="del(2)">批量删除</button>
                    </div>
                    <div class="handle-item">
                        <button type="button" name="button" @click="add(1)">增加设置</button>
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
                            <col width="9">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>
                                    <input type='checkbox' v-model='checked' v-on:change='checkedAll'>
                                </th>
                                <th>序号</th>
                                <th>启用</th>
                                <th>项目名称</th>
                                <th>保养内容</th>
                                <th>保养周期</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="list-container" ref="list">
                    <div class="">
                        <table class="list" border="1" cellspacing="0" cellpadding="0" :style="{width: width+'px'}">
                        <colgroup>
                            <col width="4">
                            <col width="4">
                            <col width="10">
                            <col width="11">
                            <col width="7">
                            <col width="11">
                            <col width="9">
                        </colgroup>
                        <tbody class="list-con">
                            <tr v-if="list.length>0" class="list-con-item" v-for="(item,index) of list">
                                <td>
                                    <input type="checkbox" name="checkboxinput" v-model='checkboxModel' :value="item.id">
                                </td>
                                <td v-if="index<9"> {{pageNum-1}}{{index+1}} </td>
                                <td v-else>{{index+1}} </td>
                                <td>
                                    {{item.isstar==1?'是':'否'}}
                                </td>
                                <td>{{item.maintainname}}</td>
                                <td>{{item.maintaincontent}}</td>
                                <td>{{item.maintainsettime}}</td>
                                <td>
                                    <a href="javascript:;" class="mode" @click="del(1,item)">删除</a>
                                    <a href="javascript:;" class="mode" @click="add(2,item)">编辑</a>
                                </td>
                            </tr>
                            <tr v-if="list.length==0">
                                <td colspan="10">暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div class="downpage">
                <pages-v :pageNum="pageNum" :pageSize="pagesize" :total="total" v-on:pagechange="pagechange" v-on:selectall="selectall"></pages-v>
            </div>
        </div>
        <step-v v-if="showStep==1" v-on:close="close" v-on:submitSuccess="submitSuccess"></step-v>
        <steptwo-v v-if="showStep==2" v-on:close="close"></steptwo-v>
    </div>
</template>
<script>
import pages from '../../components/pages.vue';
import step from './step.vue';
import step2 from './step2.vue';
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
            keyWords: '',
            width: '',
            leftbars: [{
                tit: '设置',
                url: '/weihu/setting'
              },
              {
                tit: '告警处理',
                url: '/weihu/warn'
              },
              {
                tit: '处理登记',
                url: '/weihu/dispose'
              },
              {
                tit: '历史查询',
                url: '/weihu/history'
              }
            ],
            showStep: -1,
        }
    },
    components: {
        'pages-v': pages,
        'step-v': step,
        'steptwo-v': step2,
    },
    filters:{
        cutTime(val){
            return Util.dateTime(val,'date')
        }
    },
    computed: {
    },
    watch: {
        '$route' (to, from) {
            console.log(to)
            if(to.path.indexOf('item')<0){
                this.pageNum = 1;
                this.getList();
            }
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
    	close(){
    		this.showStep = 3;
    	},
    	submitSuccess(val){
    		if(val == 1){
    			this.showStep = 2;
    		}
    	},
        search(){
            this.pageNum = 1;
            this.getList();
        },
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
                
            }else{
            	this.showStep = 1;
            };
            
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
                url : '/maintain/getMaintainContentList',
                params: {
                    currentpage: this.pageNum,
                    pagesize: this.pagesize,
                    clientid: _this.$route.query.clientid,
                    monitorplacenameorinstallname: this.keyWords,
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
        },
    },
    created() {
    	this.getList()
    },
    mounted() {
        this.width = this.$refs.list.getBoundingClientRect().width - 17;
        let _this = this;
        window.onresize = function(){
            _this.width = _this.$refs.list.getBoundingClientRect().width - 17;
        }
    }
}
</script>
<style lang="scss" scoped>
#setting {
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
    .selected{
	    background: none;
	    background: #2899ee;
	    color: #fff;
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
