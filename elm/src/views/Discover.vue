<template>
    <!--
        搜索商家
    -->
    <div class="discover">
        <header>
            <i class="el-icon-arrow-left" @click="backRoute"></i>
            <span>搜索</span>
            <router-link to="/msite" class="el-icon-s-custom"></router-link>
        </header>
        <div class="main">
            <div class="packages"></div>
            <input v-model="keyWord" @input="iBool=false" class="text" type="text" placeholder="请输入商家或美食名称">
            <i @click="keyWords" class="el-icon-close ico" v-if="!iBool"></i>
            <input @click="sub" class="btn" type="button" value="提交">
        </div>


        <!--搜索历史-->
        <ul class="lists" v-if="isBool">
            <p style="height: 2rem;line-height: 2rem;font-size: .8rem;padding-left: .4rem;background-color: #eeeeee ;text-align: left">搜索历史</p>
            <li v-for="(shop,i) in shopOld">
                <p>{{shop}}</p>
                <i @click="del(i)" class="el-icon-close icons"></i>
            </li>
            <p @click="emptys">清空搜索历史</p>
            <div class="seat"></div>
        </ul>


        <!--搜索信息-->
        <ul class="shop" v-if="!isBool">
            <p style="height: 2rem;line-height: 2rem;font-size: .8rem;padding-left: .4rem;background-color: #eeeeee ;text-align: left">商家</p>
            <li v-for="shop in data">
                <img :src="'https://elm.cangdu.org/img/'+shop.image_path" alt="">
                <div>
                    <p>{{shop.name}}<span style="color: red">支付</span></p>
                    <p>月售{{shop.recent_order_num}}单</p>
                    <p>{{shop.float_minimum_order_amount}}元起送/距离{{shop.distance}}</p>
                </div>
            </li>
            <div class="seat"></div>
        </ul>
        <footer>
            <router-link :to="{path:'/msite',query:{lat:lon}}">
                <i class="el-icon-eleme"></i>
                <p>外卖</p>
            </router-link>
            <router-link :to="{path:'/discover',query:{lat:lon}}">
                <i class="el-icon-discover colcors"></i>
                <p  class="colcors">搜索</p>
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
    import {searchShop} from "../request/api";

    export default {
        name: "Discover",
        data(){
            return{
                lon:"",
                l:"",
                o:"",
                keyWord:"",
                shopOld:[],
                shopNew:[],
                data:[],
                isBool:true,
                iBool:true
            }
        },

        methods:{
            ...mapMutations(["backRoute","xx"]),
            sub(){
                if (this.keyWord == "") {
                    return;
                }
                searchShop({
                    geohash:this.lon,
                    keyword:this.keyWord
                }).then(data=>{
                    this.data = data;
                })
                // this.axios.get("https://elm.cangdu.org/v4/restaurants",{params:{geohash:this.lon,keyword:this.keyWord}}).then(data=>{
                //     console.log(data.data);
                //     this.data = data.data;
                // });
                this.shopNew = this.shopOld;
                if (this.shopNew.indexOf(this.keyWord) == -1) {
                    this.shopNew.push(this.keyWord);
                }
                localStorage.searchHistory = JSON.stringify(this.shopNew);
                this.isBool = false;
            },
            keyWords(){
                this.keyWord = "";
                this.isBool = true;
                this.iBool = true;
            },
            emptys(){
                localStorage.searchHistory = ""
                this.shopOld = []
            },
            del(i){
                if (this.shopOld.length != 0) {
                    this.shopOld.splice(i,1);
                }
            }
        },
        created(){
            this.lon = this.$route.query.lat;
            let lo = this.$route.query.lat.split(",")
            this.l = lo[0];
            this.o = lo[1];
            this.shopOld = JSON.parse(localStorage.searchHistory);
        },
    }
</script>

<style scoped>
    .packages{
        padding-top: 2rem;
    }
    .seat{
        padding-bottom: 2rem;
        background-color: #eeeeee;
    }
    .main{
        background-color: white;
        padding-bottom: .8rem;
        position: relative;
    }
    .ico{
        position: absolute;
        top: 2.8rem;
        right: 6.2rem;
        font-weight: 900;
        color: #5bc0de;
    }
    .lists>li{
        position: relative;
    }
    .lists>li>p{
        height: 2rem;
        line-height: 2rem;
        font-size: .8rem;
        padding-left: .5rem;
        border-bottom: 1px solid #eeeeee;
    }
    .icons{
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        font-weight: 900;
    }
    .shop>li{
        overflow: hidden;
        background-color: white;
    }
    .shop>li>img{
        width: 2rem;
        float: left;
        margin: .3rem .3rem 0 .5rem;
    }
    .shop>li>div{
        float: left;
        width: 80%;
        border-bottom: 1px solid #d4d4d4;
        margin-bottom: .8rem;
    }
    .shop>li>div>p:nth-child(1){
        font-size: .6rem;
        margin-top: .5rem;
    }
    .shop>li>div>p:nth-child(2){
        font-size: .7rem;
        margin: .4rem;
    }
    .shop>li>div>p:nth-child(3){
        font-size: .7rem;
        margin-bottom: .6rem;
    }
    .text{
        width: 12rem;
        height: 1.5rem;
        background-color: #f5f5f5;
        padding: 0 .2rem;
        margin: .5rem .5rem 0 .5rem;
        font-size: .8rem;
        border: 1px solid #d4d4d4;
    }
    .btn{
        width: 3.5rem;
        height: 1.6rem;
        background-color: #3190e8;
        /*margin-left: -1rem;*/
        padding: 0 .2rem;
        border-radius: .2rem;
        color: white;
        font-size: .9rem;
    }
    .lists{
        background-color: white;
    }
    .lists>p{
        text-align: center;
        height: 2rem;
        line-height: 2rem;
        font-size: 1rem;
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