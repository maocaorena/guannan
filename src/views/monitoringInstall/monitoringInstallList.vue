<template>
    <div id="monitoringRunList">
        <div class="rightTabbar">
            <div class="rt-item rtItemSelect">
                监控列表
            </div>
            <div class="rt-handle">
                <div class="handle-item">
                    <button type="button" name="button">搜索</button>
                </div>
                <div class="handle-item">
                    <input type="text" name="" value="">
                </div>
                <div class="handle-item">
                    <button type="button" name="button">批量删除</button>
                </div>
                <div class="handle-item">
                    <button type="button" name="button" @click="add">增加监控点</button>
                </div>
            </div>
        </div>
        <div class="content">
			<div class="list-tit">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="4">
						<col width="10">
						<col width="11">
						<col width="7">
						<col width="11">
						<col width="17">
                        <col width="9">
						<col width="9">
						<col width="9">
					</colgroup>
					<thead>
						<tr>
							<th>序号</th>
							<th>监控点名称</th>
							<th>监控器型号</th>
							<th>监控器UID</th>
							<th>监控器出厂编号</th>
                            <th>安装单位</th>
                            <th>安装日期</th>
                            <th>备注</th>
							<th>操作</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="list-container">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="4">
						<col width="10">
						<col width="11">
						<col width="7">
						<col width="11">
						<col width="17">
                        <col width="9">
						<col width="9">
						<col width="9">
					</colgroup>
					<tbody class="list-con">
						<tr v-for="(item,index) of 40" class="list-con-item">
							<td>
                                {{index}}
							</td>
							<td>
                                <router-link to="/monitoringInstall/item">
                                    1#风机监控点
                                </router-link>
                            </td>
							<td>ZT-ROMM50-F</td>
							<td>313D9313D9313D9313D9</td>
							<td>20170701039</td>
							<td>浙江冠南能源科技有限公司</td>
                            <td>2017-05-05</td>
							<td>--</td>
							<td>
                                <a href="javascript:;" class="mode">删除</a>
                                <a href="javascript:;" class="mode">编辑</a>
                            </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
        <div class="downpage">
            <pages-v :pageNum="pageNum" :pageSize="pageSize" :total="total" v-on:pagechange="pagechange" v-on:selectall="selectall"></pages-v>
        </div>
        <step-v v-if="firstStepAlert > 0"></step-v>
    </div>
</template>

<script>
import pages from '../../components/pages.vue';
import step from './step.vue';
export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 200,
        }
    },
    components:{
        'pages-v' : pages,
        'step-v' : step,
    },
    computed:{
        firstStepAlert(){
            return this.$store.getters.firstStepAlert;
        }
    },
    methods:{
        add(){
            this.$store.dispatch('SetFirstStepAlert',1)
        },
        pagechange(val){
            console.log(val+'页')
        },
        selectall(val){
            console.log(val)
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunList{
        .rightTabbar{
            width: 100%;
            height: 30px;
            border-bottom: 4px solid #2899ee;
            .rt-item{
                margin-right: 3px;
                float: left;
                width: 120px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                border: 1px solid #cfdde7;
                border-bottom: 0;
                cursor: pointer;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .rtItemSelect{
                background: #2899ee;
                border-color: #2899ee;
                color: #fff;
            }
            .rt-handle{
                float: right;
                width: 400px;
                height: 30px;
            }
            .handle-item{
                float: right;
                margin-left: 10px;
                button{
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
                input{
                    padding: 4px;
                    width: 150px;
                    height: 24px;
                    border: 1px solid #CFDDE7;
                    border-radius: 3px;
                }
            }
        }
        .downpage{
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
