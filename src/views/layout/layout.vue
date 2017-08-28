<template>
    <div id="layout">
        <div class="top">
            <top></top>
        </div>
        <div class="container">
            <div class="con-left">
                <left></left>
            </div>
            <div class="con-right">
                <div class="con-right-top">
                    <tabbar></tabbar>
                </div>
                <div class="con-right-bottom">
                    <right></right>
                </div>
            </div>
        </div>
        <div class="bottom">
            浙江冠南能源科技股份有限公司
        </div>
    </div>
</template>

<script>
import top from './top.vue';
import left from './left.vue';
import right from './right.vue';
import tabbar from './tabbar.vue';

export default {
    data() {
        return {

        }
    },
    components:{
        'top':top,
        'left':left,
        'right':right,
        'tabbar':tabbar,
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
    #layout{
        width: 100%;
        height: 100%;
        position: relative;
        .top{
            width: 100%;
            height: 66px;
        }
        .container{
            position: absolute;
            top: 66px;
            right: 0;
            left: 0;
            bottom: 32px;
            width: auto;
            height: auto;
        }
        .con-left{
            position: absolute;
            left: 0;
            top: 0;
            width: 194px;
            height: 100%;
            background: #f4f4f4;
            border: 1px solid #dfdfdf;
            border-top: 0;
        }
        .con-right{
            position: absolute;
            left: 195px;
            top: 0;
            right: 0;
            bottom: 0;
            width: auto;
            height: auto;
            background: #fefefe;
        }
        .con-right-top{
            width: 100%;
            height: 35px;
            background: #aaa;
        }
        .bottom{
            position: absolute;
            left: 0;
            bottom: 0;
            background: #d8d8d8;
            height: 32px;
            width: 100%;
            line-height: 32px;
            text-align: center;
        }
    }
</style>
