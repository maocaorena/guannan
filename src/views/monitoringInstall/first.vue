<template>
    <div class="tep-bottom">
        <div class="as-item">
            <p class="as-item-tit">
                监控点名称：
            </p>
            <div class="as-item-con">
                <input type="text" name="" value="">
            </div>
        </div>
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
        <div class="as-item">
            <p class="as-item-tit">
                备注：
            </p>
            <div class="as-item-con">
                <input type="text" name="" value="">
            </div>
        </div>
        <div class="as-item">
            <p class="as-item-tit">
                备注：
            </p>
            <div class="as-item-con">
                <button type="button" name="button" @click="tofirstAdd">选择位置</button>
            </div>
        </div>
        <firstadd-v v-if="firstAdd.state"></firstadd-v>
    </div>
</template>
<script type="text/javascript">
import firstadd from './firstAdd.vue'
    export default{
        data(){
            return{

            }
        },
        computed:{
            firstAdd(){
                return this.$store.getters.firstAdd;
            }
        },
        components:{
            "firstadd-v" : firstadd,
        },
        methods:{
            tofirstAdd(){
                this.$store.dispatch('SetFirstAddAlert',{
                    state: true
                })
            }
        },
        created(){

        }
    }
</script>
<style lang="scss" scoped>
.tep-bottom{
    padding-top: 15px;
    width: 100%;
    height: 269px;
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
            width: 455px;
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
