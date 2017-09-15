<template>
  <div id="clientList">
    <div class="rightTabbar">
      <div class="rt-item rtItemSelect">
        客户列表
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
          <button type="button" name="button" @click="add">增加客户</button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="list-tit">
        <table class="list" border="1" cellspacing="0" cellpadding="0">
          <colgroup>
            <col width="4">
            <col width="4">
            <col width="7">
            <col width="7">
            <col width="11">
            <col width="17">
            <col width="11">
            <col width="9">
            <col width="9">
            <col width="9">
          </colgroup>
          <thead>
            <tr>
              <th>
                <input type="checkbox">
              </th>
              <th>序号</th>
              <th>所在省份</th>
              <th>所在城市</th>
              <th>单位名称</th>
              <th>单位地址</th>
              <th>联系人</th>
              <th>电话</th>
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
            <col width="4">
            <col width="7">
            <col width="7">
            <col width="11">
            <col width="17">
            <col width="11">
            <col width="9">
            <col width="9">
            <col width="9">
          </colgroup>
          <tbody class="list-con">
            <tr v-for="(item,index) of 40" class="list-con-item">
              <th>
                <input type="checkbox">
              </th>
              <td>
                {{index}}
              </td>
              <td>
                浙江省
              </td>
              <td>杭州市</td>
              <td>浙江永丰钢业有限公司</td>
              <td>杭州市西湖区199号</td>
              <td>五六一</td>
              <td>0571-88991234</td>
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
    <alert-v v-on:close="close" :btn="btn" v-on:next="next" v-if="addDialog">
      <span slot="name">添加客户</span>
      <div class="tep-in" slot="con">
        <div class="as-item">
          <p class="as-item-tit">
            监控器型号：
          </p>
          <div class="as-item-con">
            <select class="" name="">
              <option value="">zh-12312</option>
              <option value="">zh-345345</option>
            </select>
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            监控器UID：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            监控器出厂编号：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            所属单位：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
        <div class="as-item">
          <p class="as-item-tit">
            安装单位：
          </p>
          <div class="as-item-con">
            <input type="text" name="" value="">
          </div>
        </div>
      </div>
    </alert-v>
  </div>
</template>
<script>
import pages from '../../components/pages.vue';
import alert from '../../components/alert.vue';

export default {
  data() {
    return {
      btn: '确定',
      pageNum: 1,
      pageSize: 10,
      total: 200,
    }
  },
  components: {
    'pages-v': pages,
    'alert-v': alert
  },
  computed: {
    addDialog() {
      return this.$store.getters.dialog.status;
    }
  }
}
</script>
<style lang="scss" scoped>
#clientList {
  .rightTabbar {
    width: 100%;
    height: 30px;
    border-bottom: 4px solid #2899ee;
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
      width: 455px;
      height: 24px;
      background: #FFFFFF;
      border: 1px solid #D3D3D3;
      border-radius: 2px;
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
}

</style>
