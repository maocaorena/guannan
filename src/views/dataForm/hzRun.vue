<template>
    <div id="hzRun">
        hzRun
        变频器运行报表
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
                isurl : 'hzRun',
                name : '变频器运行报表'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs)
    }
}
</script>

<style lang="scss" scoped>
    #hzRun{
        color: blue;
    }
</style>
