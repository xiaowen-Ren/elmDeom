<template>
    <div class="login">
        <div class="header">
            <router-link to="home" class="el-icon-arrow-left"></router-link>
            <span>密码登录</span>
        </div>
        <div class="main">
            <input v-model="username" type="text" placeholder="账号">
            <input v-model="password" :type="types" placeholder="密码">
            <input v-model="captcha_code" type="text" placeholder="验证码">
            <div @click="slider" class="slider">
                <span :class="span">abc...</span>
                <div id="div" :class="div"></div>
            </div>
            <div>
                <img id="img" :src="verCode"/>
                <div @click="barter" class="change_img">
                    <p>看不清</p>
                    <p>换一张</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>温馨提示：未注册过的账号，登陆时将自动注册</p>
            <p>注册过的用户可凭账号密码登录</p>
        </div>
        <button id="login" @click="loginHome" to="">登录</button>
        <router-link id="pass" to="forget">重置密码?</router-link>
        <div class="mask" v-if="!isBool">
            <i class="el-icon-warning-outline"></i>
            <p>{{masks}}</p>
            <button @click="isBool=!isBool">确认</button>
        </div>
    </div>
</template>

<script>
    import {captchas,login} from "../request/api";

    export default {
        name: "Login",
        data(){
            return{
                // 账号
                username:"",
                // 密码
                password:"",
                // 验证码图片
                verCode:"",
                // 验证码
                captcha_code:"",
                isBool:true,
                iBool:true,
                types:"password",
                span:"span",
                div:"div",
                masks:""
            }
        },
        created(){
            captchas().then(data=>{
                console.log(data);
                this.verCode = data.code;
            })
            // 获取验证码图片
            // this.axios.post("https://elm.cangdu.org/v1/captchas").then(data=>{
            //     this.verCode = data.data.code;
            // })
        },
        methods:{
            // 登录按钮
            loginHome(){
                if (this.username == "" || this.password == "" || this.captcha_code == "") {
                    this.isBool = !this.isBool;
                    this.masks = "请输入手机号/用户名/邮箱";
                    return;
                }
                login({
                    username:this.username,
                    password: this.password,
                    captcha_code:this.captcha_code
                }).then(data=>{
                    console.log(data)
                    if (data.type == "ERROR_PASSWORD") {
                        this.isBool = !this.isBool;
                        this.masks = "密码错误";
                        return;
                    }
                    if (data.type == "ERROR_CAPTCHA") {
                        this.isBool = !this.isBool;
                        this.masks = "验证码错误";
                        return;
                    }
                    localStorage.user_id = data.user_id;
                    // 点击切换上一次路由
                    this.$router.go(-1)
                })
                // this.axios.post("https://elm.cangdu.org/v2/login/",{username:this.username,password: this.password,captcha_code:this.captcha_code}).then(data=>{
                //     console.log(data);
                //     if (data.data.type == "ERROR_PASSWORD") {
                //         this.isBool = !this.isBool;
                //         this.masks = "密码错误";
                //         return;
                //     }
                //     if (data.data.type == "ERROR_CAPTCHA") {
                //         this.isBool = !this.isBool;
                //         this.masks = "验证码错误";
                //         return;
                //     }
                //     console.log(111111);
                //     localStorage.user_id = data.data.user_id;
                    // 点击切换上一次路由
                    // this.$router.go(-1)
                // })
            },
            // 看不清，换一张
            barter(){
                captchas().then(data=>{
                    this.verCode = data.code;
                })
                // this.axios.post("https://elm.cangdu.org/v1/captchas").then(data=>{
                //     this.verCode = data.data.code;
                // })
            },
            slider(){
                if (this.iBool) {
                    this.types = "text";
                    this.iBool = !this.iBool;
                    this.span = this.span == "span" ? "span1" : "span";
                    this.div = this.div == "div" ? "div1" : "div";
                } else {
                    this.types = "password";
                    this.iBool = !this.iBool;
                    this.span = this.span == "span" ? "span1" : "span";
                    this.div = this.div == "div" ? "div1" : "div";
                }

            }
        }
    }
</script>

<style scoped>
    .login{
        position: relative;
    }
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
        height: 2rem;
        font-size: .8rem;
        box-sizing: border-box;
        margin-top: .1rem;
        padding-left: .6rem;
        outline: none;
    }
    .slider{
        width: 2rem;
        height: 1rem;
        position: absolute;
        right: .5rem;
        top: 2.6rem;
        margin-right: .5rem;
    }
    .span{
        color: white;
        font-size: .8rem;
        padding: 0 .2rem;
        border-radius: .7rem;
        background-color: #cccccc;
    }
    .span1{
        color: white;
        font-size: .8rem;
        padding: 0 .2rem;
        border-radius: .7rem;
        background-color: blue;
    }
    .div{
        width: 1.5rem;
        height: 1.5rem;
        background-color: #d4d4d4;
        border-radius: 50%;
        position: absolute;
        transition: all .2s linear;
        right: .5rem;
        top: -.1rem;
    }
    .div1{
        width: 1.5rem;
        height: 1.5rem;
        background-color: #d4d4d4;
        border-radius: 50%;
        position: absolute;
        transition: all .2s linear;
        right: -.4rem;
        top: -.1rem;
    }
    #img{
        position: absolute;
        right: 3rem;
        top: 4.4rem;
    }
    .change_img{
        font-size: .6rem;
        position: absolute;
        right: .4rem;
        top: 4.8rem;
    }
    .change_img>p:nth-child(2){
        color: blue;
    }
    .footer>p{
        color:red;
        font-size: .6rem;
        margin: .5rem;
    }
    #login{
        width: 94%;
        display: inline-block;
        height: 2rem;
        color: #ffffff;
        border-radius: .2rem;
        text-align: center;
        line-height: 2rem;
        background-color: #4cae4c;
        margin: 0 .5rem;
        border: none;
    }
    #pass{
        float: right;
        font-size: .8rem;
        margin-top: .7rem;
        color: #5bc0de;
        margin-right: .5rem;
    }
    .mask{
        width: 15rem;
        height: 10rem;
        text-align: center;
        position:absolute;
        top: 8rem;
        left:50%;
        transform: translateX(-50%);
        background-color: white;
        border-radius: .5rem;
        overflow: hidden;
    }
    .mask>i{
        font-size: 5rem;
        color: #f8cb86;
    }
    .mask>p{
        font-size: .8rem;
    }
    .mask>button{
        height: 2rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #4cae4c;
        border: none;
    }
</style>