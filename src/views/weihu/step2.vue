<template>
	<div class="firstStep">
		<alert-v v-on:close="close" v-on:next="next" :btn="btn">
			<span slot="name">{{secondMessage.type == 1?'增加':'修改'}}设置</span>
			<div class="tep-in" slot="con">
				<div class="content">
					<div class="list-tit">
						<table class="list" border="1" cellspacing="0" cellpadding="0">
							<colgroup>
								<col width="4">
								<col width="10">
								<col width="11">
								<col width="7">
							</colgroup>
							<thead>
								<tr>
									<th>序号</th>
									<th>保养计划</th>
									<th>时间来源</th>
									<th>操作</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="list-container" style="overflow-y: scroll;">
						<table class="list" border="1" cellspacing="0" cellpadding="0">
							<colgroup>
								<col width="4">
								<col width="10">
								<col width="11">
								<col width="7">
							</colgroup>
							<tbody class="list-con">
								<tr v-for="(item,index) of list" class="list-con-item">
									<td>
										{{index}}
									</td>
									<td>
										{{item.maintainplan}}小时
									</td>
									<td>{{item.timesource}}</td>
									<td>
										<a href="javascript:;" class="mode" @click="dele(item)">删除</a>
										<a href="javascript:;" class="mode" @click="add(2,item)">编辑</a>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="add-module" type="button" name="button" @click="add(1)">请添加信息</button>
					</div>
				</div>
			</div>
		</alert-v>
		<stepin-v v-if="showAdd" :tomessage="message" v-on:submitSuccess="submitSuccess" v-on:close="closeAdd"></stepin-v>
	</div>
</template>
<script type="text/javascript">
	import alert from '../../components/alert.vue';
	import step3 from './step3.vue';
	import { Util } from '../../lib/util.js'
	export default {
		data() {
			return {
				btn: '确认',
				message: {
					name: '',
					detail: '',
					state: 2,
				},
				showAdd: false,
				list: [],
				message: {},
			}
		},
		props:[
			'secondMessage'
		],
		components: {
			'alert-v': alert,
			'stepin-v': step3,
		},
		methods: {
			getList(){//根据id获取保养计划列表
				let _this = this;
                this.loading = true
                this.api.postN({
                    url: '/maintain/getTimePlan',
                    params: {
                        maintainid: _this.secondMessage.id
                    },
                    success: function(res){
                        _this.loading = false;
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            if(res.response.content){
                                _this.list = res.response.content;
                            }else{
                                _this.list = [];
                            }
                        }else{
                            _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                        }
                    }
                })
			},
			close() { //关闭弹窗
				this.$emit('close', '')
			},
			next() {
				this.$emit('submitSuccess',{
                	step: 2,
                })
			},
			add(type,item){
				if(type==1){//新增
					this.message = {
						type: 1,
						id: this.id,
					}
					this.showAdd = true;
				}else{//编辑
					this.message = {
						type: 2,
						id: this.id,
						item: item,
					}
					this.showAdd = true;
				}
			},
			dele(item){
				let _this = this;
                this.loading = true
                this.api.postN({
                    url: '/maintain/deleteTimePlan',
                    params: {
                        ids: item.id,
                    },
                    success: function(res){
                        _this.loading = false;
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            _this.getList();
                        }else{
                            _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                        }
                    }
                })
			},
			submitSuccess(){
				console.log('ffff')
				this.showAdd = false;
				this.getList();
			},
			closeAdd(){
				this.showAdd = false;
			}
		},
		created() {
			console.log(this.secondMessage)
			this.getList();
		}
	}
</script>
<style lang="scss">
	.firstStep {
		.tep-in {
			width: 100%;
			padding-top: 7px;
			.tep-bar {
				width: 100%;
				height: 30px;
			}
			.tep-bar-item {
				float: left;
				margin-right: 5px;
				height: 30px;
				padding: 0 10px;
				font-size: 12px;
				color: #999999;
				line-height: 28px;
				border: 1px solid #CFDDE7;
				border-bottom: none;
				border-radius: 3px 3px 0 0;
				cursor: pointer;
			}
			.select {
				background: #2899EE;
				border-color: #2899EE;
				color: #fff;
			}
		}
		.as-item {
			position: relative;
			margin-bottom: 5px;
			width: 100%;
			min-height: 24px;
			padding: 1px 0;
			font-size: 12px;
			color: #666666;
		}
		.as-item-tit {
			position: absolute;
			top: 0;
			left: 0;
			width: 115px;
			height: 100%;
			line-height: 24px;
			text-align: right;
		}
		.as-item-con {
			padding-left: 120px;
			width: 100%;
			height: 100%;
			text-align: left;
			input,
			select {
				padding: 0 5px;
				width: 440px;
				height: 24px;
				background: #FFFFFF;
				border: 1px solid #D3D3D3;
				border-radius: 2px;
			}
			input[type=radio] {
				width: 20px;
			}
			span {
				position: relative;
				bottom: 8px;
			}
			button {
				width: 100px;
				height: 24px;
				background: #FF7800;
				border-radius: 2px;
				font-size: 12px;
				color: #fff;
				cursor: pointer;
			}
		}
		textarea {
			resize: none;
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
</style>