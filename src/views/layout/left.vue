<template>
    <div class="leftbar">
        <div class="lb-top" v-if="leftbarsType == 1">全部</div>
        <div v-if="leftbarsType == 1" class="first-list type1" v-for="(item,index1) of leftbars">
            <p class="first-item">{{item.tit}}</p>
            <ul class="second-list">
                <li class="second-item"
                    :class="{selected:leftbarselected.first==index1&&leftbarselected.second==index2}"
                    v-for="(second,index2) of item.list"
                    @click="clickThis1(index1,index2)">{{second.name}}</li>
            </ul>
        </div>
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
        }
    },
    computed:{
        leftbarsType(){//获取要渲染的侧边栏类型
            return this.$store.getters.leftbarsType;
        },
        leftbars(){//获取要渲染的侧边栏
            return this.$store.getters.leftbars;
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
        //选择此菜单 1
        clickThis1(ind1,ind2){
            console.log(ind1,this.leftbars[ind1].tit,ind2,this.leftbars[ind1].list[ind2].name)
            this.$store.dispatch('ChangeLeftbarSelected',{
                first : ind1,
                second : ind2,
            })
        },
        leftType(){
            let parentUrl = this.$route.matched[0].path
            console.log(parentUrl);
            this.isthis2 = this.$route.fullPath;
            switch (parentUrl) {
                case '/monitoringRun':
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '山西',
                            list : [
                                {
                                    name : '山西东南有限公司',
                                },
                                {
                                    name : '山西西北有限公司',
                                },
                                {
                                    name : '山西西南有限公司',
                                },
                            ]
                        },
                    ]);
                    break
                case '/monitoringInstall':
                    this.$store.dispatch('ChangeLeftbarType',1);
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '北京市',
                            list : [
                                {
                                    name : '北京市东南有限公司',
                                },
                                {
                                    name : '北京市西北有限公司',
                                },
                                {
                                    name : '北京市西南有限公司',
                                },
                            ]
                        },
                    ]);

                    break
                case '/dataForm':
                    this.$store.dispatch('ChangeLeftbarType',1);
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
                case '/clientManage':
                    this.$store.dispatch('ChangeLeftbarType',1);
                    this.$store.dispatch('ChangeLeftbar',[//要渲染的左侧侧边栏
                        {
                            tit : '客户',
                            list : [
                                {
                                    name : '客户东南有限公司',
                                },
                                {
                                    name : '客户西北有限公司',
                                },
                                {
                                    name : '客户西南有限公司',
                                },
                            ]
                        },
                    ]);

                    break
                case '/accountManage':
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
