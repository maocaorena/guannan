<template>
	<alert-v v-on:close="close" v-on:next="next" :btn="btn">
		<span slot="name">查看配置</span>
		<div class="tep-in" slot="con">
			<div class="as-item">
				<p class="as-item-tit">
					通讯模块类型：
				</p>
				<div class="as-item-con">
				</div>
			</div>
			<div class="as-item">
				<p class="as-item-tit">
					通讯模块型号：
				</p>
				<div class="as-item-con">
					
				</div>
			</div>
			<div class="as-item">
				<p class="as-item-tit">
					通讯模块地址：
				</p>
				<div class="as-item-con">
				</div>
			</div>
			<div class="as-item">
				<p class="as-item-tit">
					监控参数：
				</p>
				<div class="as-item-con">
				</div>
			</div>
			<div class="as-item">
				<p class="as-item-tit">
					数据端口：
				</p>
				<div class="as-item-con">
				</div>
			</div>
		</div>
	</alert-v>
</template>

<script>
	import alert from '../../components/alert.vue';
	import { Util } from '../../lib/util.js';
	var goEasy = null;
	export default {
		data() {
			return {
				btn: '确定'
			}
		},
		props:[
			'id'
		],
		components: {
			'alert-v': alert,
		},
		methods: {
			close() {
				this.$emit('close', '')
			},
			next() {
				this.$emit('close', '')
			},
			sendMessage(){
				let _this = this;
	    		this.api.postN({
	                url: '/datasourcequery/monitorDataSourceQuery',
	                params: {
	                    id: this.id,
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
			}
		},
		created(){
			this.sendMessage();
			goEasy = new GoEasy({
	             appkey: 'BC-035ed8182aac46d2b2b32d3c082af08f'
	        });
	        goEasy.subscribe({
			    channel: 'modulecommunicate',
			    onMessage: function(message){
			        console.log('modulecommunicate',message);
			    }
			});
			goEasy.subscribe({
			    channel: 'monitornameport',
			    onMessage: function(message){
			        console.log('monitornameport',message);
			    }
			});
		},
		beforeDestroy(){
			goEasy. unsubscribe ({
				channel: "monitornameport"
			});
			goEasy. unsubscribe ({
				channel: "modulecommunicate"
			});
		}
	}
</script>

<style lang="scss" scoped>
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
    }
</style>