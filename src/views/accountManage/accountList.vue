<template>
    <div id="accountList">
        <div class="rightTabbar">
            <div class="rt-item rtItemSelect">
                账号列表
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
                    <button type="button" name="button">增加账号</button>
                </div>
            </div>
        </div>
        <div class="content">
			<div class="list-tit">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="15">
						<col width="8">
						<col width="18">
						<col width="10">
						<col width="10">
						<col width="11">
					</colgroup>
					<thead>
						<tr>
							<th>操作</th>
							<th>活动ID</th>
							<th>活动名称</th>
							<th>活动策划</th>
							<th>活动类型</th>
							<th>投放类型</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="list-container">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="15">
						<col width="8">
						<col width="18">
						<col width="10">
						<col width="10">
						<col width="11">
					</colgroup>
					<tbody class="list-con">
						<tr v-for="(item,index) of 10" class="list-con-item">
							<!-- 操作 -->
							<td>
								<a href="javascript:;" :data="item.activityId" class="mode mode1" v-if="item.activityState == 0 || item.activityState == 2"">编辑</a>
								<a href="javascript:;" :data="item.activityId" class="mode mode1" v-if="item.activityState == 1">查看</a>
								<a href="javascript:;" :data="item.activityId" class="mode copy">复制活动</a>
								<br />
								<a href="javascript:;" :data="item.activityId" class="mode start" v-if="item.activityState == 0">启用</a>
								<a href="javascript:;" :data="item.activityId" class="mode stop" v-if="item.activityState == 1">停用</a>
							</td>
							<!--活动ID-->
							<td>{{item.activityId}}</td>
							<!--活动名称-->
							<td>{{item.activityName}}</td>
							<!--活动策划-->
							<td>{{item.activityPlanText}}</td>
							<!--活动类型-->
							<td>{{item.activityTypeText}}</td>
							<!--投放类型-->
							<td>{{item.deliveryStateText}}</td>

						</tr>
					</tbody>
				</table>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components:{

    },
    created(){
        let tabs = [
            {
                isurl : 'accountList',
                name : '账号列表'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs)
    }
}
</script>

<style lang="scss" scoped>
    #accountList{
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
    }
</style>
