<template>
    <div class="shop">
        <nav>
            <router-link class="el-icon-arrow-left" :to="{path: '/msite',query:{lat:lon}}"></router-link>
        </nav>
        <header>
            <img :src="'https://elm.cangdu.org/img/'+shopData.image_path" alt="">
            <router-link :to="{path:'/shopDetail',query:{id:id}}" class="headers">
                <img :src="'https://elm.cangdu.org/img/'+shopData.image_path" alt="">
                <div>
                    <h3>{{shopData.name}}</h3>
                    <p>商家配送/分钟必达/配送费约￥{{shopData.float_delivery_fee}}<i class="el-icon-arrow-right"></i></p>
                    <p>公告：{{shopData.promotion_info}}</p>

                </div>
            </router-link>
            <div v-if="iBool" class="activity" @click="isBool=false">
                <span v-if="activity[0].icon_name==undefined?false:true">{{activity[0].icon_name}}</span>
                <span>{{activity[0].description}}<span>(APP专享)</span></span>
                <span>{{shopData.activities.length}}个活动<i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="mask" v-if="!isBool">
                <h3>{{shopData.name}}</h3>
                <p>优惠信息</p>
                <div>
                    <p v-for="v in activity">
                        <span v-if="v.icon_name==undefined?false:true">{{v.icon_name}}</span>
                        <span>{{v.name}}</span>
                        <span>(APP专享)</span>
                    </p>
                </div>
                <p>商家公告</p>
                <p>{{shopData.promotion_info}}</p>
                <i class="el-icon-circle-close" @click="isBool=true"></i>
            </div>
        </header>
        <div class="main">
            <router-link :to="{path:'/shop/shopList',query:{lat:lon,id:id}}" @click="icons='商品'"><span :class="icons=='商品'?'shopping':''" >商品</span></router-link>
            <router-link :to="{path:'/shop/evaluate',query:{lat:lon,id:id}}" @click="icons='评价'"><span :class="icons=='评价'?'shopping':''">评价</span></router-link>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import {shopMsg} from "../request/api";

    export default {
        name: "Shop",
        data(){
            return{
                id:"",
                shopData:{},
                footData:{},
                activity:[],
                isBool:true,
                iBool:true,
                activites:[],
                lon:"",
                icons:"商品"
            }
        },
        methods:{
            ...mapMutations(["backRoute","msite"])
        },
        created(){
            this.id = this.$route.query.id;
            // 店铺详情
            shopMsg(this.id).then(data=>{
                this.shopData = data;
                this.activity = data.activities.slice(0,1);
                if (this.activity.length == 0) {
                    this.iBool = false
                }
                this.activites = data.activities
            })
            // this.axios.get("https://elm.cangdu.org/shopping/restaurant/" + this.id).then(data=>{
            //     this.shopData = data.data;
            //     this.activity = data.data.activities.slice(0,1);
            //     if (this.activity.length == 0) {
            //         this.iBool = false
            //     }
            //     this.activites = data.data.activities
            // });
            // this.axios.get("https://elm.cangdu.org/shopping/v2/menu",{params:{restaurant_id:this.id}}).then(data=>{
            //     this.footData = data.data;
            // })
            this.lon = this.$route.query.lat
            console.log(this.$route.query.lat)
        },
    }
</script>

<style scoped>
    .shopping{
        color: #5bc0de;
    }
    nav{
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        background-color: rgba(0,0,0,0);
        color: #ffffff;
        position: fixed;
        top: 0;
        z-index: 3;
        overflow: hidden;
    }
    nav>a{
        color: white;
        width: 100%;
        height: 100%;
        margin-left: .3rem;
        font-size: 1.5rem;
        font-weight: 800;
    }
    header{
        width: 100%;
        position: relative;
    }
    header>img{
        width: 100%;
        -webkit-filter: blur(10px);
        filter: blur(10px);
    }
    .headers,.activity{
        position: absolute;
    }
    .headers{
        left: 0;
        top: 0;
        float: left;
        width: 100%;

    }
    .headers>img,.headers>div{
        float: left;
    }
    .headers>div{
        width: 79%;
        height: 4rem;
    }
    .headers>div>p>i{
        float: right;
        color: white;
        font-size: 1rem;
        margin-bottom: 2rem;
    }
    .headers>div>h3{
        font-size: .8rem;
        color: white;
        font-weight: 700;
        margin-bottom: .5rem;
        margin-top: .5rem;
    }
    .headers>div>p{
        font-size: .5rem;
        color: white;
        margin-bottom: .5rem;
    }
    .headers>img{
        width: 3.3rem;
        margin: .4rem 0 0 .4rem;
    }
    .activity{
        left: 0;
        top: 5rem;
        font-size: .6rem;
        color: white;
        width: 100%;
    }
    .activity>span:nth-child(1){
        background-color: rgb(237, 193, 35);
        border-color: rgb(237, 193, 35);
    }
    .activity>span:nth-child(2)>span{
        margin-left: .3rem;
    }
    .activity>span:nth-child(3){
        float: right;
    }
    .mask{
        background-color: #333333;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        color: white;
        text-align: center;
    }
    .mask>h3{
        margin-top: 2rem;
        font-size: .9rem;
    }
    .mask>p:nth-child(2),.mask>p:nth-child(4){
        margin-top: 2.5rem;
        border: .5px solid #cccccc;
        width: 4rem;
        margin: 2.5rem auto 0;
        font-size: .6rem;
        padding: .3rem 0 .2rem;
        border-radius: .5rem;
    }
    .mask>div{
        margin-top: 1rem;
        text-align: left;
        padding-left: 2rem;
        font-size: .6rem;
    }
    .mask>div>p>span:nth-child(1){
        background-color: rgb(237, 193, 35);
    }
    .mask>div>p>span:nth-child(2){
        margin: 0 .2rem;
    }
    .mask>p:nth-child(5){
        margin-top: 1rem;
        font-size: .6rem;
        text-align: left;
        padding-left: 2rem;
    }
    .mask>i{
        margin-top: 15rem;
        font-size: 2.5rem;
    }
    .main{
        width: 100%;
        position: absolute;
        top: 7rem;
        background-color: white;
        height: 25rem;
    }
    .main>a{
        display: inline-block;
        width: 50%;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
        font-size: .8rem;
    }

</style>