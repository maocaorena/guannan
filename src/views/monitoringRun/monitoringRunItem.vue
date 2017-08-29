<template>
    <div id="monitoringRunItem">
        <router-view></router-view>
    </div>
</template>

<script>
import rightTabbar from '../layout/rightTabbar.vue'
export default {
    data() {
        return {

        }
    },
    created(){
        let tabs = [
            {
                isurl : 'fanRunwatch',
                name : '风机运行监测'
            },{
                isurl : 'smartMeters',
                name : '智能电表'
            },{
                isurl : 'hzWatch',
                name : '变频器运行监测'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs);

    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunItem{
        color: blue;
    }
</style>
