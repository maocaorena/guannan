<template>
    <div class="rightbar">
        <!-- <right-tabbar></right-tabbar> -->
        <router-view></router-view>
    </div>
</template>

<script>
import rightTabbar from './rightTabbar.vue'
export default {
    data() {
        return {

        }
    },
    components:{
        'right-tabbar' : rightTabbar,
    },
    created(){
    }
}
</script>

<style lang="scss">
    .rightbar{
        padding: 4px 10px 10px 16px;
    }
</style>
