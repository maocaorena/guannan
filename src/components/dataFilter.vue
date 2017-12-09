<template>
    <div class="rt-handle">
        <div class="handle-item">
          <select name="" id="" v-model="clientCity">
            <option value="">请选择城市</option>
            <option :value="index" :key="index" v-for="(item,index) of provinceArr"> {{item.province}}</option>
          </select>
        </div>
        <div class="handle-item">
          <select name="" id="" v-model="clientCompany">
            <option value=" ">请选择公司</option>
            <option :value="item.clientid" :key="item.clientid" v-for="(item,index) of companyArr">{{item.clientname}}</option>
          </select>
        </div>

        <div class="handle-item">
          <select name="" id="" v-model="monitorplaceId">
            <option value=" ">选择监控点</option>
            <option :value="item.id" :key="item.id" v-for="(item,index) of monitorArr">{{item.monitorplacename}}</option>
          </select>
        </div>

        <div class="handle-item">
          <select name="" id="" v-model="dataType">
            <option value="1">日报表</option>
            <option value="2">月报表</option>
            <option value="3">报表</option>
          </select>
        </div>
        <div class="handle-item">
          <button type="button" name="button" @click="searchFn()">查询</button>
        </div>
        <div class="handle-item">
          <button type="button" name="button" @click="exportExcel()">导出</button>
        </div>
        <div class="handle-item">
          <button type="button" name="button">自定义报表</button>
        </div>

      </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                clientCity: "",
                clientCompany: "",
                monitorplaceId: "",
                timedetail: 1,
                starttime: "",
                endtime: "",
                dataType: 1,
                provinceArr: [],
                companyArr: [],
                monitorArr: []
            }
        },
        props: [],
        computed:{
            
        },
        methods:{
            exportExcel() {
              this.$emit("exportExcel",{
                clientId: this.clientId,
                monitorplaceid: this.monitorplaceid,
                timedetail: this.timedetail,
                starttime: this.starttime,
                endtime: this.endtime
              })
            },
            searchFn() {
              this.$emit("searchFn",{
                clientid: this.clientCompany,
                monitorplaceid: this.monitorplaceId,
                timedetail: this.dataType
              })
            },
            getData() {
              let self = this;
              let url = "/client/findProvinceAndCompanys";
              let data = {
                
              }
              this.api.handleAjax(url, data).done(function(res) {
                self.provinceArr = res;
              }).fail(function(res) {
                console.log(res);
              })
            },
            getCompany() {
              if(this.provinceArr[this.clientCity]) {
                this.companyArr = this.provinceArr[this.clientCity].clientList;
                this.monitorArr = [];                
              } else {
                this.companyArr = [];
                this.monitorArr = [];
              }
            },
            getMonitor() {
              let self = this;
              let url = "/monitorplace/findMonitorplaceByConditions";
              let data = {
                clientid: this.clientCompany
              };
              if (this.clientCompany == " ") return;
              // debugger;
              this.api.handleAjax(url, data).done(function(res) {
                self.monitorArr = res.list;
              }).fail(function(res) {
                console.log(res);
              })
            }
        },
        created(){
          this.getData();
        },
        watch: {
          clientCity: 'getCompany',
          clientCompany: 'getMonitor'
        },
    }
</script>
<style lang="scss" scoped>
    .rt-handle {
      width: auto !important;
      .handle-item {
        display: inline-block;
        float: none;
      }
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
        background: url(../assets/img/bg_sheng.png) repeat-x;
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
</style>
