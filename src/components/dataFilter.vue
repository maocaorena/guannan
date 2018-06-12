<template>
    <div class="rt-handle">
        <div class="handle-item">
          <select name="" id="" v-model="clientCity">
            <option value="">请选择城市</option>
            <option :value="index" :key="index" v-for="(item,index) of provinceArr"> {{item.province}}</option>
          </select>
        </div>
        <div class="handle-item">
          <select name="" id="" v-model="clientId">
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
          <el-date-picker size="mini" v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :clearable="false">
                </el-date-picker>
        </div>
        
        <div class="handle-item">
          <button type="button" name="button" @click="searchFn()">查询</button>
        </div>
        <div class="handle-item" style="margin-right: 20px;">
          <button type="button" name="button" @click="exportExcel()">导出</button>
        </div>

      </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                clientCity: "",
                clientId: "",
                monitorplaceId: "",
                timedetail: 1,
                starttime: "",
                endtime: "",
                dataType: 1,
                provinceArr: [],
                companyArr: [],
                monitorArr: [],
                value7: [new Date(Date.now() - 86400000), new Date(Date.now())], //时间
            }
        },
        props: [],
        computed: {

        },
        methods: {
            exportExcel() {
                this.$emit("exportExcel", {
                    clientId: this.clientId,
                    monitorplaceid: this.monitorplaceId,
                    timetype: this.dataType,
                    starttime: this.starttime,
                    endtime: this.endtime
                })
            },
            searchFn() {
                let _start = new Date(this.value7[0]) || '';
                let _end = new Date(this.value7[1]) || '';
                if (JSON.stringify(_start) == 'null' || _start.getFullYear() < 2015) {
                    this.starttime = '';
                    this.endtime = '';
                } else {
                    this.starttime = _start.getFullYear() + '-' + this.addZero(_start.getMonth() + 1) + '-' + this.addZero(_start.getDate());
                    this.endtime = _end.getFullYear() + '-' + this.addZero(_end.getMonth() + 1) + '-' + this.addZero(_end.getDate());
                };
                console.log({
                    clientId: this.clientId,
                    monitorplaceid: this.monitorplaceId,
                    timetype: this.dataType,
                    starttime: this.starttime,
                    endtime: this.endtime
                })
                this.$emit("searchFn", {
                    clientId: this.clientId,
                    monitorplaceid: this.monitorplaceId,
                    timetype: this.dataType,
                    starttime: this.starttime,
                    endtime: this.endtime
                })
            },
            addZero(num) {
                if (num < 10) {
                    return '0' + num;
                }
                return num;
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
                if (this.provinceArr[this.clientCity]) {
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
                    clientid: this.clientId
                };
                if (!this.clientId) return;
                // debugger;
                this.api.handleAjax(url, data).done(function(res) {
                    self.monitorArr = res.list;
                }).fail(function(res) {
                    console.log(res);
                })
            }
        },
        created() {
            this.getData();
        },
        watch: {
            clientCity: 'getCompany',
            clientId: 'getMonitor'
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
            max-width: 110px;
        }
    }
</style>