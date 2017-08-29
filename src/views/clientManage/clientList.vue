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
        
    }
}
</script>

<style lang="scss" scoped>
    #clientList{
        color: blue;
    }
</style>
