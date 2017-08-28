<template>
    <div id="fanRun">
        fanRun
        风机运行
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
                isurl : 'fanRun',
                name : '风机运行报表'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs)
    }
}
</script>

<style lang="scss" scoped>
    #fanRun{
        color: blue;
    }
</style>
