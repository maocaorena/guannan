<template>
    <div id="accountList">
        accountList
        账户列表
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
                isurl : 'accountList',
                name : '账号列表'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs)
    }
}
</script>

<style lang="scss" scoped>
    #accountList{
        color: blue;
    }
</style>
