<template>
    <div id="monitoringRunList">
        monitoringRun
        运行监控列表
        <router-link tag="button" to="/monitoringRun/item">
            点击去详情
        </router-link>
        <router-link tag="button" to="/monitoringRun/map">
            地图模式
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components:{

    },
    created(){
        let tabs = [
            {
                isurl : 'list',
                name : '运行监控'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs);
        
    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunList{
        color: blue;
    }
</style>
