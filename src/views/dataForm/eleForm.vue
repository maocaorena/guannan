<template>
	<div id="eleForm" class="wrapper">
		<div class="leftBlock">
			<router-link :to="{path:item.url}" :class="{selected:$route.fullPath==item.url}" tag="div" class="first-list type1" :key="index" v-for="(item,index) of leftbars">
				<p class="first-item">
					{{item.tit}}
				</p>
			</router-link>
		</div>
		<div class="rightBlock">
			<div class="rightTabbar">
				<div class="rt-item rtItemSelect">
					用户报表
				</div>
				<data-filter v-on:exportExcel="exportExcel" v-on:searchFn="getData"></data-filter>
			</div>
			<div class="content">
				<div class="list-tit">
					<table class="list" border="1" cellspacing="0" cellpadding="0">
						<colgroup>
							<col width="8">
							<col width="11">
							<col width="8">
							<col width="7">
							<col width="11">
							<col width="8">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
						</colgroup>
						<thead>
							<tr>
								<th>时间</th>
								<th>单位名称</th>
								<th>监控点名称</th>
								<th>监控点UID</th>
								<th>累计电能</th>
								<th>有功功率</th>
								<th>无功功率</th>
								<th>A相电压</th>
								<th>B相电压</th>
								<th>C相电压</th>
								<th>A相电流</th>
								<th>B相电流</th>
								<th>C相电流</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="list-container" ref="list">
					<table class="list" border="1" cellspacing="0" cellpadding="0" :style="{width: width+'px'}">
						<colgroup>
							<col width="8">
							<col width="11">
							<col width="8">
							<col width="7">
							<col width="11">
							<col width="8">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
							<col width="9">
						</colgroup>
						<tbody class="list-con">
							<tr v-if="!ifPage">
								<td colspan="13">暂无数据</td>
							</tr>
							<tr v-for="(item,index) in items" class="list-con-item">
								<td>
									{{item.timedetail}}
								</td>
								<td>
									{{item.clientname}}
								</td>
								<td>{{item.monitorplacename}}</td>
								<td>{{item.monitoruid}}</td>
								<td>{{item.totalenergy}}</td>
								<td>{{item.posipower}}</td>
								<td>{{item.negipower}}</td>
								<td>{{item.Avm}}</td>
								<td>{{item.Bvm}}</td>
								<td>{{item.Cvm}}</td>
								<td>{{item.Aam}}</td>
								<td>{{item.Bam}}</td>
								<td>{{item.Cam}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="downpage" v-if="ifPage">
				<pages-v :pageNum="pageNum" :pageSize="pageSize" :total="total" v-on:pagechange="pagechange"></pages-v>
			</div>
		</div>
	</div>
</template>
<script>
	import pages from '../../components/pages.vue';
	import dataFilter from '../../components/dataFilter.vue';

	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				total: 200,
				items: [],
				leftbars: [{
						tit: '用电报表',
						url: '/dataForm/eleForm'
					},
					{
						tit: '风机运行报表',
						url: '/dataForm/fanRun'
					},
					{
						tit: '风机故障报表',
						url: '/dataForm/fanIll'
					},
					{
						tit: '变频器运行报表',
						url: '/dataForm/hzRun'
					}
				],
				width: '',
				ifPage: false
			}
		},
		components: {
			'pages-v': pages,
			dataFilter
		},
		created() {

			var self = this;
			let tabs = [{
				isurl: 'eleForm',
				name: '用电报表'
			}];
			this.$store.dispatch('ChangeRightbar', tabs);
			this.getData();
		},
		methods: {
			pagechange(val) {
				console.log(val + '页')
			},
			getData(param) {
				let url = "/finddata/findElectricUseByCondition";
				let data = {
					currentpage: this.pageNum,
					pagesize: this.pageSize,
					clientid: 1,
					monitorplaceid: 1,
					timedetail: "",
					startTime: "",
					endTime: ""
				}
				Object.assign(data, param);
				this.api.handleAjax(url, data).done(function(res) {
					if(res.list.length > 0) {
						self.total = res.total;
						self.pageSize = res.pageSize;
						self.pageNum = res.pageNum;
						self.items = res.list;
						self.ifPage = true;
					} else {
						self.ifPage = false;
					}
					console.log(res.pageNum, res.pageSize, res.total)
				}).fail(function(res) {
					console.log(res);
				})
			},
			exportExcel(param) {
				let url = "/exceldata/excelExportElecricConsume";
				let data = param;
				this.api.handleAjax(url, data,'get').done(function(res) {

				}).fail(function(res) {
					console.log(res);
				})
			}
		},
		watch: {
			'$route' (to, from) {
				this.pageNum = 1;
				this.getList();
			}
		},
		mounted() {
			this.width = this.$refs.list.getBoundingClientRect().width - 17;
			let _this = this;
			window.onresize = function() {
				_this.width = _this.$refs.list.getBoundingClientRect().width - 17;
			}
		}
	}
</script>
<style lang="scss" scoped>
	#eleForm {
		.leftBlock {
			.first-list {
				cursor: pointer;
			}
			.router-link-active {
				.first-item {
					border: 1px solid #2899ee;
					color: #fff;
					background: #2899ee;
				}
			}
		}
		.rightTabbar {
			width: 100%;
			height: 30px;
			border-bottom: 4px solid #2899ee;
			.rt-handle {
				width: auto !important;
				.handle-item {
					display: inline-block;
					float: none;
				}
			}
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
			.rt-handle {
				float: right;
				width: 400px;
				height: 30px;
			}
			.handle-item {
				float: right;
				margin-left: 10px;
				button {
					height: 24px;
					line-height: 24px;
					padding: 0 7px;
					border: 1px solid #CFDDE7;
					border-radius: 3px;
					background: url(../../assets/img/bg_sheng.png) repeat-x;
					font-size: 12px;
					color: #2899EE;
					cursor: pointer;
				}
				input {
					padding: 4px;
					width: 150px;
					height: 24px;
					border: 1px solid #CFDDE7;
					border-radius: 3px;
				}
				select {
					height: 24px;
					line-height: 24px;
					border: 1px solid #CFDDE7;
					min-width: 100px;
				}
			}
		}
		.downpage {
			position: absolute;
			bottom: 1px;
			left: 0;
			padding-right: 10px;
			width: 100%;
			height: 30px;
			background: #fff;
		}
	}
</style>