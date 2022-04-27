<template>
    <!--
        首页
    -->
    <div class="msite">
        <header>
            <i class="el-icon-search" @click="xx"></i>
            <span @click="$router.push('/home')">{{city}}</span>
            <router-link to="/msite" class="el-icon-s-custom"></router-link>
        </header>
        <div class="main">
            <div class="chart">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div  v-for="(v,i) in data.slice(0,8)">
                                <router-link :to="{path:'/foot',query:{lat:lon,title:v.title,id:v.id}}">
                                    <img :src="'https://fuss10.elemecdn.com' + v.image_url">
                                    <p>{{v.title}}</p>
                                </router-link>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div v-for="(v,i) in data.slice(8)">
                                <router-link :to="{path:'/foot',query:{lat:lon,title:v.title,id:v.id}}">
                                    <img :src="'https://fuss10.elemecdn.com' + v.image_url">
                                    <p>{{v.title}}</p>
                                </router-link>

                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div id="wuyong"></div>
            <ul class="list">
                <!---->
                <li v-for="(pro,i) in shops">
                    <router-link :to="{path:'/shop',query:{lat:lon,id:pro.id}}">
                        <img :src="'https://elm.cangdu.org/img/' + pro.image_path" alt="">
                        <div class="list_one">
                            <span>品牌</span>
                            <span>{{pro.name}}</span>
                            <div id="div">
                                <span v-for="v in pro.supports">{{v.icon_name}}</span>
                            </div>
                        </div>
                        <div class="list_two">
                            <div class="stars">
                                <el-rate
                                        v-model="pro.rating"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                            </div>
                            <span>月售{{pro.recent_order_num}}单</span>
                            <span>准时达</span>
                            <span>{{pro.delivery_mode.text}}</span>
                        </div>
                        <div class="list_three">
                            <span>￥{{pro.float_minimum_order_amount}}起送/{{pro.piecewise_agent_fee.tips}}</span>
                            <span>{{pro.order_lead_time}}</span>
                            <span>{{pro.distance}}/</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <footer>
            <router-link :to="{path:'/msite',query:{lat:lon}}">
                <i class="el-icon-eleme colcors"></i>
                <p  class="colcors">外卖</p>
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
                <i class="el-icon-s-custom"></i>
                <p>我的</p>
            </router-link>
        </footer>
    </div>
</template>

<script>
    import {mapMutations} from "vuex"
    import $ from "jquery";
    import Swiper from "swiper";
    import {chartList,shopList} from "../request/api";

    export default {
        name: "Msite",
        data(){
            return{
                city:'',
                data:[],
                shops:[],
                value:"4.7",
                l:"",
                o:"",
                lon:""
            }
        },
        created(){
            this.city = localStorage.cityChange;
            chartList().then(data=>{
                this.data = data;
            })
            // this.axios.get("https://elm.cangdu.org/v2/index_entry").then(data=>{
            //     this.data = data.data
            //     console.log(this.data)
            // });
            console.log(this.$route.query.lat)
            let lo = this.$route.query.lat.split(",");
            this.lon = this.$route.query.lat;
            console.log(lo)
            this.l = lo[0];
            this.o = lo[1];
            shopList({
                latitude:this.l,
                longitude:this.o
            }).then(data=>{
                this.shops = data;
            })
            // this.axios.get("https://elm.cangdu.org/shopping/restaurants",{params:{latitude:this.l,longitude:this.o}}).then(data=>{
            //     console.log(data.data)
            //     this.shops = data.data;
            // })
        },
        mounted () {
            this.initSwiper();
        },
        methods: {
            ...mapMutations(["xx"]),
            initSwiper () {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                });
            }
        },

    }
</script>

<style scoped>
    @import "../.././node_modules/swiper/dist/css/swiper.min.css";
    .colcors{
        color: #5bc0de;
    }
    .chart{
        width: 100%;
        height: 9rem;
    }
    .swiper-container {
        width: 100%;
        height: 100%;
        color: #000000;
    }

    .swiper-container::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
        display: none;
    }
    .swiper-slide div{
        width: 25%;
        text-align: center;
        float: left;
    }
    .swiper-slide div p{
        width: 100%;
        font-size: .8rem;
        margin-top: .5rem;
    }
    .swiper-slide div img{
        width: 2.5rem;
    }
    #wuyong{
        height: .8rem;
        background-color: #d4d4d4;
    }
    .main{
        margin: 2rem 0;
        background-color: white;
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
    .list>li{
        overflow: hidden;
        padding: .8rem 0;
    }
    .list>li>a>img{
        width: 3rem;
        float: left;
        margin-left: .4rem;
    }
    .list>li>a>div{
        float: left;
    }
    .list_one,.list_two,.list_three{
        width: 80%;
    }
    .list_two{
        margin: .3rem 0 .6rem;
    }
    .list_one>span:nth-child(1){
        font-size: .7rem;
        line-height: .6rem;
        color: #333333;
        background-color: #ffd930;
        padding: 0 .1rem;
        margin: 0 .5rem;
    }
    .list_one>span:nth-child(2){
        color: #333333;
        font-size: .9rem;
        padding-top: .01rem;
        font-weight: 700;
        width: 8rem;
        display: inline-block;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
    }
    #div{
        float: right;
    }
    #div>span{
        font-size: .5rem;
        color: #999999;
        border: .025rem solid #f1f1f1;
        padding: 0 .04rem;
        border-radius: .08rem;
        margin-left: .05rem;
    }
    .stars{
        /*width: 5rem;*/
        display: inline-block;
        margin-right: .5rem;
    }
    .list_two>span:nth-child(2){
        transform: scale(.8);
        margin-left: -.2rem;
        font-size: .4rem;
        color: #666;
    }
    .list_two>span:nth-child(3){
        color: #3190e8;
        border: .025rem solid #3190e8;
        font-size: .4rem;
        float: right;
        margin-top: .3rem;
        margin-left: .3rem;
    }
    .list_two>span:nth-child(4){
        color: #fff;
        background-color: #3190e8;
        border: .025rem solid #3190e8;
        font-size: .4rem;
        float: right;
        margin-top: .3rem;
    }
    .list_three>span:nth-child(1){
        transform: scale(.9);
        font-size: .6rem;
        color: #666;
        float: left;
    }
    .list_three>span:nth-child(3){
        color: #999999;
        font-size: .4rem;
        float: right;
    }
    .list_three>span:nth-child(2){
        color: #3190e8;
        font-size: .4rem;
        float: right;
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