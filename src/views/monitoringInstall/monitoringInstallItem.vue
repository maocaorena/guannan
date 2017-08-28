<template>
    <div id="monitoringRunItem">
        monitoringRunItem
        监控详情
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
        this.$store.dispatch('ChangeRightbar',tabs)
    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunItem{
        color: blue;
    }
</style>
