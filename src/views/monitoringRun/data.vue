<template>
	<div class="con-item">
		<p class="con-item-tit">
			{{paramsName}}（{{danwei}}）
			<select v-model="selectTime" @change="selectThis" name="">
				<option :value="1">过去一小时</option>
				<option :value="2">过去五小时</option>
				<option :value="3">过去一天</option>
			</select>
		</p>
		<div class="con-item-con">
			<div class="bottom-state">
				<div id="main" style="width: 800px;height: 400px;"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import { Util } from '../../lib/util.js';
	export default {
		data() {
			return {
				selectTime: 1,
				monitoruid: this.$route.query.monitoruid,
				startTime: Util.dateTime(Date.parse(new Date()) - 3600000)
			}
		},
		props: [
			'paramsName',
			'danwei'
		],
		watch: {
			'paramsName' (newData, oldData) {
				if(newData&&newData.length > 0){
					this.getData(newData)
				}
			},
		},
		methods: {
			selectThis() {
				if(this.selectTime === 1) {
					this.startTime = Util.dateTime(Date.parse(new Date()) - 3600000)
				} else if(this.selectTime === 2) {
					this.startTime = Util.dateTime(Date.parse(new Date()) - 18000000)
				} else if(this.selectTime === 3) {
					this.startTime = Util.dateTime(Date.parse(new Date()) - 86400000)
				};
				this.getData();
			},
			getData(name) {
				let _this = this;
				this.chart.showLoading();
				this.api.postN({
					url: '/findmaindata/findDataByTimeAndType',
					params: {
						monitoruid: this.monitoruid,
						type: this.paramsName,
						startTime: this.startTime,
						endTime: Util.dateTime(Date.parse(new Date())),
					},
					success: function(res) {
						_this.chart.hideLoading();
						if(res.response.info.code == 100000) {
							_this.setChart(res.response.content,_this.paramsName+ '（'+_this.danwei + '）')
						} else {
							_this.$message.error({
								message: res.response.info.msg,
								duration: Util.time()
							});
						}
					},
					error: function(error) {
						_this.chart.hideLoading();
						_this.$message.error({
								message: '网络错误',
								duration: Util.time()
							});
					}
				});
			},
			initChart() {
				this.chart = echarts.init(document.getElementById('main'));
			},
			setChart(data,name) {
				this.chart.setOption({
					title: {
						text: name
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
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name: '温度',
						type: 'line',
						stack: '总量',
						data: data
					}]
				});
			}
		},
		mounted() {
			this.initChart();
			this.getData();
		}
	}
</script>

<style lang="scss">
	.con-item {
		width: 100%;
		padding: 10px 0 0;
	}
	
	.con-item-tit {
		width: 100%;
		height: 29px;
		border-bottom: 1px solid #eeeeee;
		color: #0f78c9;
		select {
			float: right;
		}
	}
</style>