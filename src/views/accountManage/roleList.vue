<template>
    <div id="roleList">
        roleList
        角色列表
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
                isurl : 'roleList',
                name : '角色'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs);
    }
}
</script>

<style lang="scss" scoped>
    #roleList{
        color: blue;
    }
</style>
