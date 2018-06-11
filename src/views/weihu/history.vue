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
        <div class="rightBlock" v-if="$route.path.indexOf('item')<0">
            <div class="rightTabbar">
                <div class="rt-item rtItemSelect">
                    历史查询	
                </div>
                <div class="rt-handle">
                    <div class="handle-item">
                        <button type="button" name="button" @click="search">搜索</button>
                    </div>	
                    <div class="handle-item">
                        <input type="text" placeholder="" v-model="keyWords">
                    </div>
                </div>
            </div>
            <div class="content" v-loading.body="loading">
                <div class="list-tit">
                    <table class="list" border="1" cellspacing="0" cellpadding="0">
                        <colgroup>
                            <col width="4">
                            <col width="10">
                            <col width="10">
                            <col width="11">
                            <col width="7">
                            <col width="11">
                            <col width="9">
                            <col width="11">
                            <col width="7">
                            <col width="11">
                            <col width="9">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>项目名称</th>
                                <th>保养周期</th>
                                <th>保养内容</th>
                                <th>处理方案</th>
                                <th>指派</th>
                                <th>处理意见</th>
                                <th>处理结果</th>
                                <th>告警时间</th>
                                <th>处理时间</th>
                                <th>登记时间</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="list-container" ref="list">
                    <div class="">
                        <table class="list" border="1" cellspacing="0" cellpadding="0" :style="{width: width+'px'}">
                        <colgroup>
                            <col width="4">
                            <col width="10">
                            <col width="10">
                            <col width="11">
                            <col width="7">
                            <col width="11">
                            <col width="9">
                            <col width="11">
                            <col width="7">
                            <col width="11">
                            <col width="9">
                        </colgroup>
                        <tbody class="list-con">
                            <tr v-if="list.length>0" class="list-con-item" v-for="(item,index) of list">
                                <td v-if="index<9"> {{pageNum-1}}{{index+1}} </td>
                                <td v-else>{{index+1}} </td>
                                <td>
                                    {{item.maintainname}}
                                </td>
                                <td>{{item.maintainplan}}</td>
                                <td>{{item.maintaincontent}}</td>
                                <td>{{item.domethod}}</td>
                                <td>{{item.assign}}</td>
                                <td>{{item.advice}}</td>
                                <td>{{item.doresult}}</td>
                                <td>{{item.alerttime}}</td>
                                <td>{{item.dotime}}</td>
                                <td>{{item.registertime}}</td>
                            </tr>
                            <tr v-if="list.length==0">
                                <td colspan="11">暂无数据</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div class="downpage">
                <pages-v :pageNum="pageNum" :pageSize="pagesize" :total="total" v-on:pagechange="pagechange"></pages-v>
            </div>
        </div>
    </div>
</template>
<script>
import pages from '../../components/pages.vue';
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
        }
    },
    components: {
        'pages-v': pages,
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
    },
    methods: {
        search(){
            this.pageNum = 1;
            this.getList();
        },
        pagechange(val) {
            console.log(val + '页')
            this.pageNum = val;
            this.getList();
        },
        getList(){
            let _this = this;
            this.loading = true;
            this.api.postN({
                url : '/maintain/historyDataQuery',
                params: {
                    currentpage: this.pageNum,
                    pagesize: this.pagesize,
                    condationname: this.keyWords
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
    	this.getList();
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
    .first-item {
            color: #000;
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
