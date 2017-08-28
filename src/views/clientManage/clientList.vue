<template>
    <div id="clientList">
        clientList
        客户列表
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
                isurl : 'clientList',
                name : '客户列表'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs);
        this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
            {
                tit : '客户',
                list : [
                    {
                        name : '客户东南有限公司',
                    },
                    {
                        name : '客户西北有限公司',
                    },
                    {
                        name : '客户西南有限公司',
                    },
                ]
            },
        ]);
    }
}
</script>

<style lang="scss" scoped>
    #clientList{
        color: blue;
    }
</style>
