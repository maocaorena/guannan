<template>
    <div class="alertSetting">
        <div class="alertSetting-in">
            <div class="alertSetting-tit">
                <p class="alertSetting-name"><slot name="name">设置</slot></p>
                <div class="alertSetting-handle">
                    <a href="javascript:;" @click="close">
                        <img src="../assets/img/alert/close.png" alt="">
                    </a>
                </div>
            </div>
            <slot name="conwrap">
                <div class="alertSetting-container">
                    <slot name="con">

                    </slot>
                </div>
            </slot>
            <div class="alertSetting-footer">
        		<button class="border" @click="next"><span>下一步</span></button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
    	props: [
            "type",
        ],
        data(){
            return{
                fullPage: false,
            }
        },
        methods:{
            close(){
                this.$emit('close', '')
            },
            next(){
            	this.$emit('next', '')
            },
        },
        created(){
        },
        mounted(){
            document.body.append(this.$el)
        }
    }
</script>
<style lang="scss">
    .alertSetting:after{
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        width: 0;
    }
    .alertSetting{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        .alertSetting-in{
            display: inline-block;
            vertical-align: middle;
        	position: relative;
            background: #fff;
            width: 600px;
            height: 400px;
            border-radius: 3px;
            overflow: hidden;
        }
        .alertSetting-tit{
            padding: 0 5px;
            width: 100%;
            height: 28px;
            line-height: 28px;
            border-bottom: 1px solid #20a0ff;
            background: #2899EE;
            font-size: 14px;
        }
        .alertSetting-name{
            float: left;
            width: 50%;
            height: 100%;
            text-align: left;
            text-indent: 5px;
            color: #fff;
        }
        .alertSetting-handle{
            float: left;
            width: 50%;
            height: 100%;
            text-align: right;
            a{
                display: inline-block;
                width: 28px;
                height: 100%;
                text-align: center;
            }
        }
        .alertSetting-container{
            position: absolute;
            top: 28px;
            bottom: 50px;
            right: 0;
            left: 0;
        	padding: 0 5px 0;
            width: auto;
            height: auto;
            overflow: auto;
            border: 1px solid #CFDDE7;
            border-top: 0;
            border-bottom: 0;
        }
        .alertSetting-footer{
            position: absolute;
            bottom: 0;
            z-index: 999999;
        	width: 100%;
        	height: 50px;
        	background: #F5F5F5;
            text-align: center;
            line-height: 52px;
            border-radius: 0 0 5px 5px;
            border: 1px solid #CFDDE7;
            border-top: 0;
            button{
                height: 26px;
                padding: 0 30px;
                background: #2899EE;
                border-radius: 3px;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
</style>
