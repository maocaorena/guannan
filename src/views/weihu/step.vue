<template>
	<div class="firstStep">
		<alert-v v-on:close="close" v-on:next="next" :btn="btn">
			<span slot="name">{{tit}}设置</span>
			<div class="tep-in" slot="con" v-loading.body="loading">
				<div class="as-item" v-if="nextMessage.type == 1">
					<p class="as-item-tit">
						监控空点选择：
					</p>
					<div class="as-item-con">
						<data-filter v-on:monitorplaceId="getMonId"></data-filter>
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						项目名称：
					</p>
					<div class="as-item-con">
						<input type="text" v-model="message.name" name="" value="">
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						保养内容：
					</p>
					<div class="as-item-con">
						<textarea name="" v-model="message.detail" rows="5" cols="60"></textarea>
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						启用：
					</p>
					<div class="as-item-con flex">
						<input type="radio" name="haha" id="" value="1" v-model="message.state" /><span>是</span>
						<input type="radio" name="haha" id="" value="2" v-model="message.state" /><span>否</span>
					</div>
				</div>
			</div>
		</alert-v>
	</div>
</template>
<script type="text/javascript">
	import alert from '../../components/alert.vue';
	import dataFilter from './dataFilter.vue';
	import { Util } from '../../lib/util.js'
	export default {
		data() {
			return {
				btn: '确认添加',
				tit: '',
				message: {
					name: '',
					detail: '',
					state: 2,
					monitorplaceid: ''
				},
				loading: false
			}
		},
		props: [
			'nextMessage'
		],
		components: {
			'alert-v': alert,
			'dataFilter': dataFilter
		},
		methods: {
			getMonId(id){//三级联动回传id
				this.message.monitorplaceid = id;
			},
			close() { //关闭弹窗
				this.$emit('close', '')
			},
			next() {
				if(this.nextMessage.type == 1) {//新增
					if(this.message.monitorplaceid.length < 1 || this.message.monitorplaceid+'' == 'undefined') {
						this.$message.warning({
							message: '请选择监控点',
							duration: Util.time()
						});
						return;
					};
				};
				
				if(Util.trim(this.message.name).length < 1) {
					this.$message.warning({
						message: '请填写项目名称',
						duration: Util.time()
					});
					return;
				};

				if(Util.trim(this.message.detail).length < 1) {
					this.$message.warning({
						message: '请填写保养内容',
						duration: Util.time()
					});
					return;
				};
				let _url = '';
				let _params = {
					maintainname: this.message.name,
					maintaincontent: this.message.detail,
					isstar: this.message.state,
					monitorplaceid: this.message.monitorplaceid
				};
				if(this.nextMessage.type == 1) {//新增
					_url = '/maintain/setMaintain';
				} else {
					_url = '/maintain/updateMaintainContentById';
					_params.id = this.message.id
				};
				let _this = this;
				this.loading = true;
				this.api.postN({
					url: _url,
					params: _params,
					success: function(res) {
						_this.loading = false;
						if(res.response.info.code == 100000) {
							_this.$message.success({
								message: res.response.info.msg,
								duration: Util.time()
							});
							if(_this.nextMessage.type == 1){
								_this.$emit('submitSuccess', {
									step: 1,
									id: res.response.content.id,
									type: _this.nextMessage.type
								})
							}else{
								_this.$emit('submitSuccess', {
									step: 1,
									id: _this.message.id,
									type: _this.nextMessage.type
								})
							}
						}
					}
				})
			},
			getMessageById() {
				let _this = this;
				this.loading = true;
				this.api.postN({
					url: '/maintain/getMaintainContentById',
					params: {
						id: _this.nextMessage.id
					},
					success: function(res) {
						_this.loading = false;
						console.log(res);
						if(res.response.info.code == 100000) {
							
						} else {
							_this.$message.error({
								message: res.response.info.msg,
								duration: Util.time()
							});
						}
					}
				})
			}
		},
		created() {
			if(this.nextMessage.type == 1) {
				this.tit = '增加'
			} else {
				this.tit = '修改';
				this.btn = "确认修改";
				this.message = {
					name: this.nextMessage.message.maintainname,
					detail: this.nextMessage.message.maintaincontent,
					state: this.nextMessage.message.isstar,
					id: this.nextMessage.message.id,
				};
			}
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
	}
</style>