<template>
    <div id="monitoringRunItem">
        <div class="rightTabbar">
            <div class="rt-item rtItemSelect">
                监控详情
            </div>
        </div>
        <div class="item">
            <p class="tit">
                监控点参数
            </p>
            <div class="con">
                <div class="con-item">
                    <p class="left">
                        监控点名称：
                    </p>
                    <p class="right">
                        {{canshu.monitorplacename}}
                    </p>
                </div>
                <div class="con-item">
                    <p class="left">
                        安装单位：
                    </p>
                    <p class="right">
                        {{canshu.installname}}
                    </p>
                </div>
                <div class="con-item">
                    <p class="left">
                        监控器型号：
                    </p>
                    <p class="right">
                        {{canshu.monitormodel}}
                    </p>
                </div>
                <div class="con-item">
                    <p class="left">
                        安装日期：
                    </p>
                    <p class="right">
                        {{canshu.createtime | cuttime}}
                    </p>
                </div>
                <div class="con-item">
                    <p class="left">
                        监控器UID：
                    </p>
                    <p class="right">
                        {{canshu.monitoruid}}
                    </p>
                </div>
                <div class="con-item">
                    <p class="left">
                        配置人：
                    </p>
                    <p class="right">
                        {{canshu.deployer}}
                    </p>
                </div>
                <div class="con-item">
                    <p class="left">
                        监控器出厂编号：
                    </p>
                    <p class="right">
                        {{canshu.monitorno}}
                    </p>
                </div>
                <div class="con-item">
                    <p class="left">
                        地图定位：
                    </p>
                    <p class="right">
                        {{canshu.address}}
                    </p>
                </div>
                <div style="clear:both;">
                </div>
            </div>
        </div>
        <div class="item">
            <p class="tit">
                模块信息
            </p>
            <div class="con">
                <table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="4">
						<col width="10">
						<col width="11">
						<col width="11">
						<col width="11">
						<col width="7">
                        <col width="9">
						<col width="10">
						<col width="8">
					</colgroup>
                    <thead>
                        <tr>
                            <th>序号</th>
							<th>通信模块名称</th>
							<th>通信模块类型</th>
							<th>通信模块型号</th>
							<th>通信模块地址</th>
                            <th>配置人</th>
                            <th>配置日期</th>
                            <th>最后一次维护人</th>
							<th>最后维护日期</th>
                        </tr>
                    </thead>
					<tbody class="list-con">
						<tr v-for="(item,index) of 10" class="list-con-item">
							<td>
                                {{index}}
							</td>
							<td>
                                风机控制器模块
                            </td>
							<td>风机控制器模块</td>
							<td>AERZEN TB25-0.8S</td>
							<td>128</td>
							<td>admin</td>
                            <td>2017-05-05</td>
							<td>admin</td>
							<td>
                                2017-05-05
                            </td>
						</tr>
					</tbody>
				</table>
            </div>
        </div>
        <div class="item">
            <p class="tit">
                监控参数信息
            </p>
            <div class="con">
                <br><br><br><br><br><br><br><br><br><br><br><br>
            </div>

        </div>
    </div>
</template>

<script>
import { Util } from '../../lib/util.js'
export default {
    data() {
        return {
            canshu: {},
        }
    },
    components:{

    },
    filters:{
        cuttime(val){
            return Util.dateTime(val, 'date')
        }
    },
    methods:{
        findMonitorplaceById(){
            let _this = this;
            this.api.postN({
                url: '/monitorplace/findMonitorplaceById',
                params: {
                    id: 1,
                },
                success: function(res){
                    if(res.response.info.code==100000){
                        _this.canshu = res.response.content;
                    }else{
                        _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                    }
                }
            })
        }
    },
    created(){
        let tabs = [
            {
                isurl : 'item',
                name : '监控详情'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs)
        this.findMonitorplaceById();
    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunItem{
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
        }
        .item{
            width: 100%;
            margin-top: 10px;
            padding: 0;
            border: 1px solid #CFDDE7;
            .tit{
                width: 100%;
                height: 28px;
                background: #D5E8FD;
                line-height: 28px;
                font-size: 13px;
                color: #2899EE;
                text-indent: 10px;
            }
            .con{
                width: 100%;
            }
            .con-item{
                float: left;
                width: 50%;
                p{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                }
                .left{
                    width: 40%;
                    text-align: right;
                }
                right{
                    width: 59%;
                    text-align: left;
                }
            }
        }
        .list{
            border: none;
            tr{
                td:nth-child(1){
                    border-left: 0;
                }
                td:nth-last-child(1){
                    border-right: 0;
                }
            }
            tr:nth-last-child(1){
                td{
                    border-bottom: 0;
                }
            }
        }
    }
</style>
