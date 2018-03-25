<template>
	<div id="hzWatch">
		<div class="rightTabbar">
			<div class="rt-item">
				<router-link :to="{path:'/monitoringRun/list/item/fanRunwatch',query:{clientid:$route.query.clientid,monitoruid:$route.query.monitoruid}}">
					风机运行监测
				</router-link>
			</div>
			<div class="rt-item">
				<router-link :to="{path:'/monitoringRun/list/item/smartMeters',query:{clientid:$route.query.clientid,monitoruid:$route.query.monitoruid}}">
					智能电表
				</router-link>
			</div>
			<div class="rt-item rtItemSelect">
					变频器运行监测
			</div>
		</div>
		<div class="item">
			<p class="tit">浙江永丰A车间风机</p>
			<div class="con">
				<div class="con-item">
					<p class="con-item-tit">
						实时信息
					</p>
					<div class="con-item-con">
						<div class="bottom-state">
							<div class="bottom-state-col width340">
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('变频器运行频率')">变频器运行频率</p>
									<p class="right white">{{message.tranfrequency}}</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150" @click="getList('变频器运行时间')">变频器运行时间</p>
									<p class="right white">300.2</p>
								</div>
							</div>
							<div class="bottom-state-col width340">
								<div class="bottom-state-item">
									<p class="left width150">变频器运行情况</p>
									<p class="right white">正常</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150">变频器状态</p>
									<p class="right white">正常</p>
								</div>
							</div>
							<div style="clear: both;;"></div>
						</div>
					</div>
				</div>
				<data-v :paramsName="paramsName"></data-v>
			</div>
		</div>
	</div>
</template>

<script>
	import { Util } from '../../lib/util.js';
	import data from './data.vue'
	export default {
		data() {
			return {
				deviceUUID: this.$route.query.monitoruid,
				message: {
					tranfrequency: '-',
					bvm: '-',
				},
				paramsName: ''
			}
		},
		components: {
			'data-v' : data
		},
		methods: {
			getList(name){
				console.log(name)
				this.paramsName = name;
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
			this.api.createdGoEasy().subscribe({
				channel: 'infocurrentdata',
				onMessage: function(message) {
					_this.message = JSON.parse(message.content);
					console.log('infocurrentdata', message.content);
				}
			});
			this.sendMessage()
		},
		mounted() {
			this.getList('变频器运行频率');
		},
		beforeDestroy(){
			this.api.unsubscribe('infocurrentdata');
		}
	}
</script>

<style lang="scss" scoped>
	#hzWatch {
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
		}
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
