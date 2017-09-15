<template>
	<div id="fanRunwatch">
		<div class="rightTabbar">
			<div class="rt-item rtItemSelect">
				风机运行监测
			</div>
			<div class="rt-item">
				<router-link to="/monitoringRun/item/smartMeters">
					智能电表
				</router-link>
			</div>
			<div class="rt-item">
				<router-link to="/monitoringRun/item/hzWatch">
					变频器运行监测
				</router-link>
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
						<div class="switch">
							<div class="left">
								风机控制继电器
							</div>
							<div class="right">
								<div class="right-l">
									开启
								</div>
								<div class="right-r">
									关闭
								</div>
							</div>
						</div>
						<div class="bottom-state">
							<div class="bottom-state-col">
								<div class="bottom-state-item">
									<p class="left">风机运行状态</p>
									<p class="right white">开机/停机</p>
								</div>
								<div class="bottom-state-item">
									<p class="left">风机运行时间(h)</p>
									<p class="right white">300.35</p>
								</div>
								<div class="bottom-state-item">
									<p class="left">风机环境温度(℃)</p>
									<p class="right white">35</p>
								</div>
							</div>
							<div class="bottom-state-col">
								<div class="bottom-state-item">
									<p class="left">风机故障状态</p>
									<p class="right allright">正常</p>
								</div>
								<div class="bottom-state-item">
									<p class="left">主电机热保护</p>
									<p class="right allright">正常</p>
								</div>
								<div class="bottom-state-item">
									<p class="left">油雾处理电机</p>
									<p class="right noknow">未知</p>
								</div>
							</div>
							<div class="bottom-state-col width340">
								<div class="bottom-state-item">
									<p class="left width150">进气滤网铀压值</p>
									<p class="right white mr">-128</p>
									<p class="right bad">正常</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150">出气压力</p>
									<p class="right white mr">0.04</p>
									<p class="right soheight">正常</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150">出气温度</p>
									<p class="right white mr">58</p>
									<p class="right allright">过高</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150">润滑油油压</p>
									<p class="right white mr">1.2</p>
									<p class="right soheight">正常</p>
								</div>
								<div class="bottom-state-item">
									<p class="left width150">润滑油油温</p>
									<p class="right white mr">79</p>
									<p class="right allright">正常</p>
								</div>
							</div>
							<div style="clear: both;;"></div>
						</div>
					</div>
				</div>
				<div class="con-item">
					<p class="con-item-tit">
						风机运行状态
					</p>
					<div class="con-item-con">
						<div class="bottom-state">
							<div id="main" style="width: 800px;height: 400px;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	export default {
		data() {
			return {
				chart: null
			}
		},
		components: {

		},
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById('main'));
				this.chart.setOption({
					title: {
						text: '月平均气温'
					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '温度',
							type: 'line',
							stack: '总量',
							data: [20, 22, 11, 34, 20, 30, 10,40,20.5,42,13,11,]
						}
					]
				});
			},
		},
		created() {},
		mounted() {
			this.initChart();
		}
	}
</script>

<style lang="scss" scoped>
	#fanRunwatch {
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