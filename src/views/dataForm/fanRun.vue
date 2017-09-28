<template>
  <div id="eleForm">
    <div class="rightTabbar">
      <div class="rt-item rtItemSelect">
        用机运行报表
      </div>
      <data-filter v-on:exportExcel="exportExcel"></data-filter>
    </div>
    <div class="content">
      <div class="list-tit">
        <table class="list" border="1" cellspacing="0" cellpadding="0">
          <colgroup>
            <col width="8">
            <col width="11">
            <col width="8">
            <col width="9">
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
              <th>累计运行时间</th>
              <th>环境温度</th>
              <th>进气滤网负压</th>
              <th>出气压力</th>
              <th>出气温度</th>
              <th>润滑油油压</th>
              <th>润滑油油温</th>
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
            <col width="9">
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
              <td colspan="11">暂无数据</td>
            </tr>
            <tr v-for="(item,index) of items" class="list-con-item">
              <td>{{item.timedetail}}</td>
              <td>
                {{item.clientname}}
              </td>
              <td>{{item.monitorplacename}}</td>
              <td>{{item.monitoruid}}</td>
              <td>{{item.totaltime}}</td>
              <td>{{item.temp}}</td>
              <td>{{item.infilnegpressure}}</td>
              <td>{{item.outairpressure}}</td>
              <td>{{item.outairtemp}}</td>
              <td>{{item.oilpressure}}</td>
              <td>{{item.oiltemp}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="downpage"  v-if="ifPage">
      <pages-v :pageNum="pageNum" :pageSize="pageSize" :total="total" v-on:pagechange="pagechange"></pages-v>
    </div>
  </div>
</template>
<script>
import pages from '../../components/pages.vue';
import dataFilter from '../../components/dataFilter.vue';


export default {
  data() {
    return {
        pageNum: 1,
        pageSize: 10,
        total: 200,
        items: [],
        ifPage: false
    }
  },
  components: {
    'pages-v' : pages,
    dataFilter
  },
  created() {
    let tabs = [{
      isurl: 'eleForm',
      name: '用电报表'
    }];
    this.$store.dispatch('ChangeRightbar', tabs);
    this.getData();
    

  },
  methods: {
    pagechange(val){
        console.log(val+'页')
    },
    exportExcel(param) {
      let url = "/exceldata/exportexcelFanRun";
      let data = param;
      this.api.handleAjax(url,data).done(function(res){
        
      }).fail(function(res){
        console.log(res);
      })
    },
    getData() {
      let url = "/finddata/findFandataByCondition";
    let data = {
      currentpage: this.pageNum,
      pagesize: this.pageSize,
      clientid: 1,
      monitorplaceid: 1,
      timedetail: "",
      startTime: "",
      endTime: ""
    }
    this.api.handleAjax(url,data).done(function(res){
      if(res.list.length > 0) {
        self.total = res.total;
        self.pageSize = res.pageSize;
        self.pageNum = res.pageNum;
        self.items = res.list;
        self.ifPage = true;
      } else {
        self.ifPage = false;
      }
    }).fail(function(res){
      console.log(res);
    })
    }
  },
  watch: {
        '$route' (to, from) {
            this.pageNum = 1;
            this.getList();
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
  th {
    /*height: 44px;*/
    text-align: left;
    padding: 0 4px;
    background-color: #f8f8f8;
  }
  .list-container {
    /*top: 44px;*/
  }
}

</style>
