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
                isurl : 'item',
                name : '监控详情'
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
