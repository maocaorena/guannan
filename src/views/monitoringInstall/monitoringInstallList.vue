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
        this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
            {
                tit : '北京市',
                list : [
                    {
                        name : '北京市东南有限公司',
                    },
                    {
                        name : '北京市西北有限公司',
                    },
                    {
                        name : '北京市西南有限公司',
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
