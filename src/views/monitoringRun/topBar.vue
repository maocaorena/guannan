<template>
	<div class="rightTabbar">
		<div class="rt-item">
			<router-link :class="{'rtItemSelect': $route.path.indexOf('fanRunwatch') > -1}" :to="{path:'/monitoringRun/list/item/fanRunwatch',query:message}">
				风机运行监测
			</router-link>
		</div>
		<div class="rt-item">
			<router-link :class="{'rtItemSelect': $route.path.indexOf('smartMeters') > -1}" :to="{path:'/monitoringRun/list/item/smartMeters',query:message}">
				智能电表
			</router-link>
		</div>
		<div class="rt-item">
			<router-link :class="{'rtItemSelect': $route.path.indexOf('hzWatch') > -1}" :to="{path:'/monitoringRun/list/item/hzWatch',query:message}">
				变频器运行监测
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: {
					clientid: this.$route.query.clientid,
					monitoruid: this.$route.query.monitoruid,
					name: this.$route.query.name
				}
			}
		},
		methods: {

		},
		created() {}
	}
</script>

<style lang="scss">
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
</style>