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
        this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
            {
                tit : '山西',
                list : [
                    {
                        name : '山西东南有限公司',
                    },
                    {
                        name : '山西西北有限公司',
                    },
                    {
                        name : '山西西南有限公司',
                    },
                ]
            },
        ]);
    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunList{
        color: blue;
    }
</style>
