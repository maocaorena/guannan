<template>
    <div class="pages">
        <div class="middle">
            <a href="javascript:;">
                <img src="../assets/img/pages/Page1.png" alt="">
            </a>
            <a href="javascript:;">
                <img src="../assets/img/pages/Page2.png" alt="">
            </a>
            <span class="middle-mid">
                <i class="white">22</i>
                <i class="all">共 6 页</i>
            </span>
            <a href="javascript:;">
                <img src="../assets/img/pages/Page3.png" alt="">
            </a>
            <a href="javascript:;">
                <img src="../assets/img/pages/Page4.png" alt="">
            </a>
            <span>
                1111
            </span>
        </div>
        <div class="pages-right">
            1 - 10 &nbsp 共 54 条
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {

            }
        },
        props:[

        ],
        methods:{

        },
        created(){

        }
    }
</script>
<style lang="scss" scoped>
    .pages{
        position: relative;
        width: 100%;
        height: 30px;
        text-align: center;
        background: #f1f1f1;
        .middle{
            display: inline-block;
            vertical-align: middle;
            width: 235px;
            height: 30px;
            line-height: 30px;
            a{
                display: inline-block;
                padding: 0 6px;
                height: 100%;
            }
        }
        .middle-mid{
            display: inline-block;
            width: 86px;
            height: 100%;
            i{
                font-style: normal;
            }
            .white{
                display: inline-block;
                padding: 0 7px;
                height: 19px;
                background: #fff;
                border: 1px solid #e4e4e4;
                color: #343434;
                font-size: 12px;
                line-height: 18px;
            }
            .all{
                color: #6c6c6c;
                font-size: 12px;
            }
        }
        .pages-right{
            position: absolute;
            top: 0;
            right: 20px;
            width: 106px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }
    }
    .pages:after{
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }
</style>
