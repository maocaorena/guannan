<template>
	<div id="setting" class="wrapper">
		<div class="leftBlock">
			<div v-for="(item,index) of leftbars">
				<router-link :to="{path:item.url}" class="first-list type1">
					<p class="first-item" :class="{selected:$route.fullPath==item.url}">
						{{item.tit}}
					</p>
				</router-link>
			</div>
		</div>
		<div class="rightBlock" v-if="$route.path.indexOf('item')>0">
			<router-view></router-view>
		</div>
		<div class="rightBlock" v-if="$route.path.indexOf('item')<0">
			<div class="rightTabbar">
				<div class="rt-item rtItemSelect">
					处理登记
				</div>
				<div class="rt-handle">
					<div class="handle-item">
						<button type="button" name="button" @click="search">搜索</button>
					</div>
					<div class="handle-item">
						<input type="text" placeholder="" v-model="keyWords">
					</div>
				</div>
			</div>
			<div class="content" v-loading.body="loading">
				<div class="list-tit">
					<table class="list" border="1" cellspacing="0" cellpadding="0">
						<colgroup>
							<col width="4">
							<col width="10">
							<col width="10">
							<col width="11">
							<col width="7">
							<col width="11">
							<col width="9">
							<col width="11">
							<col width="9">
						</colgroup>
						<thead>
							<tr>
								<th>序号</th>
								<th>项目名称</th>
								<th>保养内容</th>
								<th>保养周期</th>
								<th>处理方案</th>
								<th>指派</th>
								<th>处理意见</th>
								<th>告警时间</th>
								<th>操作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="list-container" ref="list">
					<div class="">
						<table class="list" border="1" cellspacing="0" cellpadding="0" :style="{width: width+'px'}">
							<colgroup>
								<col width="4">
								<col width="10">
								<col width="10">
								<col width="11">
								<col width="7">
								<col width="11">
								<col width="9">
								<col width="11">
								<col width="9">
							</colgroup>
							<tbody class="list-con">
								<tr v-if="list.length>0" class="list-con-item" v-for="(item,index) of list">
									<td v-if="index<9"> {{pageNum-1}}{{index+1}} </td>
									<td v-else>{{index+1}} </td>
									<td>{{item.maintainname}}</td>
									<td>{{item.maintaincontent}}</td>
									<td>{{item.maintainplan}}</td>
									<td>{{item.domethod}}</td>
									<td>{{item.assign}}</td>
									<td>{{item.advice}}</td>
									<td>{{item.alerttime}}</td>
									<td>
										<a href="javascript:;" class="mode" @click="handle(item)">登记</a>
									</td>
								</tr>
								<tr v-if="list.length==0">
									<td colspan="10">暂无数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="downpage">
				<pages-v :pageNum="pageNum" :pageSize="pagesize" :total="total" v-on:pagechange="pagechange"></pages-v>
			</div>
		</div>
		<alert-v v-if="handleState" v-on:close="close" v-on:next="next" :btn="'确认'">
			<span slot="name">处理</span>
			<div class="tep-in" slot="con" v-loading.body="loading">
				<div class="as-item">
					<p class="as-item-tit">
						名称：
					</p>
					<div class="as-item-con">
						<input type="text" readonly name="" v-model="handleDetail.maintainname" value="">
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						处理结果：
					</p>
					<div class="as-item-con">
						<textarea rows="5" v-model="handleDetail.doresult" cols="60"></textarea>
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						登记人：
					</p>
					<div class="as-item-con">
						<input type="text" v-model="handleDetail.registerman" name="" value="">
					</div>
				</div>
			</div>
		</alert-v>
	</div>
</template>
<script>
	import pages from '../../components/pages.vue';
	import alert from '../../components/alert.vue';
	import { Util } from '../../lib/util.js'
	export default {
		data() {
			return {
				pageNum: 1,
				pagesize: 10,
				total: 200,
				list: [],
				loading: false,
				checkboxModel: [],
				checked: false,
				keyWords: '',
				width: '',
				handleState: false,
				leftbars: [{
						tit: '设置',
						url: '/weihu/setting'
					},
					{
						tit: '告警处理',
						url: '/weihu/warn'
					},
					{
						tit: '处理登记',
						url: '/weihu/dispose'
					},
					{
						tit: '历史查询',
						url: '/weihu/history'
					}
				],
				handleDetail: {

				}
			}
		},
		components: {
			'pages-v': pages,
			'alert-v': alert,
		},
		filters: {
			cutTime(val) {
				return Util.dateTime(val, 'date')
			}
		},
		methods: {
			search() {
				this.pageNum = 1;
				this.getList();
			},
			pagechange(val) {
				console.log(val + '页')
				this.pageNum = val;
				this.getList();
			},
			handle(item) {
				console.log(item)
				this.handleDetail.id = item.id;
				this.handleDetail.maintainname = item.maintainname;
				this.handleDetail.doresult = item.doresult||'';
				this.handleDetail.registerman = item.registerman||'';
				this.handleState = true;
			},
			next() {
				console.log(this.handleDetail.advice);
				if(this.handleDetail.doresult.length < 1){
					this.$message.warning({message: '请填写处理结果',duration: Util.time()});
					return;
				};
				if(this.handleDetail.registerman.length < 1){
					this.$message.warning({message: '请填写登记人',duration: Util.time()});
					return;
				};
				
				let params = {};
				params.id = this.handleDetail.id;
				params.maintainname = this.handleDetail.maintainname;
				params.doresult = this.handleDetail.doresult;
				params.registerman = this.handleDetail.registerman;
				let _this = this;
                this.loading = true;
                this.api.postN({
                    url: '/maintain/doRegister',
                    params: params,
                    success: function(res){
                    	_this.loading = false;
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            _this.close();
                            _this.getList();
                        }
                    }
                })
			},
			close() {//关闭处理弹窗
				this.handleState = false;
				this.handleDetail = {
					id: '',
					maintainname: '',
					doresult: '1',
					registerman: '',
				}
			},
			getList() {
				let _this = this;
				this.loading = true;
				this.api.postN({
					url: '/maintain/getRegisterDataList',
					params: {
						currentpage: this.pageNum,
						pagesize: this.pagesize,
                        monitorplacenameorinstallname: this.keyWords
					},
					success: function(res) {
						_this.loading = false;
						let _res = res.response;
						if(_res.info.code == 100000) {
							_this.list = _res.content.list;
							_this.total = _res.content.total;
						}
					}
				})
			},
		},
		created() {
			this.getList()
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
	#setting {
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
					background: url("../../assets/img/bg_sheng.png") repeat-x;
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
		.first-item {
            color: #000;
        }
		.selected {
			background: none;
			background: #2899ee;
			color: #fff;
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