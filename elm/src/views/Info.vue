<template>
    <div class="info">
        <header>
            <i class="el-icon-arrow-left" @click="backRoute"></i>
            <span>账户信息</span>
        </header>
        <div class="main_info">
            <div class="main_info_img">
                <input class="inp" type="file">
                <span>头像</span>
                <i class="el-icon-arrow-right"></i>
                <img :src="'https://elm.cangdu.org/img/' + data.avatar">
            </div>
            <div class="main_info_username">
                <span>用户名</span>
                <i class="el-icon-arrow-right"></i>
                <span>{{data.username}}</span>
            </div>
            <div class="main_info_address">
                <span>收货地址</span>
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <p id="binds">账号绑定</p>
        <div class="phone_bind">
            <i class="el-icon-mobile-phone"></i>
            <span>手机</span>
            <i class="el-icon-arrow-right"></i>
        </div>
        <p id="safe">账号绑定</p>
        <div class="update_pass">
            <span>登陆密码</span>
            <i class="el-icon-arrow-right"></i>
            <span>修改</span>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import {userMsg} from "../request/api";

    export default {
        name: "Info",
        data(){
            return{
                data:{}
            }
        },
        created(){
            userMsg().then(data=>{
                this.data = data;
            })
            // this.axios.get("https://elm.cangdu.org/v1/user").then(data=>{
            //     console.log(data.data);
            //     this.data = data.data;
            // });
        },
        methods:{
            ...mapMutations(["backRoute"]),
        }
    }
</script>

<style scoped>
    .info{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: #f2f2f2;
        z-index: 3;
    }
    .main_info{
        margin-top: 2.5rem;
        background-color: white;
    }
    .main_info_img{
        overflow: hidden;
        height: 3rem;
        border: 1px solid #d4d4d4;
        border-left: none;
        border-right: none;
    }
    .inp{
        display: block;
        position: absolute;
        opacity: 0;
        top: 2.35rem;
        left: 0;
        width: 100%;
        height: 3.1rem;
    }
    .main_info_img>span{
        font-size: .8rem;
        line-height: 3rem;
        margin-left: .5rem;
    }
    .main_info_img>img{
        width: 2.3rem;
        margin-top: .3rem;
        float: right;
        margin-right: .2rem;
    }
    .main_info_img>i{
        line-height: 3rem;
        float: right;
        margin-right: .5rem;

    }
    .main_info_username,.main_info_address{
        font-size: .8rem;
        height: 2.3rem;
        line-height: 2.3rem;
        border: 1px solid #d4d4d4;
        border-left: none;
        border-right: none;
    }
    .main_info_username>span:nth-child(1),.main_info_address>span{
        margin-left: .5rem;
    }
    .main_info_username>span:nth-child(3){
        float: right;
        color: #999999;
        margin-right: .2rem;
    }
    .main_info_username>i,.main_info_address>i{
        float: right;
        line-height: 2.3rem;
        margin-right: .5rem;
        color: #999999;
    }
    #binds,#safe{
        font-size: .6rem;
        padding: .5rem;
    }
    .phone_bind,.update_pass{
        background-color: white;
        height: 2.3rem;
        line-height: 2.3rem;
        font-size: .8rem;
    }
    .phone_bind>i:nth-child(1){
        background-color: #5bc0de;
        color: #ffffff;
        padding: .1rem;
        margin: 0 .5rem;
    }
    .phone_bind>i:nth-child(3){
        float: right;
        line-height: 2.3rem;
        margin-right: .5rem;
    }
    .update_pass>span:nth-child(3),.update_pass>i{
        float: right;
        line-height: 2.3rem;
    }

    header{
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        text-align: center;
        background-color: blue;
        color: #ffffff;
        position: fixed;
        top: 0;
        z-index: 3;
        overflow: hidden;
    }
    header>i:nth-child(1){
        float: left;
        margin-top: .5rem;
    }
    header>a{
        float: right;
        margin: .5rem .5rem 0 0;
        color: white;
    }
    header>span{
        display: inline-block;
        width: 10rem;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
    }
</style>