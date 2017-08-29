<template>
    <div id="login">
        <div class="login-con">
            <div class="tit-logo">
                <img src="../../assets/img/login/login_logo.png" alt="">
            </div>
            <div class="login-bottom">
                <div class="left">
                    <div class="f-item">
                        <div class="item-left">
                            <img src="../../assets/img/login/user.png" alt="">
                            <input type="text" placeholder="用户名" name="" value="">
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="item-left">
                            <img src="../../assets/img/login/pw.png" alt="">
                            <input type="password" placeholder="密码" name="" value="">
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="item-left width1">
                            <input class="margin20" type="text" placeholder="验证码" name="" value="">
                        </div>
                        <div class="code">

                        </div>
                    </div>
                    <div class="f-item">
                        <div class="item-left">
                            <button type="button" name="button" @click="login()">登录</button>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <p>
                        NTEGRITY /INNOVATION <br>
                        INTEGRATION /MUTUAL BENEFIT <br>
                        诚信  ·  创新  ·  融合  ·  共赢 <br><br>
                        联系电话：0571-82790505
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods:{
        login(){
            this.$router.push('/monitoringRun')
        }
    },
    created(){
        console.log(11111)
    }
}
</script>

<style lang="scss" scoped>
    #login{
        padding-top: 120px;
        width: 100%;
        height: 100%;
        background: url(../../assets/img/login/bg.png) no-repeat center;
        .login-con{
            margin: 0 auto;
            width: 740px;
            height: 432px;
        }
        .login-bottom{
            margin: 80px auto 0;
            padding: 30px;
            width: 720px;
            height: 286px;
            background: rgba(255,255,255,0.5);
            border-radius: 5px;
            .left{
                float: left;
                width: 54%;
                height: 226px;
                border-right: 1px solid #fff;
            }
            .right{
                float: left;
                padding-top: 50px;
                padding-left: 29px;
                width: 45%;
                height: 226px;
                p{
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    color: #2899EE;
                    line-height: 28px;
                }
            }
        }
        .f-item{
            margin-bottom: 10px;
            width: 330px;
            height: 50px;
            line-height: 50px;
            .item-left{
                float: left;
                width: 100%;
                height: 100%;
                background: #FFFFFF;
                border-radius: 4px;
            }
            .code{
                float: left;
                margin-left: 13px;
                width: 30%;
                height: 50px;
                background: #666;
                border-radius: 4px;
            }
            .width1{
                width: 66%;
            }
            .margin20{
                margin-left: 20px;
            }
            img{
                position: relative;
                top: 3px;
                margin-left: 20px;
            }
            input{
                margin-left: 10px;
                width: 70%;
                height: 30px;
                outline: none;
                border: none;
                font-size: 16px;
            }
            button{
                width: 330px;
                height: 50px;
                background: #2899EE;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                font-family: MicrosoftYaHei;
                cursor: pointer;
            }
        }
    }
</style>
