<template>
    <div class="pages">
        <!-- <div class="middle">
            <a href="javascript:;" v-show="pageNums == 1">
                <img src="../assets/img/pages/Page1.png" alt="">
            </a>
            <a href="javascript:;" v-show="pageNums > 1" @click="setCurrent(1)">
                <img src="../assets/img/pages/Page8.png" alt="">
            </a>
            <a href="javascript:;" v-show="pageNums == 1">
                <img src="../assets/img/pages/Page2.png" alt="">
            </a>
            <a href="javascript:;" @click="setCurrent(pageNums - 1)" v-show="pageNums > 1">
                <img src="../assets/img/pages/Page7.png" alt="">
            </a>
            <span class="middle-mid">
                <i class="white">{{pageNums}}</i>
                <i class="all">共 {{pages}} 页</i>
            </span>
            <a href="javascript:;" @click="setCurrent(pageNums + 1)" v-show="pageNums < pages">
                <img src="../assets/img/pages/Page3.png" alt="">
            </a>
            <a href="javascript:;" v-show="pageNums == pages">
                <img src="../assets/img/pages/Page6.png" alt="">
            </a>

            <a href="javascript:;" v-show="pageNums < pages" @click="setCurrent(pages)">
                <img src="../assets/img/pages/Page4.png" alt="">
            </a>
            <a href="javascript:;" v-show="pageNums == pages">
                <img src="../assets/img/pages/Page5.png" alt="">
            </a>
            <span class="handle-page">
                <span class="dd">{{pageNums}}</span>
                <span class="change-page">
                    <i class="to-top" @click="setCurrent(pageNums + 1)">
                    </i>
                    <i class="to-bottom" @click="setCurrent(pageNums - 1)">
                    </i>
                </span>
            </span>
        </div>
        <div class="pages-right">
            {{(pageNums-1)*pageSize + 1}} - {{(pageNums)*pageSize}} &nbsp 共 {{total}} 条
        </div>
        <p style="display: none;">{{bb}}</p> -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
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
    export default {
        data() {
            return {
                pageNums: this.pageNum,
                all: false,
                currentPage4: this.pageNum
            }
        },
        props: {
            total: { // 数据总条数
                type: Number,
                default: 0
            },
            pageSize: { // 每页显示条数
                type: Number,
                default: 10
            },
            pageNum: { // 当前页码
                type: Number,
                default: 1
            },
        },
        computed: {
            pages: function() { // 总页数
                return Math.ceil(this.total / this.pageSize);
            },
            bb: function() { // 总页数
                this.pageNums = this.pageNum
                return this.pageNum;
            },
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.$emit('pagechange', val);
            },
            setCurrent: function(idx) {
                if (this.pageNums != idx && idx > 0 && idx < this.pages + 1) {
                    this.pageNums = idx;
                    this.$emit('pagechange', this.pageNums);
                }
            },
        },
        created() {

        }
    }
</script>
<style lang="scss" scoped>
    .pages {
        position: relative;
        width: 100%;
        height: 30px;
        text-align: center;
        background: #f1f1f1;
        overflow: hidden;
        .pages-left {
            width: 60px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            line-height: 30px;
            font-size: 12px;
            color: #333;
            input {
                position: relative;
                top: 2px;
            }
        }
        .middle {
            display: inline-block;
            vertical-align: middle;
            height: 30px;
            line-height: 30px;
            a {
                display: inline-block;
                padding: 0 6px;
                height: 100%;
            }
        }
        .middle-mid {
            display: inline-block;
            height: 100%;
            i {
                font-style: normal;
            }
            .white {
                display: inline-block;
                width: 30px;
                height: 19px;
                background: #fff;
                border: 1px solid #e4e4e4;
                color: #343434;
                font-size: 12px;
                line-height: 18px;
            }
            .all {
                color: #6c6c6c;
                font-size: 12px;
            }
        }
        .handle-page {
            display: inline-block;
            position: relative;
            top: 5px;
            width: 55px;
            height: 19px;
            background: #F9F9F9;
            border: 1px solid #E4E4E4;
            border-radius: 5px;
            .dd {
                position: relative;
                bottom: 7px;
                width: 20px;
                height: 15px;
                outline: none;
                border: 0;
                font-size: 12px;
                padding-left: 2px;
            }
            .change-page {
                display: inline-block;
                width: 20px;
                i {
                    position: absolute;
                    display: inline-block;
                    width: 10px;
                    height: 9px;
                    right: 5px;
                }
                .to-top {
                    top: 0;
                    background: url(../assets/img/pages/shang.png) no-repeat center;
                }
                .to-bottom {
                    top: 10px;
                    background: url(../assets/img/pages/xia.png) no-repeat center;
                }
            }
        }
        .pages-right {
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

    .pages:after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }
</style>