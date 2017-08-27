<template>
    <div class="leftbar">
        <div class="lb-top">全部</div>
        <ul class="firrst-list">
            <li class="first-item">浙江省</li>
            <li>
                <ul class="second-list">
                    <li class="second-item">杭州东南有限公司</li>
                    <li class="second-item">杭州东南有限公司</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
    .leftbar{
        width: 100%;
        height: 100%;
        .lb-top{
            width: 100%;
            height: 35px;
            background: #2899ee;
            color: #fff;
            font-size: 14px;
            line-height: 35px;
            text-indent: 10px;
        }
        .first-item{
            width: 100%;
            height: 29px;
            text-indent: 28px;
            line-height: 29px;
            background: #e3e3e3;
            background:-moz-linear-gradient(top, #fdfdfd, rgba(222, 222, 222, 1));
            background:-o-linear-gradient(top, #fdfdfd, rgba(222, 222, 222, 1));
            background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fdfdfd), to(rgba(222, 222, 222, 1)));
            background:gradient(linear, 0 0, 0 bottom, from(#fdfdfd), to(rgba(222, 222, 222, 1)));
            border: 1px solid #cccccc;
        }
        .second-item{
            width: 100%;
            height: 32px;
            line-height: 32px;
            text-indent: 48px;
            border-bottom: 2px dashed #ddd;
            cursor: pointer;
        }
    }
</style>
