<template>
    <div class="leftbar">
        <div class="lb-top" v-if="leftbarsType == 1">全部</div>
        <div class="lb-top" v-if="leftbarsType == 3">
            <select class="selectAdd" name="" v-model="threeSelect" @change="hasSelect">
                <option v-for="(item,index) of leftbars">{{item.tit}}</option>
            </select>
        </div>
        <!-- 省 公司 -->
        <div v-if="leftbarsType == 1" class="first-list type1" v-for="(item,index1) of leftbars">
            <p class="first-item">
                <img class="leftIcon" src="../../assets/img/leftbar/icon_sheng.png" alt="">
                {{item.tit}}
            </p>
            <ul class="second-list">
                <li class="second-item"
                    :class="{selected:leftbarselected.first==index1&&leftbarselected.second==index2}"
                    v-for="(second,index2) of item.list"
                    @click="clickThis1(index1,index2)">
                    <img class="leftIcon" src="../../assets/img/leftbar/icon_gongsi.png" alt="">
                    {{second.tit}}
                </li>
            </ul>
        </div>
        <!-- 风机三级菜单 -->
        <div v-if="leftbarsType == 3" class="first-list type1" v-for="(item,index1) of leftbars[threeSelectInd].list">
            <p class="first-item">
                <img class="leftIcon" src="../../assets/img/leftbar/icon_gongsi.png" alt="">
                {{item.tit}}
            </p>
            <ul class="second-list">
                <li class="second-item"
                    :class="{selected:leftbarselected.first==index1&&leftbarselected.second==index2}"
                    v-for="(second,index2) of item.list"
                    @click="clickThis1(index1,index2,threeSelectInd)"><img class="leftIcon" src="../../assets/img/leftbar/icon_fengjikongzhidian.png" alt="">{{second.tit}}</li>
            </ul>
        </div>
        <!-- 菜单 -->
        <div v-if="leftbarsType == 2" class="first-list type2" v-for="(item,index1) of leftbars">
            <router-link class="first-item" tag="p" :to="item.url" :class="{selected : isthis2 == item.url}">
                {{item.tit}}
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isthis2 : '',
            threeUrl : false,
            threeSelect : '',
            threeSelectInd: 0,
        }
    },
    computed:{
        leftbarsType(){//获取要渲染的侧边栏类型
            return this.$store.getters.leftbarsType;
        },
        leftbars(){//获取要渲染的侧边栏
            console.log(JSON.parse(JSON.stringify(this.$store.getters.leftbars)))
            let bb = this.$store.getters.leftbars;
            this.threeSelect = bb[0].tit;
            return bb;
        },
        leftbarselected(){//获取要渲染的侧边栏
            return this.$store.getters.leftbarselected;
        }
    },
    watch: {
        '$route' (to, from) {
            this.leftType();
        }
    },
    methods:{
        hasSelect(){
            let cc = this.threeSelect;
            let dd = JSON.parse(JSON.stringify(this.$store.getters.leftbars));
            for (let prop in dd) {
                if(dd[prop].tit == cc){
                    this.threeSelectInd = prop;
                    this.clickThis1(0,0,prop)
                    return;
                }
            }
        },
        //选择此菜单 1
        clickThis1(ind1,ind2,ind3){
            if(ind3+1){
                console.log(ind1,this.leftbars[ind3].list[ind1].tit,ind2,this.leftbars[ind3].list[ind1].list[ind2].tit)
            }else{
                console.log(ind1,this.leftbars[ind1].tit,ind2,this.leftbars[ind1].list[ind2].tit)
            }
            this.$store.dispatch('ChangeLeftbarSelected',{
                first : ind1,
                second : ind2,
            })
        },
        leftType(){
            let parentUrl = this.$route.matched[0].path;
            console.log(parentUrl);
            this.isthis2 = this.$route.fullPath;
            switch (parentUrl) {
                case '/monitoringRun'://运行监控
                    this.$store.dispatch('ChangeLeftbarType',1);
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '山西',
                            list : [
                                {
                                    tit : '山西东南有限公司',
                                    list: [
                                        {
                                            tit : '山西风机监控1',
                                        },
                                        {
                                            tit : '山西风机监控2',
                                        },
                                        {
                                            tit : '山西风机监控2',
                                        },
                                    ]
                                },
                                {
                                    tit : '山西西南有限公司',
                                    list: [
                                        {
                                            tit : '风机监控1',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            tit : '河南',
                            list : [
                                {
                                    tit : '河南东南有限公司',
                                    list: [
                                        {
                                            tit : '风机监控1',
                                        },
                                        {
                                            tit : '风机监控2',
                                        },
                                    ]
                                },
                                {
                                    tit : '河南西南有限公司',
                                    list: [
                                        {
                                            tit : '风机监控1',
                                        },
                                    ]
                                },
                            ]
                        },
                    ]);
                    let childurl = this.$route.matched[1].path;
                    if(childurl.indexOf('map')>=0){
                        this.$store.dispatch('ChangeLeftbarType',3);
                    };
                    break
                case '/monitoringInstall'://监控接装
                    this.$store.dispatch('ChangeLeftbarType',1);
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '北京市',
                            list : [
                                {
                                    tit : '北京市东南有限公司',
                                },
                                {
                                    tit : '北京市西北有限公司',
                                },
                                {
                                    tit : '北京市西南有限公司',
                                },
                            ]
                        },
                    ]);

                    break
                case '/dataForm'://数据报表
                    this.$store.dispatch('ChangeLeftbarType',2);
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '用电报表',
                            url : '/dataForm/eleForm'
                        },
                        {
                            tit : '风机运行报表',
                            url : '/dataForm/fanRun'
                        },
                        {
                            tit : '风机故障报表',
                            url : '/dataForm/fanIll'
                        },
                        {
                            tit : '变频器运行报表',
                            url : '/dataForm/hzRun'
                        }
                    ]);
                    break
                case '/clientManage'://客户管理
                    this.$store.dispatch('ChangeLeftbarType',1);
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '客户',
                            list : [
                                {
                                    tit : '客户东南有限公司',
                                },
                                {
                                    tit : '客户西北有限公司',
                                },
                                {
                                    tit : '客户西南有限公司',
                                },
                            ]
                        },
                    ]);

                    break
                case '/accountManage'://账号管理
                    this.$store.dispatch('ChangeLeftbarType',2);
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '账号列表',
                            url : '/accountManage/accountList'
                        },
                        {
                            tit : '角色列表',
                            url : '/accountManage/roleList'
                        },
                    ]);

                    break
                default:

            }
        }
    },
    created(){
        this.leftType();
    }
}
</script>

<style lang="scss" scoped>
    .leftbar{
        width: 100%;
        height: 100%;
        .lb-top{
            width: 100%;
            height: 35px;
            background: #2899ee;
            color: #fff;
            font-size: 14px;
            line-height: 35px;
            text-indent: 10px;
        }
        .selectAdd{
            position: relative;
            left: -8px;
            padding-left: 3px;
            width: 188px;
            height: 24px;
            background: #FFFFFF;
            border: 1px solid #CFDDE7;
            border-radius: 5px;
        }
        .first-item{
            width: 100%;
            text-indent: 28px;
            background: #e3e3e3;
            background:-moz-linear-gradient(top, #fdfdfd, rgba(222, 222, 222, 1));
            background:-o-linear-gradient(top, #fdfdfd, rgba(222, 222, 222, 1));
            background: -ms-linear-gradient(top, #fdfdfd 0%,#dedede 100%);
            background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fdfdfd), to(rgba(222, 222, 222, 1)));
            background:gradient(linear, 0 0, 0 bottom, from(#fdfdfd), to(rgba(222, 222, 222, 1)));
        }
        .leftIcon{
            position: relative;
            top: 3px;
            right: 2px;
        }
        .type1 .first-item{
            height: 29px;
            line-height: 29px;
            border: 1px solid #cccccc;

        }
        .type1 .selected{
            background: #2899ee;
            color: #fff;
        }
        .second-item{
            width: 100%;
            height: 32px;
            line-height: 32px;
            text-indent: 48px;
            border-bottom: 2px dashed #ddd;
            cursor: pointer;
        }
        .second-list{
            li:nth-last-child(1){
                border: none;
            }
        }
        .type2 .first-item{
            border: none;
            cursor: pointer;
            height: 35px;
            line-height: 35px;
        }
        .type2 .selected{
            background: none;
            background: #2899ee;
            color: #fff;
        }
    }
</style>
