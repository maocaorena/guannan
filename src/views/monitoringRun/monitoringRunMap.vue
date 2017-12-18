<template>
	<div id="monitoringRunMap" class="wrapper">
		<div class="leftBlock">
			<div class="first-list type1" v-for="(item,index) of leftbars">
				<p class="first-item">
					<img class="leftIcon" src="../../assets/img/leftbar/icon_sheng.png" alt=""> {{item.province}}
				</p>
				<ul class="second-list">
					<router-link class="second-item" :class="{selected:$route.query.clientid==second.clientid}" :to="{path:'/monitoringRun/map',query:{clientid: second.clientid}}" tag="li" :key="second.clientid" v-for="(second,index2) of item.clientList">
						<img class="leftIcon" src="../../assets/img/leftbar/icon_gongsi.png" alt=""> {{second.clientname}}
					</router-link>
				</ul>
			</div>
		</div>
		<div class="rightBlock">
			<div class="rightTabbar">
				<div class="rt-item rtItemSelect">
					监控列表
				</div>
				<div class="rt-handle">
					<div class="handle-item">
						<router-link to="/monitoringRun/list">
							<button type="button" name="button">列表模式</button>
						</router-link>
					</div>
					<div class="handle-item">
						<button type="button" name="button">搜索</button>
					</div>
					<div class="handle-item">
						<input type="text" name="" value="">
					</div>
				</div>
			</div>
			<div id="map"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leftbars: [],
				barState: 0,
			}
		},
		components: {

		},
		watch:{
			'$route' (to, from) {
	            if(to.query.clientid){
	            	this.initMap(to.query.clientid)
	            }
	        }
		},
		methods: {
			getBar() {
				let _this1 = this;
				this.api.postN({
					url: "/client/findProvinceAndCompanys",
					success: function(res) {
						let _res = res.response;
						if(_res.info.code == 100000) {
							_this1.leftbars = _res.content;
							console.log(_this1.$route.path.indexOf('item'))
							if(!_this1.$route.query.clientid && _this1.$route.path.indexOf('item') < 0) {
								_this1.$router.replace({
									path: '/monitoringRun/map',
									query: {
										clientid: _res.content[0].clientList[0].clientid
									}
								});
								this.barState = 1;
								console.log('73',this.barState)
							}else{
								this.barState = 1;
								console.log('76',this.barState)
							}
						}
					}
				});
			},
			initMap(clientid) {
				let _this = this;
				this.loading = true;
				this.api.postN({
					url: '/monitorplace/findMonitorPlaceMapByClient',
					params: {
						clientid: clientid,
					},
					success: function(res) {
						console.log(res)
						_this.loading = false;
						let _res = res.response;
						if(_res.info.code == 100000) {
							let _list = [];
							let _data = _res.content;
							for(let i = 0; i < _data.length; i++) {
								_list[i] = {
									icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
									position: [_data[i].longtitude, _data[i].latitude],
									remark: _data[i].monitorplacename
								}
							}
							var map = new AMap.Map('map', {
								resizeEnable: true,
								center: [116.397428, 39.90923],
								zoom: 13
							});
							map.clearMap(); // 清除地图覆盖物
							var markers = _list;
							// 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
							markers.forEach(function(marker) {
								new AMap.Marker({
									map: map,
									icon: marker.icon,
									position: [marker.position[0], marker.position[1]],
									offset: new AMap.Pixel(-12, -36)
								}).setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
									offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
									content: marker.remark
								});
							});
							// 添加事件监听, 使地图自适应显示到合适的范围
							var newCenter = map.setFitView();

						}
					}
				})
			}
		},
		created() {
			this.getBar();
		},
		mounted() {
			if(this.$route.query.clientid){
            	this.initMap(this.$route.query.clientid)
            }
//			console.log('124',this.$route.query.clientid)
//			this.initMap(this.$route.query.clientid);
		}
	}
</script>

<style lang="scss" scoped>
	#monitoringRunMap {
		#map {
			position: absolute;
			top: 32px;
			left: 0px;
			bottom: 0px;
			right: 0px;
		}
		.info-tip {
			position: absolute;
			top: 10px;
			right: 10px;
			font-size: 12px;
			background-color: #fff;
			height: 35px;
			text-align: left;
		}
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
			}
		}
	}
</style>