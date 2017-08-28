<template>
    <div id="eleForm">
        eleForm
        用电报表
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
                isurl : 'eleForm',
                name : '用电报表'
            }
        ];
        this.$store.dispatch('ChangeRightbar',tabs);
        
    }
}
</script>

<style lang="scss" scoped>
    #eleForm{
        color: blue;
    }
</style>
