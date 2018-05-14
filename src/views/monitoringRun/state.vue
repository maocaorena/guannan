<template>
	<p 
		class="right allright" 
		:class="{'noknow':state == '未知','allright':state == '正常'||state == '运行','bad':state == '故障'||state == '报警','soheight':state == '报警'}"
	>
		{{state}}
	</p>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['state']
	}
</script>

<style lang="scss">
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
</style>