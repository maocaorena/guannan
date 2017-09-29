<template>
    <div id="accountList" class="wrapper">
        <div class="leftBlock">
          <router-link :to="{path:item.url}" :class="{selected:$route.fullPath==item.url}" tag="div" class="first-list type1" v-for="(item,index) of leftbars">
            <p class="first-item">
              {{item.tit}}
            </p>
          </router-link>
        </div>
        <div class="rightBlock">
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
                            <col width="4">
    						<col width="4">
    						<col width="8">
    						<col width="18">
    						<col width="10">
    						<col width="10">
    						<col width="11">
    					</colgroup>
    					<thead>
    						<tr>
    							<th><input type="checkbox"></th>
    							<th>序号</th>
    							<th>登录名</th>
    							<th>真实姓名</th>
    							<th>联系方式</th>
                                <th>所属分组</th>
    							<th>操作</th>
    						</tr>
    					</thead>
    				</table>
    			</div>
    			<div class="list-container">
    				<table class="list" border="1" cellspacing="0" cellpadding="0">
    					<colgroup>
                            <col width="4">
    						<col width="4">
    						<col width="8">
    						<col width="18">
    						<col width="10">
    						<col width="10">
    						<col width="11">
    					</colgroup>
    					<tbody class="list-con">
    						<tr v-for="(item,index) of 10" class="list-con-item">
    							<!-- 操作 -->
                                <td><input type="checkbox"></td>
    							<td>{{index}}</td>
    							<!--活动ID-->
    							<td>administrator</td>
    							<!--活动名称-->
    							<td>张无晃</td>
    							<!--活动策划-->
    							<td>13346153357</td>
    							<!--活动类型-->
    							<td>超级管理员</td>
    							<!--投放类型-->
    							<td>
                                    <a href="javascript:;" class="mode">删除</a>
                                    <a href="javascript:;" class="mode">编辑</a>
                                </td>

    						</tr>
    					</tbody>
    				</table>
    			</div>
    		</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            leftbars: [{
                tit: '帐号列表',
                url: '/accountManage/accountList'
              },
              {
                tit: '角色',
                url: '/accountManage/roleList'
              }
            ],
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
        .leftBlock {
          .first-list {
            cursor: pointer;
          }
          .router-link-active {
            .first-item {
              border: 1px solid #2899ee;
              color: #fff;
              background: #2899ee;
            }
          }
        }
        .rightTabbar {
          width: 100%;
          height: 30px;
          border-bottom: 4px solid #2899ee;
          .rt-handle {
            width: auto !important;
            .handle-item {
              display: inline-block;
              float: none;
            }
          }
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
          .rt-handle {
            float: right;
            width: 400px;
            height: 30px;
          }
          .handle-item {
            float: right;
            margin-left: 10px;
            button {
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
        }
        .downpage {
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
