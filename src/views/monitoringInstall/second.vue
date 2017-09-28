<template>
    <div class="tep-bottom">
        <div class="content">
			<div class="list-tit">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="4">
						<col width="10">
						<col width="11">
						<col width="11">
						<col width="8">
						<col width="7">
					</colgroup>
					<thead>
						<tr>
							<th>序号</th>
							<th>通信模块名称</th>
							<th>通信模块类型</th>
							<th>通信模块型号</th>
							<th>通信模块地址</th>
							<th>操作</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="list-container">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
                        <col width="4">
						<col width="10">
						<col width="11">
						<col width="11">
						<col width="8">
						<col width="7">
					</colgroup>
					<tbody class="list-con">
						<tr v-for="(item,index) of list" class="list-con-item">
							<td>
                                {{index}}
							</td>
							<td>
                                <a href="javascript:;" class="mode">变频器监测模块</a>
                            </td>
							<td>变频器</td>
							<td>ACS580</td>
							<td>58</td>
							<td>
                                <a href="javascript:;" class="mode">删除</a>
                                <a href="javascript:;" class="mode" @click="editmodule">编辑</a>
                            </td>
						</tr>
					</tbody>
				</table>
                <button class="add-module" type="button" name="button" @click="addmodule">请添加信息</button>
			</div>
		</div>
        <secondadd-v v-if="secondAdd.state"></secondadd-v>
    </div>
</template>
<script type="text/javascript">
    import secondadd from './secondAdd.vue';
    import { Util } from '../../lib/util.js';
    export default{
        data(){
            return{
                list: [],
            }
        },
        computed:{
            secondAdd(){
                return this.$store.getters.secondAdd;
            },
            addid(){
                return this.$store.getters.addid;
            },
            firstStepAlert(){//弹窗状态
                return this.$store.getters.firstStepAlert;
            }
        },
        components:{
            "secondadd-v" : secondadd,
        },
        methods:{
            sunmessage(){
                console.log('第二步提交');
                this.$store.dispatch('SetFirstStepAlert',{
                    type: this.firstStepAlert.type,
                    state: 3,
                });
                this.$emit('changeAlert',3)
            },
            addmodule(){//打开新增弹窗
                this.$store.dispatch('SetSecondAddAlert',{
                    state: true,
                    type: 1,
                })
            },
            editmodule(){
                this.$store.dispatch('SetSecondAddAlert',{
                    state: true,
                    type: 2,
                })
            },

            findModuleInfoById(){
                let _this = this;
                this.api.postN({
                    url: '/module/findModuleInfoByMonitorplaceId',
                    params: {
                        id: _this.addid
                    },
                    success: function(res){
                        console.log(res)
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            if(res.response.content){
                                _this.list = res.response.content;
                            }else{
                                _this.list = [];
                            }
                        }
                    }
                })
            }
        },
        created(){
            this.findModuleInfoById()
            console.log(this.addid)
        }
    }
</script>
<style lang="scss" scoped>
    .tep-bottom{
        position: relative;
        width: 100%;
        height: 269px;
        border: 1px solid #CFDDE7;
        .content{
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
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
            }
            .add-module{
                display: block;
                margin-left: 7px;
                margin-top: 12px;
                padding: 0 15px;
                height: 26px;
                background: #FF7800;
                border-radius: 3px;
                font-size: 12px;
                color: #FFFFFF;
                cursor: pointer;
            }
        }
    }
</style>
