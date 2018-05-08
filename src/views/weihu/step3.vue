<template>
	<div class="firstStep">
		<alert-v v-on:close="close" v-on:next="next" :btn="btn">
			<span slot="name">{{tomessage.type == 2?'修改周期':'添加周期'}}</span>
			<div class="tep-in" slot="con">
				<div class="as-item">
					<p class="as-item-tit">
						保养周期：
					</p>
					<div class="as-item-con">
						<input name="" v-model="message.detail" type="input">
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						时间来源：
					</p>
					<div class="as-item-con flex">
						<select name="" v-model='selectId' v-if="showSelect">
							<option v-for="item of timeList" :value="item.timesource">{{item.timesource}}</option>
						</select>
					</div>
				</div>
			</div>
		</alert-v>
	</div>
</template>
<script type="text/javascript">
	import alert from '../../components/alert.vue';
	import { Util } from '../../lib/util.js'
	export default {
		data() {
			return {
				btn: '确认添加',
				message: {
					detail: '',
				},
				timeList: [],
				selectId: '',
				showSelect: false,
			}
		},
		props:[
			'tomessage'
		],
		components: {
			'alert-v': alert,
		},
		methods: {
			close() { //关闭弹窗
				this.$emit('close','')
			},
			getTimeList(){//获取时间来源下拉框列表
				let _this = this;
                this.api.postN({
                    url: '/maintain/getTimeSourceList',
                    success: function(res){
                        if(res.response.info.code==100000){
                            if(res.response.content){
                                _this.timeList = res.response.content;
                            }else{
                                _this.timeList = [];
                            };
                             _this.showSelect = true;
                        }else{
                            _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                        }
                    }
                })
			},
			next(){
				// if(Util.trim(this.message.detail).length<1){
				if(!/^[0-9]+$/.test(this.message.detail)){
					this.$message.warning({message: '请正确填写保养时间',duration: Util.time()});
					return;
				};
				let _url = '/maintain/timePlanSet';
				let _params = {
                    maintainid: this.tomessage.id,
                    maintainplan: Util.trim(this.message.detail),
                    timesource: this.selectId,
               	};
				if(this.tomessage.type == 2){
					_params.id = this.tomessage.item.id;
					_url = '/maintain/modifyTimePlan';
				};
				let _this = this;
                this.api.postN({
                    'url': _url,
                    params: _params,
                    success: function(res){
                    	console.log('rtert')
                        if(res.response.info.code==100000){
                        	_this.$message.success({message: res.response.info.msg,duration: Util.time()});
                        	_this.$emit('submitSuccess','')
                            	
                        }else{
                            _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                        }
                    }
                })
			}
		},
		created() {
			this.getTimeList();
			if(this.tomessage.type == 2){
				this.btn = '确认修改';
				this.message.detail = this.tomessage.item.maintainplan;
				this.selectId = this.tomessage.item.timesource;
				console.log(this.selectId)
			}
		}
	}
</script>
<style lang="scss">
	.firstStep {
		.tep-in {
			width: 100%;
			padding-top: 7px;
			.tep-bar {
				width: 100%;
				height: 30px;
			}
			.tep-bar-item {
				float: left;
				margin-right: 5px;
				height: 30px;
				padding: 0 10px;
				font-size: 12px;
				color: #999999;
				line-height: 28px;
				border: 1px solid #CFDDE7;
				border-bottom: none;
				border-radius: 3px 3px 0 0;
				cursor: pointer;
			}
			.select {
				background: #2899EE;
				border-color: #2899EE;
				color: #fff;
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
			input[type=radio]{
				width: 20px;
			}
			span{
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
		textarea{
			resize: none;
		}
	}
</style>