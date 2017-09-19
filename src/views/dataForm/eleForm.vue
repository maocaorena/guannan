<template>
  <div id="eleForm">
    <div class="rightTabbar">
      <div class="rt-item rtItemSelect">
        用户报表
      </div>
      <div class="rt-handle">

        <div class="handle-item">
          <select name="" id="">
            <option value="">公司名称</option>
          </select>
        </div>

        <div class="handle-item">
          <select name="" id="">
            <option value="">监控点</option>
          </select>
        </div>

        <div class="handle-item">
          <select name="" id="">
            <option value="">日报表</option>
          </select>
        </div>
        <div class="handle-item">
          <button type="button" name="button">查询</button>
        </div>
        <div class="handle-item">
          <button type="button" name="button">导出</button>
        </div>
        <div class="handle-item">
          <button type="button" name="button">自定义报表</button>
        </div>

      </div>
    </div>
    <div class="content">
      <div class="list-tit">
        <table class="list" border="1" cellspacing="0" cellpadding="0">
          <colgroup>
            <col width="8">
            <col width="11">
            <col width="8">
            <col width="7">
            <col width="11">
            <col width="8">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
          </colgroup>
          <thead>
            <tr>
              <th>时间</th>
              <th>单位名称</th>
              <th>监控点名称</th>
              <th>监控点UID</th>
              <th>累计电能</th>
              <th>有功功率</th>
              <th>无功功率</th>
              <th>A相电压</th>
              <th>B相电压</th>
              <th>C相电压</th>
              <th>A相电流</th>
              <th>B相电流</th>
              <th>C相电流</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="list-container">
        <table class="list" border="1" cellspacing="0" cellpadding="0">
          <colgroup>
            <col width="8">
            <col width="11">
            <col width="8">
            <col width="7">
            <col width="11">
            <col width="8">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
            <col width="9">
          </colgroup>
          <tbody class="list-con">
            <tr v-if="!ifPage">
              <td colspan="13">暂无数据</td>
            </tr>
            <tr v-for="(item,index) in items" class="list-con-item">
              <td>
                2017-03-04
              </td>
              <td>
                浙江永丰钢业有限公司
              </td>
              <td>A车间</td>
              <td>313D9313</td>
              <td>80小时</td>
              <td>50</td>
              <td>140</td>
              <td>100</td>
              <td>60</td>
              <td>60</td>
              <td>60</td>
              <td>60</td>
              <td>60</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="downpage" v-if="ifPage">
      <pages-v :pageNum="pageNum" :pageSize="pageSize" :total="total" v-on:pagechange="pagechange"></pages-v>
    </div>
  </div>
</template>
<script>
import pages from '../../components/pages.vue';

export default {
  data() {
    return {
        pageNum: 1,
        pageSize: 10,
        total: 200,
        items: [],
        ifPage: true
    }
  },
  components: {
    'pages-v' : pages,
  },
  created() {
    var self = this;
    let tabs = [{
      isurl: 'eleForm',
      name: '用电报表'
    }];
    this.$store.dispatch('ChangeRightbar', tabs);

    let url = "/finddata/findElectricUseByCondition";
    var data = {
      currentpage: this.pageNum,
      pagesize: this.pageSize,
      clientid: 1,
      monitorplaceid: 1,
      timedetail: "",
      startTime: "",
      endTime: ""
    }
    this.api.handleAjax(url,data).done(function(res){
      // self.total = res.total;
      // self.pageSize = res.pageSize;
      // self.pageNum = res.pageNum;
      if(res.list.length > 0) {
        self.total = res.total;
        self.pageSize = res.pageSize;
        self.pageNum = res.pageNum;
        self.items = res.list;
      } else {
        self.ifPage = false;
      }
      console.log(res.pageNum,res.pageSize,res.total)
    }).fail(function(res){
      console.log(res);
    })
  },
  methods: {
    pagechange(val){
        console.log(val+'页')
    }
  }
}

</script>
<style lang="scss" scoped>
#eleForm {
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
