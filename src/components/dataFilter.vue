<template>
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
</template>
<script type="text/javascript">
    //可以传入的数据
    //数据总条数 total
    //每页显示条数 pageSize
    //当前页码 pageNum

    // 返回的事件
    // v-on:pagechange(val) 页码改变事件 val 为页码
    // v-on:selectall(val) 页码改变事件 val 为全选状态
    export default{
        data(){
            return {
                
            }
        },
        props: [],
        computed:{
            
        },
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
                width: 30px;
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
            .dd{
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
                    height: 9px;
                    right: 5px;
                }
                .to-top{
                    top: 0;
                    background: url(../assets/img/pages/shang.png) no-repeat center;
                }
                .to-bottom{
                    top: 10px;
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
