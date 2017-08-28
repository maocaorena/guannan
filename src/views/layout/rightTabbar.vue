<template>
    <div class="rightTabbar">
        <div class="rt-item" :class="{rtItemSelect: $route.path.indexOf(item.isurl)>=0}" v-for="item of rightbars">
            <router-link :to="nowurl+item.isurl" replace>
                {{item.name}}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nowurl: '',
        }
    },
    computed:{
        rightbars(){
            return this.$store.getters.rightbars
        },
    },
    watch: {
        '$route' (to, from) {
            let strInd = this.$route.fullPath.lastIndexOf('/');
            this.nowurl = this.$route.fullPath.slice(0,strInd+1);
        }
    },
    created(){

    },

}
</script>

<style lang="scss" scoped>
.rightTabbar{
    width: 100%;
    height: 30px;
    border-bottom: 4px solid #2899ee;
    .rt-item{
        margin-right: 3px;
        float: left;
        width: 120px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border: 1px solid #cfdde7;
        border-bottom: 0;
        cursor: pointer;
        a{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .rtItemSelect{
        background: #2899ee;
        border-color: #2899ee;
        a{
            color: #fff;
        }
    }
}
</style>
