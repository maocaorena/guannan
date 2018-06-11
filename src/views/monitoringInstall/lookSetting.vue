<template>
	<alert-v v-on:close="close" v-on:next="next" :btn="btn">
		<span slot="name">查看配置</span>
		<div class="tep-in" slot="con">
			<table class="list" style="width: 300px;" border="1" cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<th>监控参数名称</th>
					</tr>
				</thead>
				<tbody class="list-con">
					<tr v-for="(item,index) of list">
						<td>
							{{item.modulename}}
						</td>
					</tr>
				</tbody>
			</table>
			<br>
			<br>
			<table class="list" style="width: 300px;" border="1" cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<th>监控端口名称</th>
					</tr>
				</thead>
				<tbody class="list-con">
					<tr v-for="(item,index) of list1">
						<td>
							{{item.monitorportname}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</alert-v>
</template>

<script>
import alert from '../../components/alert.vue';
import { Util } from '../../lib/util.js';
import $ from 'jquery';
var goEasy = null;
export default {
	data() {
		return {
			btn: '确定',
			list: [],
			list1: [],
			list2: [],
		}
	},
	props:[
		'id'
	],
	components: {
		'alert-v': alert,
	},
	methods: {
		close() {
			this.$emit('close', '')
		},
		next() {
			this.$emit('close', '')
		},
		sendMessage(){
			let _this = this;
			this.api.postN({
				url: '/datasourcequery/monitorModulemonitorParameQuery',
				params: {
					id: this.id,
				},
				success: function(res){
					if(res.response.info.code==100000){
						_this.$message.success({message: res.response.info.msg,duration: Util.time()});
					}else{
						_this.$message.error({message: res.response.info.msg,duration: Util.time()});
					}
				},
				error: function(error){
					_this.$message.error({message: '服务器错误',duration: Util.time()});
				}
			});
		}
	},
	created(){

	},
	mounted(){
		this.sendMessage();
		let that = this;
		this.api.createdGoEasy().then(res => {
			res.subscribe('/topic/modulecommunicate', function(respnose) {
				let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
				that.list.push(_data)
			});
		});
		
		this.api.createdGoEasy().then(res => {
			res.subscribe('/topic/monitornameport', function(respnose) {
				let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
				that.list1.push(..._data)
			});
		});
		
		this.api.createdGoEasy().then(res => {
			res.subscribe('/topic/electricMeterState', function(respnose) {
				let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
				that.list.push(..._data);
			});
		});
		
	},
	beforeDestroy(){
	}
}
</script>

<style lang="scss" scoped>
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
}
</style>
