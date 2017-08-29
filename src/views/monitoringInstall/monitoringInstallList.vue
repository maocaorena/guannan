<template>
    <div id="monitoringRunList">
        monitoringRun
        监控接装列表
        <router-link tag="button" to="/monitoringInstall/item">
            点击去详情
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
                name : '监控列表'
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
