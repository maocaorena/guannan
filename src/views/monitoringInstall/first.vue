<template>
    <div class="tep-bottom" v-loading.body="loading">
        <div class="as-item">
            <p class="as-item-tit">
                监控点名称：
            </p>
            <div class="as-item-con">
                <input type="text" v-model="monitorplacename" name="" value="">
            </div>
        </div>
        <div class="as-item">
            <p class="as-item-tit">
                监控器型号：
            </p>
            <div class="as-item-con" :data="monitormodel">
                <select class="" name="" v-model="monitormodel">
                    <option v-for="item of allMonitorModel" :value="item.id">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="as-item">
            <p class="as-item-tit">
                监控器UID：
            </p>
            <div class="as-item-con">
                <input type="text" v-model="monitoruid" name="" value="">
            </div>
        </div>
        <div class="as-item">
            <p class="as-item-tit">
                监控器出厂编号：
            </p>
            <div class="as-item-con">
                <input type="text" v-model="monitorno" name="" value="">
            </div>
        </div>
        <div class="as-item">
            <p class="as-item-tit">
                安装单位：
            </p>
            <div class="as-item-con">
                <input type="text" v-model="installname" name="" value="">
            </div>
        </div>
        <div class="as-item">
            <p class="as-item-tit">
                备注：
            </p>
            <div class="as-item-con">
                <input type="text" v-model="remark" name="" value="">
            </div>
        </div>
        <div class="as-item">
            <p class="as-item-tit">
                位置：
            </p>
            <div class="as-item-con">
                <span>{{firstAddMessage.addrs}}</span>
                <button type="button" name="button" @click="tofirstAdd">选择位置</button>
            </div>
        </div>
        <firstadd-v v-if="firstAdd.state"></firstadd-v>
    </div>
</template>
<script type="text/javascript">
import firstadd from './firstAdd.vue';
import { Util } from '../../lib/util.js';
import { getToken } from '../../lib/auth.js';
export default{
    data(){
        return{
            monitorplacename: '',//监控点名称
            allMonitorModel:[],//所有监控器型号列表
            monitormodel: '',//选中的监控器型号id
            monitoruid: '',//监控器uid 、监控器硬件地址
            monitorno: '',//监控器出厂编号
            installname: '',//安装单位
            remark: '',//备注
            loading: false,
        }
    },
    computed:{
        firstAdd(){
            return this.$store.getters.firstAdd;
        },
        firstStepAlert(){//弹窗状态
            return this.$store.getters.firstStepAlert;
        },
        addid(){
            return this.$store.getters.addid;
        },
        firstAddMessage(){
            return this.$store.getters.firstAddMessage;
        },
    },
    components:{
        "firstadd-v" : firstadd,
    },
    methods:{
        tofirstAdd(){
            this.$store.dispatch('SetFirstAddAlert',{
                state: true
            })
        },
        findAllMonitorModel(){//获取所有监控器型号
            let _this = this;
            this.api.postN({
                url: '/monitormodel/findAllMonitorModel',
                success: function(res){
                    console.log(res);
                    let _res = res.response;
                    if(_res.info.code == 100000){
                        _this.allMonitorModel = _res.content;
                    }else{
                        alert(_res.info.msg)
                    };
                },
            })
        },
        sunmessage () {
            if(Util.trim(this.monitorplacename).length <= 0){
                this.$message.warning({message: '请填写监控点名称',duration: Util.time()});
                return;
            };
            console.log(this.monitormodel);
            if(!this.monitormodel){
                this.$message.warning({message: '请选择监控器型号',duration: Util.time()});
                return;
            };
            if(Util.trim(this.monitoruid).length <= 0){
                this.$message.warning({message: '请填写监控器UID',duration: Util.time()});
                return;
            };
            if(Util.trim(this.monitorno).length <= 0){
                this.$message.warning({message: '请填写监控器出厂编号',duration: Util.time()});
                return;
            };
            if(Util.trim(this.installname).length <= 0){
                this.$message.warning({message: '请填写安装单位',duration: Util.time()});
                return;
            };
            let params = {
                clientid: this.$route.query.clientid,//客户公司id
                monitorplacename: Util.trim(this.monitorplacename),
                monitormodel: this.monitormodel,
                monitoruid: Util.trim(this.monitoruid),
                monitorno: Util.trim(this.monitorno),
                installname: Util.trim(this.installname),
                remark: Util.trim(this.remark),
                latitude: this.firstAddMessage.jingwei.latitude,
                longtitude: this.firstAddMessage.jingwei.longtitude,
                address: this.firstAddMessage.addrs,
                systemId: JSON.parse(getToken()).systemId
            };
            let _this = this;
            let url = '';
            if(this.firstStepAlert.type==2){
                url = '/monitorplace/updateMonitorPlaceById';
                params.id = this.addid;
            }else{
                url = '/monitorplace/addMonitorPlaceByClient';
            };
            this.loading = true;
            this.api.postN({
                url: url,
                params: params,
                success: function(res){
                    console.log(res)
                    _this.loading = false;
                    if(res.response.info.code==100000){
                        _this.$message.success({message: res.response.info.msg,duration: Util.time()});
                        if(_this.firstStepAlert.type==2){
                        	console.log('222')
                            _this.$store.dispatch('SetAddId', _this.addid);
                        }else{
                        	console.log('11111')
                            _this.$store.dispatch('SetAddId',res.response.content.id);
                            console.log('res.response.content.id',res.response.content.id);
                            console.log('this.$store.getters.addid',_this.$store.getters.addid);
                        };
                        //进入第二步
                        _this.$emit('changeAlert',2)
                        _this.$store.dispatch('SetFirstStepAlert',{
                            type: _this.firstStepAlert.type,
                            state: 2,
                        });
                    }else{
                        _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                    }
                }
            })
        },
        findMonitorplaceById(){
            let _this = this;
            this.loading = true;
            this.api.postN({
                url: '/monitorplace/findMonitorplaceById',
                params: {
                    id: _this.addid
                },
                success: function(res){
                    _this.loading = false;
                    console.log(res);
                    if(res.response.info.code==100000){
                        _this.monitorplacename = res.response.content.monitorplacename;
                        _this.monitoruid = res.response.content.monitoruid;
                        _this.monitorno = res.response.content.monitorno;
                        _this.installname = res.response.content.installname;
                        _this.deployer = res.response.content.deployer;
                        _this.remark = res.response.content.remark;
                        _this.monitormodel = res.response.content.monitormodel;
                        //获取定位信息放入vuex
                        _this.$store.dispatch('SetFirstAddMessage',{
                            jingwei: {
                                latitude: res.response.content.latitude,
                                longtitude: res.response.content.longtitude,
                            },
                            addrs: res.response.content.address,
                        });
                        console.log(res.response.content.monitormodel);
                    }else{
                        _this.$message.error({message: res.response.info.msg,duration: Util.time()});
                    }
                }
            })
        }
    },
    created(){
        //初始化地图信息
        this.$store.dispatch('SetFirstAddMessage',{
            jingwei: {
                latitude: 40.0958,
                longtitude: 116.480983,
            },
        });
        this.findAllMonitorModel();
        if(this.firstStepAlert.type==2){
            this.findMonitorplaceById();
        }
    }
}
</script>
<style lang="scss" scoped>
.tep-bottom{
    padding-top: 15px;
    width: 100%;
    height: 305px;
    border: 1px solid #CFDDE7;
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
        input,select{
            padding: 0 5px;
            width: 440px;
            height: 24px;
            background: #FFFFFF;
            border: 1px solid #D3D3D3;
            border-radius: 2px;
        }
        button{
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
