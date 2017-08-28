<template>
    <div id="fanIll">
        fanIll
        风机故障
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
                isurl : 'fanIll',
                name : '风机故障机报表'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs)
    }
}
</script>

<style lang="scss" scoped>
    #fanIll{
        color: blue;
    }
</style>
