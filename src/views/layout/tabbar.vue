<template>
    <div class="tabbar">
        <ul class="tab-list">
            <li class="tab-item" :class="{tabItemSelected: $route.path.indexOf(item.path)>=0}" v-for="(item,index) of routes" v-if="item.children">
                <router-link :to="item.path">
                    <img :src="'./static/img/tab'+index+'.png'" alt="">
                    <span>{{item.name}}</span>
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'routes',
        ]),
    },
    created(){
        console.log()
    }
}
</script>

<style lang="scss" scoped>
.tabbar{
    width: 100%;
    height: 100%;
    background: #2899ee;
    padding-top: 9px;
    li{
        list-style: none;
    }
    .tab-list{
        padding-left: 7px;
        width: 100%;
        height: 26px;
    }
    .tab-item{
        float: left;
        width: 86px;
        height: 26px;
        color: #fff;
        text-align: center;
        line-height: 26px;
        font-size: 14px;
        img{
            width: 16px;
            height: 16px;
            position: relative;
            top: 3px;
        }
        a{
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
        }
    }
    .tabItemSelected{
        background: #e7f3ff;
        a{
            color: #3ba1f0;
        }
    }
}
</style>
1
