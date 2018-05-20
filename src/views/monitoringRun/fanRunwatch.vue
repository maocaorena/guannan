<template>
	<div id="fanRunwatch">
		<topbar-v></topbar-v>
		<div class="item">
			<p class="tit">{{this.$route.query.name}}</p>
			<div class="con">
				<div class="con-item">
					<p class="con-item-tit">
						实时信息
					</p>
					<div class="con-item-con">
						<div class="switch">
							<div class="left">
								风机控制继电器
							</div>
							<div class="right">
								<div class="right-l" :class="{'isthis':openOrClose==1}" @click="handle('open')">
									开启
								</div>
								<div class="right-l" :class="{'isthis':openOrClose==0}" @click="handle('close')">
									关闭
								</div>
							</div>
						</div>
						<div class="bottom-state">
							<div class="bottom-state-col">
								<div class="bottom-state-item">
									<p class="left">风机运行状态</p>
									<p class="right white">{{message.maintainStatus}}</p>
								</div>
								<div class="bottom-state-item">
									<p class="left">风机运行时间(h)</p>
									<p class="right white">{{message.hours}}</p>
								</div>
								<div class="bottom-state-item">
									<p class="left" @click="getList('风机环境温度','℃')">风机环境温度(℃)</p>
									<p class="right white">{{message.tem}}</p>
								</div>
								<div class="bottom-state-item">
									<p class="left">监控器状态</p>
									<p class="right white">{{message.onlineoroffline=='0'?'在线':'离线'}}</p>
								</div>
							</div>
							<div class="bottom-state-col">
								<div class="bottom-state-item">
									<p class="left">风机故障状态</p>
									<state-v :state="message.fanfault"></state-v>
								</div>
								<div class="bottom-state-item">
									<p class="left">主电机热保护</p>
									<state-v :state="message.thermalmotorfault"></state-v>
								</div>
								<div class="bottom-state-item">
									<p class="left">油雾处理电机</p>
									<state-v :state="'未知'"></state-v>
								</div>
							</div>
							<div class="bottom-state-col width340">
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('进气滤网负压值','mbar')">进气滤网负压值(mbar)</p>
									<p class="right white mr">{{message.infilnegpressure}}</p>
									<state-v :state="message.infilnegpressurefault"></state-v>
								</div>
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('出气压力','KPa')">出气压力(KPa)</p>
									<p class="right white mr">{{message.outairpressure}}</p>
									<state-v :state="message.outairpressurefault"></state-v>
								</div>
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('出气温度','℃')">出气温度(℃)</p>
									<p class="right white mr">{{message.outairtemp}}</p>
									<state-v :state="message.outairtempfault"></state-v>
								</div>
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('润滑油油压','KPa')">润滑油油压(KPa)</p>
									<p class="right white mr">{{message.oilpressure}}</p>
									<state-v :state="message.oilpressurelowfault"></state-v>
								</div>
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('润滑油油温','℃')">润滑油油温(℃)</p>
									<p class="right white mr">{{message.oiltemp}}</p>
									<state-v :state="message.oiltempupfault"></state-v>
								</div>
							</div>
							<div style="clear: both;;"></div>
						</div>
					</div>
				</div>
				<data-v :paramsName="paramsName" :danwei='danwei'></data-v>
			</div>
		</div>
	</div>
</template>

<script>
	import { Util } from '../../lib/util.js';
	import { getToken } from '../../lib/auth.js';
	import data from './data.vue';
	import topbar from './topBar.vue';
	import state from './state.vue';
	export default {
		data() {
			return {
				deviceUUID: this.$route.query.monitoruid,
				openOrClose: '-1',
				message: {
					hours: '-',
					timedetail: '-',
					tem: '-',
					infilnegpressure: '-',
					outairpressure: '-',
					outairtemp: '-',
					oilpressure: '-',
					oiltemp: '-',
					fanfault: '未知',
					thermalmotorfault: '未知',
					infilnegpressurefault: '未知',
					outairpressurefault: '未知',
					outairtempfault: '未知',
					oilpressurelowfault: '未知',
					oiltempupfault: '未知',
					fanfault: '未知',
					fanfault: '未知',
					fanfault: '未知',
					fanfault: '未知',
					fanfault: '未知',
				},
				paramsName: '',
				danwei: ''
			}
		},
		components: {
			'data-v': data,
			'topbar-v': topbar,
			'state-v': state
		},
		methods: {
			handle(state) {
				let _this = this;
				let pw = prompt("请输入密码：");
				if(pw && Util.trim(pw).length > 0) {
					this.api.postN({
						url: '/monitor/' + state + 'Monitor',
						params: {
							deviceUUID: this.deviceUUID,
							passworld: Util.trim(pw),
							id: JSON.parse(getToken()).systemId
						},
						success: function(res) {
							if(res.response.info.code == 100000) {
								_this.$message.success({
									message: '下发命令成功',
									duration: Util.time()
								});
							} else {
								_this.$message.error({
									message: res.response.info.msg,
									duration: Util.time()
								});
							}
						},
						error: function(error) {
							console.log(error)
							_this.$message.error({
								message: '服务器错误',
								duration: Util.time()
							});
						}
					})
				} else {

				}
			},
			getList(name, danwei) {
				this.paramsName = name;
				this.danwei = danwei;
			},
			sendMessage() {
				let _this = this;
				this.api.postN({
					url: '/readmonitordata/readMonitorData',
					params: {
						deviceUUID: this.deviceUUID,
					},
					success: function(res) {
						if(res.response.info.code == 100000) {
							_this.$message.success({
								message: res.response.info.msg,
								duration: Util.time()
							});
						} else {
							_this.$message.error({
								message: res.response.info.msg,
								duration: Util.time()
							});
						}
					},
					error: function(error) {
						_this.$message.error({
							message: '服务器错误',
							duration: Util.time()
						});
					}
				});
			},
		},
		created() {
			let _this = this;
			this.api.createdGoEasy().then(res => {
				res.subscribe('/topic/infocurrentdata', function(respnose) {
					console.log('infocurrentdata,风机运行数据', JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage));
					_this.message = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
				});
			});

			this.api.createdGoEasy().then(res => {
				res.subscribe('/topic/cQueryMonitorStatus', function(respnose) {
					let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
					console.log('cQueryMonitorStatus,风机运行状态', _data);
					_this.openOrClose = _data.reply;
				});
			})
			
			this.api.createdGoEasy().then(res => {
				res.subscribe( ('/topic/openMonitor'), function(respnose) {
					let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
					console.log(state + 'Monitor', _data);
					if(_data.indexOf('打开') > -1) {
						if(_data.indexOf('成功') > -1) {
							_this.openOrClose = 1
						};
					};
				});
			});
			
			this.api.createdGoEasy().then(res => {
				res.subscribe( ('/topic/closeMonitor'), function(respnose) {
					let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
					console.log(state + 'Monitor', _data);
					if(_data.indexOf('关闭') > -1) {
						if(_data.indexOf('成功') > -1) {
							_this.openOrClose = 0
						};
					};
				});
			})
			this.sendMessage()
		},
		mounted() {
			this.getList('风机环境温度', '℃');
		},
		beforeDestroy() {}
	}
</script>

<style lang="scss" scoped>
	#fanRunwatch {
		.item {
			width: 100%;
			margin-top: 10px;
			padding: 0;
			border: 1px solid #CFDDE7;
			.tit {
				width: 100%;
				height: 28px;
				background: #D5E8FD;
				line-height: 28px;
				font-size: 13px;
				color: #2899EE;
				text-indent: 10px;
			}
			.con {
				width: 100%;
				padding: 0 10px;
			}
			.switch {
				width: 100%;
				height: 52px;
				.left {
					float: left;
					width: 104px;
					height: 100%;
					line-height: 42px;
					color: #535353;
				}
				.right {
					float: left;
					margin-top: 8px;
					height: 24px;
					border: 1px solid #2899ee;
					cursor: pointer;
					.right-l {
						float: left;
						width: 59px;
						height: 100%;
						text-align: center;
						line-height: 24px;
						color: #2899ee;
						background: #e0edfb;
					}
					.isthis {
						background: #2899ee;
						color: #fff;
					}
				}
			}
			.bottom-state {
				width: 100%;
				min-height: 75px;
			}
			.bottom-state-col {
				float: left;
				margin-right: 13px;
				width: 200px;
				height: 100%;
			}
			.bottom-state-item {
				width: 100%;
				height: 34px;
				font-size: 12px;
				color: #666666;
				line-height: 30px;
				text-align: center;
				.left {
					float: left;
					margin-right: 8px;
					width: 105px;
					height: 30px;
					border: 1px solid #CFDDE7;
					border-radius: 2px;
					color: #666666;
				}
				.width150 {
					width: 150px;
				}
				.mr {
					margin-right: 8px;
				}
				.right {
					float: left;
					width: 80px;
					height: 30px;
					border-radius: 2px;
				}
				.white {
					border: 1px solid #F6F6F6;
				}
				.allright {
					background: #009d31;
					color: #fff;
				}
				.noknow {
					background: #919eab;
					color: #fff;
				}
				.bad {
					background: #ff0001;
					color: #fff;
				}
				.soheight {
					background: #fefd31;
					color: #4a4a33;
				}
			}
			.width340 {
				width: 330px;
			}
		}
	}
</style>