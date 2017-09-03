<template>
    <div class="firstAdd">
        <alert-v v-on:close="close" v-on:next="next" :btn="btn">
            <span slot="name">选择位置</span>
            <div class="tep-in" slot="con">
                范德萨发生地方
            </div>
        </alert-v>
    </div>
</template>
<script type="text/javascript">
    import alert from '../../components/alert.vue';
    export default{
        data(){
            return{
                btn: '确定',
            }
        },
        computed:{
            firstAdd(){
                return this.$store.getters.firstAdd;
            }
        },
        components:{
            'alert-v' : alert,
        },
        methods:{
            close(){
                this.$store.dispatch('SetFirstAddAlert',{
                    state: false,
                });
            },
            next(){
                console.log(22222);
                //提交编辑或者新增的信息到vuex
                this.$store.dispatch('SetFirstAddMessage',{

                });
                this.close()
            },
        },
        created(){

        }
    }
</script>
<style lang="scss" scoped>
    .firstAdd{
        position: relative;
        z-index: 99999;
        .tep-in{
            width: 100%;
            padding-top: 7px;

        }

    }
</style>
