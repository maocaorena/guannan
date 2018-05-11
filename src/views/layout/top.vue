<template>
    <div class="topbar">
        <div class="logo"><img src="../../assets/img/top_logo.png" alt=""></div>
        <div class="logout">
            欢迎{{username}}！| <a href="javascript:;" @click="logout">退出登录</a>
        </div>
    </div>
</template>

<script>
import { getToken, removeToken } from '../../lib/auth' // 验权

export default {
    data() {
        return {
            username: ''
        }
    },
    created(){
        this.username = JSON.parse(getToken()).userName;
    },
    methods: {
        logout() {
            removeToken();
            location.reload();
        }
    }
}
</script>

<style lang="scss">
    .topbar{
        width: 100%;
        height: 100%;
        background: url(../../assets/img/header-bg-left.png) no-repeat left top;
        background-size: 100% 100%;
        .logo {
            float: left;
        }
        .logout {
            float: right;
            line-height: 70px;
            padding-right: 30px;
            color: #0094f2
        }
    }
</style>
