<template>
    <!--
        我的
    -->
    <div class="profile">
        <header>
            <i class="el-icon-arrow-left" @click="backRoute"></i>
            <span>我的</span>
            <!--<router-link to="/msite" class="el-icon-s-custom"></router-link>-->
        </header>
        <div class="main">
            <div class=""></div>
            <div class="main_user">
                <router-link to="/profile/info">
                    <li>
                        <img :src="'https://elm.cangdu.org/img/' + data.avatar" alt="">
                    </li>
                    <div>
                        <p>{{data.username}}</p>
                        <p class="el-icon-mobile-phone">暂无绑定手机号</p>
                    </div>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
            </div>
            <ul class="main_main">
                <li>
                    <p><strong>0.00</strong>元</p>
                    <p>我的余额</p>
                </li>
                <li>
                    <p><strong>3</strong>个</p>
                    <p>我的优惠</p>
                </li>
                <li>
                    <p><strong>0</strong>分</p>
                    <p>我的积分</p>
                </li>
            </ul>
            <div class="main_list">
                <router-link to="">
                    <i class="el-icon-tickets"></i>
                    <span>我的订单</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
                <router-link to="">
                    <i class="el-icon-s-goods"></i>
                    <span>积分商城</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
                <router-link to="">
                    <i class="el-icon-coin"></i>
                    <span>饿了么会员卡</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
                <router-link to="">
                    <i></i>
                    <span>服务中心</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
                <router-link to="">
                    <i class="el-icon-platform-eleme"></i>
                    <span>下载饿了么APP</span>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
                <div></div>
            </div>
        </div>
        <footer>
            <router-link :to="{path:'/msite',query:{lat:lon}}">
                <i class="el-icon-eleme"></i>
                <p>外卖</p>
            </router-link>
            <router-link :to="{path:'/discover',query:{lat:lon}}">
                <i class="el-icon-discover"></i>
                <p>搜索</p>
            </router-link>
            <router-link :to="{path:'/captchas',query:{lat:lon}}">
                <i class="el-icon-document"></i>
                <p>订单</p>
            </router-link>
            <router-link :to="{path:'/profile',query:{lat:lon}}">
                <i class="el-icon-s-custom colcors"></i>
                <p  class="colcors">我的</p>
            </router-link>
        </footer>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import {userMsg} from "../request/api";

    export default {
        name: "Peofile",
        data(){
            return{
                lon:"",
                data:{}
            }
        },
        methods:{
            ...mapMutations(["backRoute"])
        },
        created(){
            this.lon = this.$route.query.lat;
            userMsg().then(data=>{
                this.data = data;
            })
            // this.axios.get("https://elm.cangdu.org/v1/user").then(data=>{
            //     console.log(data.data);
            //     this.data = data.data;
            //     console.log(this.data)
            // });
        }
    }
</script>

<style scoped>
    .main{
        padding-top: 2rem;
    }
    .main_user{
        height: 4.2rem;
        color: #333333;
        background-color: #3190e8;
    }
    .main_user>a{
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .main_user>a>li{
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-top: .6rem;
        margin-left: .5rem;
    }
    .main_user>a>li>img{
        width: 3rem;
    }
    .main_user>a>div{
        float: left;
        color: white;
        font-size: .95rem;
        margin-left: .6rem;
    }
    .main_user>a>div>p:nth-child(1){
        margin-top: .8rem;
        margin-bottom: .3rem;
    }
    .main_user>a>div>p:nth-child(2){
        font-size: .7rem;
    }
    .main_user>a>i{
        height: 100%;
        line-height: 4.2rem;
        float: right;
        margin-right: 1rem;
        color: white;
    }
    .main_main{
        background-color: white;
        overflow: hidden;
    }
    .main_main>li{
        float: left;
        width: 33%;
        height: 4rem;
        text-align: center;
    }
    .main_main>li:nth-child(1)>p:nth-child(1){
        font-size: .8rem;
        margin: 1rem 0 .5rem;
    }
    .main_main>li:nth-child(1)>p:nth-child(1)>strong{
        color: #ff9900;
        font-size: 1.4rem;
        font-weight: 900;
    }
    .main_main>li:nth-child(1)>p:nth-child(2){
        font-size: .7rem;
        color: #666666;
    }
    .main_main>li:nth-child(2){
        border-right: 1px solid #d4d4d4;
        border-left: 1px solid #d4d4d4;
    }
    .main_main>li:nth-child(2)>p:nth-child(1){
        font-size: .8rem;
        margin: 1rem 0 .5rem;
    }
    .main_main>li:nth-child(2)>p:nth-child(1)>strong{
        color: #ff9900;
        font-size: 1.4rem;
        font-weight: 900;
    }
    .main_main>li:nth-child(2)>p:nth-child(2){
        font-size: .7rem;
        color: #666666;
    }
    .main_main>li:nth-child(3)>p:nth-child(1){
        font-size: .8rem;
        margin: 1rem 0 .5rem;
    }
    .main_main>li:nth-child(3)>p:nth-child(1)>strong{
        color: #6ac20b;
        font-size: 1.4rem;
        font-weight: 900;
    }
    .main_main>li:nth-child(3)>p:nth-child(2){
        font-size: .7rem;
        color: #666666;
    }
    .main_list>a{
        display: block;
        width: 100%;
        height: 2rem;
        color: #333333;
        font-size: .7rem;
        background-color: white;
        line-height: 2rem;
        border-top: 1px solid #d4d4d4;
    }
    .main_list>a:nth-child(1),.main_list>a:nth-child(4){
        margin-top: .6rem;
    }
    .main_list>a:nth-child(4)>i:nth-child(1){
        width: .7rem;
        height: .7rem;
        background-color: #5bc0de;
        display: inline-block;
        border-right: .1rem;
    }
    .main_list>a:nth-child(2)>i:nth-child(1){
        color: rgb(252, 123, 83);
    }
    .main_list>a:nth-child(3)>i:nth-child(1){
        color: rgb(255, 198, 54);
    }
    .main_list>a:nth-child(5)>i:nth-child(1){
        color: rgb(60, 171, 255);
    }

    .main_list>a>i:nth-child(1){
        margin-left: 1rem;
        margin-right: .2rem;
    }
    .main_list>a>i:nth-child(3){
        float: right;
        margin-right: .3rem;
        line-height: 2rem;
    }

    .colcors{
        color: #5bc0de;
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
    footer{
        height: 2rem;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
        border-top: 1px solid #d4d4d4;
    }
    footer>a{
        width: 25%;
        float: left;
        text-align: center;
        font-size: .8rem;
        margin-top: .2rem;
    }
</style>