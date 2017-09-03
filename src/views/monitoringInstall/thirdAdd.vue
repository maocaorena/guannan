<template>
    <div class="secondAdd">
        <alert-v v-on:close="close" v-on:next="next" :btn="btn">
            <span slot="name">监控参数信息-{{tittxt}}模块</span>
            <div class="tep-in" slot="con">
                <div class="content">
        			<div class="list-tit">
        				<table class="list" border="1" cellspacing="0" cellpadding="0">
        					<colgroup>
                                <col width="2" v-if="thirdAdd.type == 1">
                                <col width="4">
                                <col width="4">
        						<col width="10">
        						<col width="11">
                                <col width="11">
        					</colgroup>
        					<thead>
        						<tr>
                                    <th v-if="thirdAdd.type == 1"></th>
                                    <th>序号</th>
                                    <th>监控参数</th>
                                    <th>数据源</th>
                                    <th>数据端口</th>
        							<th>端口状态</th>
        						</tr>
        					</thead>
        				</table>
        			</div>
        			<div class="list-container">
        				<table class="list" border="1" cellspacing="0" cellpadding="0">
        					<colgroup>
                                <col width="2" v-if="thirdAdd.type == 1">
                                <col width="4">
                                <col width="4">
        						<col width="10">
        						<col width="11">
                                <col width="11">
        					</colgroup>
        					<tbody class="list-con">
        						<tr v-for="(item,index) of 4" class="list-con-item">
                                    <td v-if="thirdAdd.type == 1">
                                        <input type="checkbox" name="" value="">
                                    </td>
                                    <td>
                                        {{index+1}}
        							</td>
                                    <td>
                                        {{index+1}}
        							</td>
        							<td>
                                        <select class="" name="">
                                            <option value="">D10231</option>
                                            <option value="">D10242</option>
                                        </select>
                                    </td>
        							<td>
                                        <select class="" name="">
                                            <option value="">D10231</option>
                                            <option value="">D10242</option>
                                        </select></td>
        							<td>
                                        <select class="" name="">
                                            <option value="">常开</option>
                                            <option value="">常关</option>
                                        </select>
                                    </td>
        						</tr>
        					</tbody>
        				</table>
        			</div>
        		</div>
            </div>
        </alert-v>
    </div>
</template>
<script type="text/javascript">
    import alert from '../../components/alert.vue';
    export default{
        data(){
            return{
                btn: '确定添加',
                tittxt: '添加'
            }
        },
        computed:{
            thirdAdd(){
                return this.$store.getters.thirdAdd;
            }
        },
        components:{
            'alert-v' : alert,
        },
        methods:{
            close(){
                this.$store.dispatch('SetThirdAddAlert',{
                    state: false,
                });
            },
            next(){
                console.log(22222);
                //提交编辑或者新增的信息到vuex
                this.$store.dispatch('SetThirdAddMessage',{

                });
                this.close()
            },
        },
        created(){
            if(this.thirdAdd.type == 2){
                this.tittxt = '修改';
                this.btn = '确定修改';
            };
        }
    }
</script>
<style lang="scss" scoped>
    .secondAdd{
        position: relative;
        z-index: 99999;
        .tep-in{
            width: 100%;
            padding-top: 7px;

        }
        .content{
            top: 7px;
            left: 7px;
            right: 7px;
            bottom: 0;
            border: 1px solid #cfdde7;
            table{
                border: 0;
            }
            th{
                border-top: 0;
            }
            tr{
                th:nth-child(1){
                    border-left: 0;
                }
                td:nth-child(1){
                    border-left: 0;
                }
                td:nth-last-child(1),td:nth-last-child(2),td:nth-last-child(3){
                    padding: 2px;
                    select{
                        width: 100%;
                        height: 100%;
                        border: 1px solid #CFDDE7;
                        border-radius: 2px;
                    }
                }
            }
        }
    }
</style>
