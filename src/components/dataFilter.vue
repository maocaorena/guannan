<template>
    <div class="rt-handle">

        <div class="handle-item">
          <select name="" id="" v-model="clientId">
            <option value="">请选择公司</option>
            <option value="1">浙江永丰钢业有限公司</option>
          </select>
        </div>

        <div class="handle-item">
          <select name="" id="" v-model="monitorplaceid">
            <option value="">选择监控点</option>
            <option value="2">永丰A</option>
          </select>
        </div>

        <div class="handle-item">
          <select name="" id="">
            <option value="1">日报表</option>
            <option value="2">月报表</option>
            <option value="3">报表</option>
          </select>
        </div>
        <div class="handle-item">
          <button type="button" name="button">查询</button>
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
                clientId: "",
                monitorplaceid: "",
                timedetail: 1,
                starttime: "",
                endtime: ""
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
            }
        },
        created(){

        }
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
