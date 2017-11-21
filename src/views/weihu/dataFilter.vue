<template>
	<div class="rt-handle">
		<div class="handle-item">
			<select name="" id="" v-model="clientCity">
				<option value="">请选择城市</option>
				<option :value="index" :key="index" v-for="(item,index) of provinceArr"> {{item.province}}</option>
			</select>
		</div>
		<div class="handle-item">
			<select name="" id="" v-model="clientCompany">
				<option value="">请选择公司</option>
				<option :value="item.clientid" :key="item.clientid" v-for="(item,index) of companyArr">{{item.clientname}}</option>
			</select>
		</div>

		<div class="handle-item">
			<select name="" id="" v-model="monitorplaceId">
				<option value="">选择监控点</option>
				<option :value="item.id" :key="item.id" v-for="(item,index) of monitorArr">{{item.monitorplacename}}</option>
			</select>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				clientCity: "",
				clientCompany: "",
				monitorplaceId: "",
				timedetail: 1,
				starttime: "",
				endtime: "",
				dataType: 1,
				provinceArr: [],
				companyArr: [],
				monitorArr: []
			}
		},
		props: [],
		computed: {

		},
		methods: {
			searchFn() {
				console.log(this.monitorplaceId)
				this.$emit("monitorplaceId",this.monitorplaceId)
			},
			getData() {
				let self = this;
				let url = "/client/findProvinceAndCompanys";
				let data = {

				}
				this.api.handleAjax(url, data).done(function(res) {
					self.provinceArr = res;
				}).fail(function(res) {
					console.log(res);
				})
			},
			getCompany() {
				this.monitorplaceId = '';
				if(this.provinceArr[this.clientCity]) {
					this.companyArr = this.provinceArr[this.clientCity].clientList;
					this.monitorArr = [];
				} else {
					this.companyArr = [];
					this.monitorArr = [];
				}
			},
			getMonitor() {
				this.monitorplaceId = '';
				let self = this;
				let url = "/monitorplace/findMonitorplaceByConditions";
				let data = {
					clientid: this.clientCompany
				};
				if(this.clientCompany == " ") return;
				this.api.handleAjax(url, data).done(function(res) {
					self.monitorArr = res.list;
				}).fail(function(res) {
					console.log(res);
				})
			}
		},
		created() {
			this.getData();
		},
		watch: {
			clientCity: 'getCompany',
			clientCompany: 'getMonitor',
			monitorplaceId: 'searchFn'
		},
	}
</script>
<style lang="scss" scoped>
	.rt-handle {
		width: auto !important;
		.handle-item {
			display: inline-block;
			float: none;
		}
	}
	
	.handle-item {
		float: left;
		margin-bottom: 10px;
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
</style>