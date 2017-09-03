<template>
    <div id="fanIll">
        fanIll
        风机故障
        <alert-v></alert-v>
    </div>
</template>

<script>
import alert from '../../components/alert.vue';

export default {
    data() {
        return {

        }
    },
    components:{
        'alert-v' : alert,
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
