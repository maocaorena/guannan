<template>
    <div id="monitoringRunItem">
        <hzWatch v-show="$route.name === 'hzWatch'"></hzWatch>
        <smartMeters v-show="$route.name === 'smartMeters'"></smartMeters>
        <fanRunwatch v-show="$route.name === 'fanRunwatch'"></fanRunwatch>
    </div>
</template>

<script>
import hzWatch from './hzWatch.vue';
import smartMeters from './smartMeters.vue';
import fanRunwatch from './fanRunwatch.vue';

export default {
    data() {
        return {

        }
    },
    components: {
        'hzWatch': hzWatch,
        'smartMeters': smartMeters,
        'fanRunwatch': fanRunwatch,
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
        console.log(this.$route)
    }
}
</script>

<style lang="scss" scoped>
    #monitoringRunItem{
        color: blue;
    }
</style>
