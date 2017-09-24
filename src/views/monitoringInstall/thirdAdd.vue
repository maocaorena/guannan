<template>
    <div class="secondAdd">
        <alert-v v-on:close="close" v-on:next="next" :btn="btn">
            <span slot="name">监控参数信息-{{tittxt}}模块</span>
            <div class="tep-in" slot="con">
                <div class="content" v-loading.body="loading">
        			<div class="list-tit">
        				<table class="list" border="1" cellspacing="0" cellpadding="0">
        					<colgroup>
                                <col width="2" v-if="thirdAdd.type == 1">
                                <col width="3">
                                <col width="10">
        						<col width="10">
        						<col width="11">
                                <col width="5">
        					</colgroup>
        					<thead>
        						<tr>
                                    <th>
                                        <input type='checkbox' v-model='checked' v-on:change='checkedAll'>
                                    </th>
                                    <th>序号</th>
                                    <th>监控参数</th>
                                    <th>数据源</th>
                                    <th>数据端口</th>
        							<th>端口状态</th>
        						</tr>
        					</thead>
        				</table>
        			</div>
        			<div class="list-container">
        				<table class="list" border="1" cellspacing="0" cellpadding="0">
        					<colgroup>
                                <col width="2">
                                <col width="3">
                                <col width="10">
        						<col width="10">
        						<col width="11">
                                <col width="5">
        					</colgroup>
        					<tbody class="list-con">
        						<tr v-for="(item,index) of list" class="list-con-item">
                                    <td>
                                        <input type="checkbox" name="checkboxinput" v-model='checkboxModel' :value="item.idx">
                                    </td>
                                    <td>
                                        {{index+1}}
        							</td>
                                    <td>
                                        {{item.name}}
        							</td>
        							<td>
                                        <select class="" name="" v-model="item.datasource">
                                            <option v-for="item2 of dataSourcename" :value="item2.id">{{item2.name}}</option>
                                        </select>
                                    </td>
        							<td>
                                        <select class="" name="" v-model="item.dataport">
                                            <option v-for="item2 of dataPort" :value="item2.id">{{item2.name}}</option>
                                        </select>
                                    </td>
        							<td>
                                        <select class="" name="" v-model="item.portstate">
                                            <option v-for="item1 of portstate" :value="item1.id">{{item1.state}}</option>
                                        </select>
                                    </td>
        						</tr>
        					</tbody>
        				</table>
        			</div>
        		</div>
            </div>
        </alert-v>
    </div>
</template>
<script type="text/javascript">
    import alert from '../../components/alert.vue';
    import { Util } from '../../lib/util.js';
    export default{
        data(){
            return{
                btn: '确定添加',
                tittxt: '添加',
                list: [],
                checkboxModel:[],//选中的id
                checked: false,//全选的状态
                dataPort: [],//数据端口下拉列表
                portstate: [],//端口状态下拉
                dataSourcename: [],//数据源下拉框
                loading: false,
            }
        },
        computed:{
            thirdAdd(){
                return this.$store.getters.thirdAdd;
            },
            addid(){
                return this.$store.getters.addid;
            },
        },
        components:{
            'alert-v' : alert,
        },
        watch:{
            'checkboxModel': {
                handler: function (val, oldVal) {
                    if (this.checkboxModel.length === this.list.length) {
                        this.checked=true;
                    }else{
                        this.checked=false;
                    };
                },
                deep: true
            }
        },
        methods:{
            checkedAll() {
                let _this = this;
                if (this.checked) {//实现反选
                    _this.checkboxModel = [];
                    _this.list.forEach(function(item) {
                        _this.checkboxModel.push(item.idx);
                    });
                }else{//实现全选
                    _this.checkboxModel = [];
                }
            },
            close(){
                this.$store.dispatch('SetThirdAddAlert',{
                    state: false,
                });
            },
            next(){
                let subMessage = [];
                for (let i = 0; i < this.checkboxModel.length; i++) {
                    subMessage.push(this.list[this.checkboxModel[i]]);
                };
                console.log(subMessage);
                this.loading = true;
                let _this = this;
                this.api.postN({
                    url: '/monitornameset/monitornameSet',
                    params: {
                        Monitornameset: JSON.stringify(subMessage)
                    },
                    success: function(res){
                        _this.loading = false;
                        console.log(res);
                    }
                })
                console.log(subMessage)
                // this.close()
            },
            findAllMonitornameModel(){
                let _this = this;
                this.api.postN({
                    url: '/monitornamemodel/findAllMonitornameModel',
                    success: function(res){
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            let _addid = _this.addid;
                            if(res.response.content){
                                for (let i = 0; i < res.response.content.length; i++) {
                                    res.response.content[i].idx = i;
                                    res.response.content[i].datasource = null;
                                    res.response.content[i].dataport = null;
                                    res.response.content[i].portstate = null;
                                    res.response.content[i].monitorplaceid = _addid;
                                };
                                _this.list = res.response.content;
                                console.log(_this.list)
                            }else{
                                _this.list = [];
                            }
                        }
                    }
                })
            },
            findDataPort(){//查询数据端口
                let _this = this;
                this.api.postN({
                    url: '/dataport/findDataPort',
                    success: function(res){
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            if(res.response.content){
                                _this.dataPort = res.response.content;
                            }else{
                                _this.dataPort = [];
                            }
                        }
                    }
                })
            },
            findPortState(){//查询数据端口状态
                let _this = this;
                this.api.postN({
                    url: '/portstate/findPortState',
                    success: function(res){
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            if(res.response.content){
                                _this.portstate = res.response.content;
                            }else{
                                _this.portstate = [];
                            }
                        }
                    }
                })
            },
            findAllDataSourcename(){//查询所有的数据源
                let _this = this;
                this.api.postN({
                    url: '/datasourcename/findAllDataSourcename',
                    success: function(res){
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            if(res.response.content){
                                _this.dataSourcename = res.response.content;
                            }else{
                                _this.dataSourcename = [];
                            }
                        }
                    }
                })
            }
        },
        created(){
            if(this.thirdAdd.type == 2){
                this.tittxt = '修改';
                this.btn = '确定修改';
            };
            this.findAllMonitornameModel();
            this.findDataPort();
            this.findPortState();
            this.findAllDataSourcename();
            console.log('dddd',this.addid)
        }
    }
</script>
<style lang="scss" scoped>
    .secondAdd{
        position: relative;
        z-index: 99999;
        .tep-in{
            width: 100%;
            padding-top: 7px;

        }
        .content{
            top: 7px;
            left: 7px;
            right: 7px;
            bottom: 0;
            border: 1px solid #cfdde7;
            table{
                border: 0;
            }
            th{
                border-top: 0;
            }
            tr{
                th:nth-child(1){
                    border-left: 0;
                }
                td:nth-child(1){
                    border-left: 0;
                }
                td:nth-last-child(1),td:nth-last-child(2),td:nth-last-child(3){
                    padding: 2px;
                    select{
                        width: 100%;
                        height: 100%;
                        border: 1px solid #CFDDE7;
                        border-radius: 2px;
                    }
                }
            }
        }
    }
</style>
