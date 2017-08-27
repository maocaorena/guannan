<template>
    <div id="monitoringRunMap">
        monitoringRunMap
        运行监控地图模式
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
                isurl : 'map',
                name : '地图模式'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs)
    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunMap{
        color: blue;
    }
</style>
