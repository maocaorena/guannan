<template>
	<div class="firstStep">
		<alert-v v-on:close="close" v-on:next="next" :btn="btn">
			<span slot="name">增加设置</span>
			<div class="tep-in" slot="con">
				<div class="as-item">
					<p class="as-item-tit">
						项目名称：
					</p>
					<div class="as-item-con">
						<input type="text" v-model="message.name" name="" value="">
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						保养内容：
					</p>
					<div class="as-item-con">
						<textarea name="" v-model="message.detail" rows="5" cols="60"></textarea>
					</div>
				</div>
				<div class="as-item">
					<p class="as-item-tit">
						启用：
					</p>
					<div class="as-item-con flex">
						<input type="radio" name="haha" id="" value="1" v-model="message.state"/><span>是</span>
						<input type="radio" name="haha" id="" value="2" v-model="message.state"/><span>否</span>
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
					name: '',
					detail: '',
					state: 2,
				}
			}
		},
		components: {
			'alert-v': alert,
		},
		methods: {
			close() { //关闭弹窗
				this.$emit('close','')
			},
			next(){
				if(Util.trim(this.message.name).length<1){
					this.$message.warning({message: '请填写项目名称',duration: Util.time()});
					return;
				};
				
				if(Util.trim(this.message.detail).length<1){
					this.$message.warning({message: '请填写项目内容',duration: Util.time()});
					return;
				};
				let _this = this;
                this.loading = true;
                this.api.postN({
                    url: '/maintain/setMaintain',
                    params: {
                    	maintainname: this.message.name,
                    	maintaincontent: this.message.detail,
                    	isstar: this.message.state,
                    },
                    success: function(res){
                    	_this.loading = false;
                        if(res.response.info.code==100000){
                            _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                            _this.$emit('submitSuccess',{
                            	step: 1,
                            	id: res.response.content.id
                            })
                        }
                    }
                })
			}
		},
		created() {

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