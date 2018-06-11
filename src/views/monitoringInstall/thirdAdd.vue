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
                                    <th  v-if="thirdAdd.type == 1">
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
        			<div class="list-container" style="overflow-y:scroll;">
        				<table class="list" border="1" cellspacing="0" cellpadding="0">
        					<colgroup>
                                <col width="2" v-if="thirdAdd.type == 1">
                                <col width="3">
                                <col width="10">
        						<col width="10">
        						<col width="11">
                                <col width="5">
        					</colgroup>
        					<tbody class="list-con">
        						<tr v-for="(item,index) of list" class="list-con-item">
                                    <td v-if="thirdAdd.type == 1">
                                        <input type="checkbox" name="checkboxinput" v-model='checkboxModel' :value="item.idx">
                                    </td>
                                    <td>
                                        {{index+1}}
        							</td>
                                    <td>
                                        {{item.name}}
        							</td>
        							<td>
                                        <select v-model="item.datasource"  @change="firstChange(item)">
                                            <option v-for="item2 of item.list" :value="item2">{{item2}}</option>
                                        </select>
                                    </td>
        							<td>
                                        <select v-model="item.dataport" :oldPort="item.oldPort" :disabled="item.datasource != '监控器'" @change="secondChange($event,item)">
                                            <option v-for="item3 of dataPort" :disabled="thisStr.indexOf(item3.name)>-1" :value="item3.name">{{item3.name}}</option>
                                        </select>
                                    </td>
        							<td>
                                        <select v-model="item.portstate" :disabled="item.thirdState">
                                            <option v-for="item1 of portstate" :value="item1.state">{{item1.state}}</option>
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
                thisStr: [],
                checkboxModel:[],//选中的id
                checked: false,//全选的状态
                dataPort: [],//数据端口下拉列表
                portstate: [],//端口状态下拉
                dataSourcename: [],//数据源下拉框
                loading: false,
            }
        },
        props:['portList'],
        computed:{
            thirdAdd(){
                return this.$store.getters.thirdAdd;
            },
            addid(){
                return this.$store.getters.addid;
            },
            thirdAddMessage(){
                return this.$store.getters.thirdAddMessage;
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
        	firstChange(item){
        		console.log('sdfsdf',JSON.parse(JSON.stringify(item)))
        		if(item.datasource == '监控器'){
        			item.secondState = false;
                    item.thirdState = false;
        		}else{
        			item.secondState = true;
        			item.thirdState = true;
        			item.dataport = '';
        			item.portstate = '';
        		}
        	},
        	secondChange(e,item){
                if(e){
        		    let oldPort = e.target.getAttribute('oldPort');
        		    this.thisStr.splice(this.thisStr.indexOf(oldPort),1);
                }
        		item.oldPort = item.dataport;
        		for(let i = 0; i < this.dataPort.length; i++){
        			for(let j = 0; j < this.list.length; j++){
        				if(this.list[j].dataport === this.dataPort[i].name){
        					this.thisStr.push(this.dataPort[i].name);
        				};
	        		};
        		};
        		if(item.dataport){
                    console.log(item.dataport.indexOf("DI"))
        			if(item.dataport.indexOf("DI")>=0){
        				item.thirdState = false;
        			}else{
        				item.thirdState = true;
        				item.portstate = '';
        			};
        		}else{
        			item.thirdState = true;
    				item.portstate = '';
        		};
        	},
            checkedAll() {
                let _this = this;
                if (this.checked) {//实现反选
                    _this.checkboxModel = [];
                    _this.list.forEach(function(item) {
                        _this.checkboxModel.push(item.idx);
                    });
                }else{//实现全选
                    _this.checkboxModel = [];
                };
            },
            close(){
                this.$store.dispatch('SetThirdAddAlert',{
                    state: false,
                });
            },
            next(){
                let subMessage = [];
                let _this = this;
                if(this.thirdAdd.type == 1){
                    for (let i = 0; i < this.checkboxModel.length; i++) {
                        let bb = JSON.parse(JSON.stringify(this.list[this.checkboxModel[i]]));
                        delete bb.id;
                        delete bb.idx;
                        delete bb.oldPort;
                        subMessage.push(bb);
                    };
                    this.loading = true;
                    this.api.postN({
                        url: '/monitornameset/monitornameSet',
                        params: {
                            monitornamesets: JSON.stringify(subMessage)
                        },
                        success: function(res){
                            _this.loading = false;
                            if(res.response.info.code==100000){
                                _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                                _this.$emit("addsuccess",'');
                                _this.close();
                            }else{
                                _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                            }
                        }
                    })
                }else{
                    subMessage = JSON.parse(JSON.stringify(this.list));
                    this.loading = true;
                    this.api.postN({
                        url: '/monitornameset/updateMonitornameById',
                        params: {
                            monitornamesets: JSON.stringify(subMessage)
                        },
                        success: function(res){
                            _this.loading = false;
                            if(res.response.info.code==100000){
                                _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                                _this.$emit("addsuccess",'');
                                _this.close();
                            }else{
                                _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                            }
                        }
                    })
                }
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
                                console.log('bb')
                                for (let i = 0; i < res.response.content.length; i++) {
                                    res.response.content[i].idx = i;
                                    res.response.content[i].datasource = null;
                                    res.response.content[i].dataport = '';
                                    res.response.content[i].oldPort = '1';
                                    res.response.content[i].portstate = null;
                                    res.response.content[i].monitorplaceid = _addid;
                                    res.response.content[i].secondState = true;
                                    res.response.content[i].thirdState = true;
                                };
                                _this.list = res.response.content;
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
            },
            findMonitornameById(){
                let _this = this;
                this.loading = true;
                this.api.postN({
                    url: '/monitornameset/findMonitornameById',
                    params:{
                        id: this.thirdAddMessage.message.id
                    },
                    success: function(res){
                        _this.loading = false;
                        if(res.response.info.code==100000){
                    		res.response.content.oldPort = res.response.content.dataport;
                            _this.list.push(res.response.content);
                            _this.secondChange(false,_this.list[0])
                        }
                    }
                })
            }
        },
        created(){
        	this.thisStr = this.portList;
            if(this.thirdAdd.type == 2){
                this.tittxt = '修改';
                this.btn = '确定修改';
                this.findMonitornameById();
                this.findDataPort();
                this.findPortState();
                this.findAllDataSourcename();
            }else{
                this.findAllMonitornameModel();
                this.findDataPort();
                this.findPortState();
                this.findAllDataSourcename();
            };
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
