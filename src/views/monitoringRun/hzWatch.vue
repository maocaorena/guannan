<template>
	<div id="hzWatch">
		<topbar-v></topbar-v>
		<div class="item">
			<p class="tit">{{this.$route.query.name}}</p>
			<div class="con">
				<div class="con-item">
					<p class="con-item-tit">
						实时信息
					</p>
					<div class="con-item-con">
						<div class="bottom-state">
							<div class="bottom-state-col width340">
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('变频器运行频率', 'Hz')">变频器运行频率(Hz)</p>
									<p class="right white">{{message.frequency}}</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('变频器运行时间', 'H')">变频器运行时间(H)</p>
									<p class="right white">{{message.totalDay}}</p>
								</div>
							</div>
							<div class="bottom-state-col width340">
								<div class="bottom-state-item">
									<p class="left width150">变频器运行情况</p>
									<p class="right white">{{message.Transducerstate}}</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150">变频器状态</p>
									<state-v :state="message.Tranalert"></state-v>
								</div>
							</div>
							<div style="clear: both;;"></div>
						</div>
					</div>
				</div>
				<data-v :paramsName="paramsName" :danwei="danwei"></data-v>
			</div>
		</div>
	</div>
</template>

<script>
	import { Util } from '../../lib/util.js';
	import data from './data.vue';
	import topbar from './topBar.vue';
	import state from './state.vue';
	export default {
		data() {
			return {
				deviceUUID: this.$route.query.monitoruid,
				message: {
					tranfrequency: '-',
					bvm: '-',
					Tranalert: '未知',
					Transducerstate: '未知'
				},
				paramsName: '',
				danwei: ''
			}
		},
		components: {
			'data-v' : data,
			'topbar-v': topbar,
			'state-v': state
		},
		methods: {
			getList(name, danwei) {
				this.paramsName = name;
				this.danwei = danwei;
			},
			sendMessage(){
				let _this = this;
	    		this.api.postN({
	                url: '/readmonitordata/readMonitorData',
	                params: {
	                    deviceUUID: this.deviceUUID,
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
			},
		},
		created() {
			let _this = this;
			this.api.createdGoEasy().then(res => {
				res.subscribe('/topic/infocurrentdata', function(respnose) {
					console.log('infocurrentdata，变频器数据', JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage));
					_this.message = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
				});
			});
			this.sendMessage()
		},
		mounted() {
			this.getList('变频器运行频率', 'Hz');
		},
		beforeDestroy(){
		}
	}
</script>

<style lang="scss" scoped>
	#hzWatch {
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
			.con-item {
				width: 100%;
				padding: 10px 0 0;
			}
			.con-item-tit {
				margin-bottom: 10px;
				width: 100%;
				height: 29px;
				border-bottom: 1px solid #eeeeee;
				color: #0f78c9;
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
					width: 120px;
					height: 24px;
					border: 1px solid #2899ee;
					.right-l {
						float: left;
						width: 59px;
						height: 100%;
						text-align: center;
						line-height: 24px;
						background: #2899ee;
						color: #fff;
					}
					.right-r {
						float: left;
						width: 59px;
						height: 100%;
						text-align: center;
						line-height: 24px;
						color: #2899ee;
						background: #e0edfb;
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
