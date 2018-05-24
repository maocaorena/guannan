<template>
    <div class="secondAdd">
        <alert-v v-on:close="close" v-on:next="next" :btn="btn">
            <span slot="name">模块信息列表-{{tittxt}}模块</span>
            <div class="tep-in" slot="con">
                <div class="content" v-loading.body="loading">
        			<div class="list-tit">
        				<table class="list" border="1" cellspacing="0" cellpadding="0">
        					<colgroup>
                                <col width="2" v-if="secondAdd.type == 1">
        						<col width="4">
        						<col width="10">
        						<col width="11">
                                <col width="11">
        						<col width="7">
        					</colgroup>
        					<thead>
        						<tr>
                                    <th v-if="secondAdd.type == 1">
                                        <input type='checkbox' v-model='checked' v-on:change='checkedAll'>
                                    </th>
        							<th>序号</th>
                                    <th>通信模块类型</th>
                                    <th>通信模块型号</th>
        							<th>通信模块名称</th>
        							<th>通信模块地址</th>
        						</tr>
        					</thead>
        				</table>
        			</div>
        			<div class="list-container" style="overflow-y: scroll;">
        				<table class="list" border="1" cellspacing="0" cellpadding="0">
        					<colgroup>
                                <col width="2" v-if="secondAdd.type == 1">
                                <col width="4">
        						<col width="10">
        						<col width="11">
        						<col width="11">
        						<col width="7">
        					</colgroup>
        					<tbody class="list-con">
        						<tr v-for="(item,index) of list" class="list-con-item">
                                    <td v-if="secondAdd.type == 1">
                                        <input type="checkbox" name="checkboxinput" v-model='checkboxModel' :value="item.idx">
                                    </td>
        							<td>
                                        {{index+1}}
        							</td>
        							<td>
                                        {{item.modulename||item.communicatetype}}
                                    </td>
        							<td>
                                        <select class="width80" name="" v-model="item.communicatemodel" v-if="showSelect">
                                            <option :value="item1.model" v-for="item1 of module['type' + (index+1)]">{{item1.model}}</option>
                                        </select>
                                        <select class="width80" name="" v-model="item.communicatemodel" v-if="showSelect1">
                                            <option :value="item1.model" v-for="item1 of editmoduleList">{{item1.model}}</option>
                                        </select>
                                    </td>
        							<td>
                                        <input class="width80" type="text" v-model="item.communicatename">
                                    </td>
        							<td>
                                        <input class="width80" type="text" v-model="item.communicateaddress">
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
    import { getToken } from '../../lib/auth.js';
    export default{
        data(){
            return{
                btn: '确定添加',
                tittxt: '添加',
                list: [],
                module: {},
                checkboxModel:[],//选中的id
                checked: false,//全选的状态
                showSelect: false,
                showSelect1: false,
                showSelectList: [],
                loading: false,
                editmoduleList: [],
            }
        },
        computed:{
            secondAdd(){
                return this.$store.getters.secondAdd;
            },
            addid(){
                return this.$store.getters.addid;
            },
            secondAddMessage(){
                return this.$store.getters.secondAddMessage;
            }
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
            },
            'showSelectList': {
                handler: function (val, oldVal) {
                    if(this.showSelectList.length == 5){
                        this.showSelect = true;
                    }
                },
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
            findAllModuleModel(){
                let _this = this;
                this.loading = true;
                this.api.postN({
                    url: '/modulemodel/findAllModuleModel',
                    success: function(res){
                        if(res.response.info.code==100000){
                            _this.loading = false;
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            let _addid = _this.addid;
                            if(res.response.content){
                                for (let i = 0; i < res.response.content.length; i++) {
                                    res.response.content[i].idx = i;
                                    res.response.content[i].monitorplaceid = _addid;
                                    res.response.content[i].communicatename = '';
                                    res.response.content[i].communicateaddress = '';
                                    res.response.content[i].communicatemodel = '';
                                };
                                _this.list = res.response.content;
                            }else{
                                _this.list = [];
                            }
                        }
                    }
                })
            },
            close(){
                this.$store.dispatch('SetSecondAddAlert',{
                    state: false,
                });
            },
            next(){
                //提交编辑或者新增的信息到vuex
                let subList = [];
                let _this = this;
                if(this.secondAdd.type == 1){
                    for (let i = 0; i < this.checkboxModel.length; i++) {
                        this.list[this.checkboxModel[i]].communicatetype = this.list[this.checkboxModel[i]].modulename;
                        let bb = JSON.parse(JSON.stringify(this.list[this.checkboxModel[i]]))
                        delete bb.id;
                        subList.push(bb);
                    };
                    console.log(subList)
                    this.loading = true;
                    this.api.postN({
                        url: '/module/setModuleInfo',
                        params: {
                            moduleinfos: JSON.stringify(subList),
                            systemId: JSON.parse(getToken()).systemId
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
                        },
                        error: function(){
                            _this.loading = false;
                        }
                    })
                }else{
                    subList = this.list;
                    this.loading = true;
                    this.api.postN({
                        url: '/module/updateModuleInfo',
                        params: {
                            moduleinfos: JSON.stringify(subList),
                            systemId: JSON.parse(getToken()).systemId
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
                        },
                        error: function(){
                            _this.loading = false;
                        }
                    })
                };
                console.log(JSON.stringify(subList));
            },
            getModuleById(type){
                let _this = this;
                this.api.postN({
                    url: "/modulemodel/findModuleModelByModuleId",
                    params: {
                        moduleid: type
                    },
                    success: function(res){
                        console.log(res)
                        if(res.response.info.code==100000){
                            if(_this.secondAdd.type == 2){
                                _this.showSelect1 = true;
                                _this.editmoduleList = res.response.content
                            }else{
                                _this.module['type' + type] = res.response.content;
                                _this.showSelectList.push(type);

                            }
                        }
                    }
                })
            },
            findModuleInfoById(id){
            	let _this = this;
                this.api.postN({
                    url: "/module/findModuleInfoById",
                    params: {
                        moduleid: id
                    },
                    success: function(res){
                        console.log(res)
                        if(res.response.info.code==100000){
                        	console.log('res.response.content',res.response.content)
                        	_this.list.push(res.response.content) 
                        }
                    }
                })
            }
        },
        created(){
            console.log('1111',this.secondAdd.type)
            if(this.secondAdd.type == 2){
                let _list = JSON.parse(JSON.stringify(this.secondAddMessage.message));
                this.tittxt = '修改';
                this.btn = '确定修改';
                _list.monitorplaceid = this.addid;
                this.checkboxModel.push(0);
//              this.list.push(_list);
                console.log(_list)
                this.getModuleById(_list.moduleid);
                this.findModuleInfoById(_list.id)
            }else{
                this.findAllModuleModel();
                for (let i = 0; i < 5; i++) {
                    this.getModuleById(i+1);
                }
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
        .width80{
            width: 80%;
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
                td:nth-last-child(2){
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
