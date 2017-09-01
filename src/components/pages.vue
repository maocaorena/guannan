<template>
    <div class="pages">
        <div class="pages-left">
            <input type="checkbox" name="" value="">
            全选
        </div>
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
            <span class="handle-page">
                <input type="text" name="" value="">
                <span class="change-page">
                    <i class="to-top">
                    </i>
                    <i class="to-bottom">
                    </i>
                </span>
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
        .pages-left{
            width: 60px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            line-height: 30px;
            font-size: 12px;
            color: #333;
            input{
                position: relative;
                top: 2px;
            }
        }
        .middle{
            display: inline-block;
            vertical-align: middle;
            width: 255px;
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
        .handle-page{
            display: inline-block;
            position: relative;
            top: 5px;
            width: 55px;
            height: 19px;
            background: #F9F9F9;
            border: 1px solid #E4E4E4;
            border-radius: 5px;
            input{
                position: relative;
                bottom: 7px;
                width: 20px;
                height: 15px;
                outline: none;
                border: 0;
                font-size: 12px;
                padding-left: 2px;
            }
            .change-page{
                display: inline-block;
                width: 20px;
                i{
                    position: absolute;
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    right: 5px;
                }
                .to-top{
                    top: 0;
                    background: url(../assets/img/pages/shang.png) no-repeat center;
                }
                .to-bottom{
                    top: 7px;
                    background: url(../assets/img/pages/xia.png) no-repeat center;
                }
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
