<template>
    <div class="forget">
        <div class="header">
            <router-link to="login" class="el-icon-arrow-left"></router-link>
            <span>重置密码</span>
        </div>
        <div class="main">
            <input v-model="username" type="text" placeholder="账号">
            <input v-model="oldPassword" type="text" placeholder="旧密码">
            <input v-model="newPassword" type="text" placeholder="请输入新密码">
            <input v-model="newPW" type="text" placeholder="请确认密码">
            <input v-model="captchaCode" type="text" placeholder="验证码">
            <img :src="verCode">
            <div @click="imgNew" class="change_img">
                <p>看不清</p>
                <p>换一张</p>
            </div>
            <input @click="qrUpdate" type="button" value="确认修改">
            <div class="mask" v-if="isBool">
                <i class="el-icon-warning-outline"></i>
                <p>{{masks}}</p>
                <button @click="isBool=!isBool">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {captchas,updatePassword} from "../request/api";

    export default {
        name: "Forget",
        data(){
            return{
                verCode:"",
                masks:"",
                isBool:false,
                username:"",
                oldPassword:"",
                newPassword:"",
                newPW:"",
                captchaCode:"",
            }
        },
        created(){
            captchas().then(data=>{
                this.verCode = data.code;
            })
            // this.axios.post("https://elm.cangdu.org/v1/captchas").then(data=>{
            //     this.verCode = data.data.code;
            // })
        },
        methods:{
            // 切换图片
            imgNew(){
                captchas().then(data=>{
                    this.verCode = data.code;
                })
                // this.axios.post("https://elm.cangdu.org/v1/captchas").then(data=>{
                //     this.verCode = data.data.code;
                // })
            },
            // 确认修改按钮
            qrUpdate(){
                updatePassword({
                    username:this.username,
                    oldpassWord:this.oldPassword,
                    newpassword:this.newPassword,
                    confirmpassword:this.newPW,
                    captcha_code:this.captchaCode
                }).then(data=>{
                    console.log(data)
                    if (data.type == "ERROR_QUERY") {
                        this.masks = data.message;
                        this.isBool = !this.isBool;
                    } else if (data.status == "1") {
                        this.masks = data.success;
                        this.isBool = !this.isBool;
                    }
                })
                // this.axios.post("https://elm.cangdu.org/v2/changepassword",{username:this.username,oldpassWord:this.oldPassword,newpassword:this.newPassword,confirmpassword:this.newPW,captcha_code:this.captchaCode}).then(data=>{
                //     if (data.data.type == "ERROR_QUERY") {
                //         this.masks = data.data.message;
                //         this.isBool = !this.isBool;
                //     } else if (data.data.status == "1") {
                //         this.masks = data.data.success;
                //         this.isBool = !this.isBool;
                //     }
                // })
            }
        }
    }
</script>

<style scoped>
    .header{
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        background-color: blue;
        color: #ffffff;
    }
    .header>a{
        float: left;
        color: #ffffff;
        font-size: 1.3rem;
        margin-top: .3rem;
    }
    .main{
        position: relative;
        margin-top: 1rem;
    }
    .main>input{
        width: 100%;
        height: 2.5rem;
        border-top: 1px solid #d4d4d4;
        padding-left: .5rem;
        box-sizing: border-box;
        font-size: .7rem;
    }
    .main>input:nth-child(8){
        width: 90%;
        font-size: 1rem;
        color: white;
        border: none;
        background-color: #4cd964;
        margin: 1rem .8rem ;
        border-radius: .3rem;
    }
    .change_img{
        /*width: 5rem;*/
        font-size: .7rem;
        position: absolute;
        right: .8rem;
        bottom: 4.8rem;
    }
    .change_img>p:nth-child(2){
        color: blue;
        margin-top: .2rem;
    }
    .main>img{
        position: absolute;
        bottom: 4.7rem;
        right: 3.5rem;
    }
    .mask{
        width: 14rem;
        height: 12rem;
        position: absolute;
        top: 4.5rem;
        left: 2.5rem;
        text-align: center;
        background-color: white;
        border-radius: .5rem;
        overflow: hidden;
    }
    .mask>i{
        font-size: 6rem;
        color: #f8cb86;
        margin: 1.5rem 0 .5rem;
    }
    .mask>button{
        width: 100%;
        height: 2rem;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #4cd964;
        border: none;
    }
</style>