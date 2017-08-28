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
        this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
            {
                tit : '湖北省',
                list : [
                    {
                        name : '杭州东南有限公司',
                    },
                    {
                        name : '杭州西北有限公司',
                    },
                    {
                        name : '金华西南有限公司',
                    },
                ]
            },
        ]);

    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunItem{
        color: blue;
    }
</style>
