<template>
    <div class="foot">
        <nav>
            <router-link class="el-icon-arrow-left" :to="{path:'msite',query: {lat:lon}}"></router-link>
            {{title}}
        </nav>
        <div class="main">
            <span @click="topOne">{{title}}<i class="el-icon-caret-bottom"></i></span>
            <span @click="topTwo">排序<i class="el-icon-caret-bottom"></i></span>
            <span @click="topThree">筛选<i class="el-icon-caret-bottom"></i></span>
            <!--遮罩列表 左一 -->
            <div class="leftList" v-if="!isBool">
                <ul class="lefts">
                    <li :class="{'lis':shopid==v.id}" v-for="(v,i) in leftList" @click="sub_categories=v.sub_categories,shopid=v.id">
                        <div>
                            <img v-if="i==0?false:true" :src="'https://fuss10.elemecdn.com/' + v.image_url">
                            <span>{{v.name}}</span>
                            <div>
                                <span>{{v.count}}</span>
                                <i v-if="i==0?false:true" class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="rights">
                    <ul>
                        <li :class="{'lis2':shopsid==v.id}" v-if="i==0?false:true" v-for="(v,i) in sub_categories" @click="getList(v.id)">
                            <span>{{v.name}}</span>
                            <span>{{v.count}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!--遮罩列表：排序 中 -->
            <div v-if="!iBool">
                <ul class="sorts">
                    <li @click="getSort(i),iSort=i" v-for="(v,i) in sort">
                        <p :class="{'ckeck':iSort==i}">{{v}}<i :class="{'el-icon-check':iSort==i}"></i></p>
                    </li>
                </ul>
            </div>
            <!--遮罩列表：筛选  右-->
            <div class="screens" v-if="!Bool">
                <ul>
                    <p>配送方式</p>
                    <li v-for="v in shipMet" @click="deliverys1(v)">
                        <span v-if="arr1.indexOf(v.id)==-1?true:false" :style="{color:'#'+v.color}" class="el-icon-position"></span>
                        <i v-if="arr1.indexOf(v.id)==-1?false:true" :class="{'el-icon-check colors':arr1.indexOf(v.id)!=-1}"></i>
                        <span :class="{'colors':arr1.indexOf(v.id)!=-1}">{{v.text}}</span>
                    </li>
                </ul>
                <ul>
                    <p>商家属性（可以多选）</p>
                    <li v-for="v in attrs" @click="deliverys2(v)">
                        <span v-if="arr2.indexOf(v.id)==-1?true:false" :style="{color:'#'+v.icon_color,border:'1px solid #'+v.icon_color}">{{v.icon_name}}</span>
                        <i v-if="arr2.indexOf(v.id)==-1?false:true" :class="{'el-icon-check colors':arr2.indexOf(v.id)!=-1}"></i>
                        <span :class="{'colors':arr2.indexOf(v.id)!=-1}">{{v.name}}</span>
                    </li>
                </ul>
                <div>
                    <button @click="arr1=[],arr2=[]">取消</button>
                    <button @click="define">确定<span v-if="(arr1.length+arr2.length)==0?false:true">({{arr1.length+arr2.length}})</span></button>
                </div>
            </div>
        </div>
        <div id="mask" v-if="!itBool"></div>
        <ul class="list">
            <!---->
            <li v-for="(pro,i) in data">
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
                        <span v-if="pro.delivery_mode?true:false">{{pro.delivery_mode.text}}</span>
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
</template>

<script>
    import {mapMutations} from "vuex";
    import {shopList,sortListLeft,screenList,attrShopList} from "../request/api";

    export default {
        name: "Foot",
        data(){
            return{
                data:[],
                leftList:[],
                shipMet:[],
                attrs:[],
                c:{},
                sub_categories:[],
                id:"",
                title:"",
                lon:"",
                l:"",
                o:"",
                shopid:"",
                shopsid:"",
                num:0,
                isBool:true,
                iBool:true,
                Bool:true,
                itBool:true,
                iSort:0,
                sort:[
                    "智能排序","距离最近","销量最高","起送价最低","配送速度最快","评分最高"
                ],
                arr1:[],
                arr2:[],
                a:0
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.title = this.$route.query.title;
            this.lo = this.$route.query.lat.split(',');
            this.lon = this.$route.query.lat;
            // console.log(this.lon)
            this.l = this.lon[0];
            this.o = this.lon[1];
            // 列表（主）
            shopList({
                latitude:this.l,
                longitude:this.o
            }).then(data=>{
                this.data = data;
            })
            // this.axios.get("https://elm.cangdu.org/shopping/restaurants",{params:{latitude:this.l,longitude:this.o}}).then(data=>{
            //     console.log(data.data)
                // this.data = data.data;
            // })
            // 列表一
            sortListLeft().then(data=>{
                this.leftList = data;
            })
            // this.axios.get("https://elm.cangdu.org/shopping/v2/restaurant/category").then(data=>{
                // console.log(data.data);
                // this.leftList = data.data;
            // })
            // 筛选配送方式
            screenList().then(data=>{
                this.shipMet = data;
            })
            // this.axios.get("https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes").then(data=>{
            //     console.log(data.data);
            //     this.shipMet = data.data;
            // })
            // 筛选商家属性活动列表
            attrShopList().then(data=>{
                this.attrs = data;
            })
            // this.axios.get("https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes").then(data=>{
            //     console.log(data.data);
            //     this.attrs = data.data;
            // })
        },

        methods:{
            ...mapMutations(["backRoute"]),
            // 排序
            getSort(i){
                shopList({
                    latitude:this.l,
                    longitude:this.o,
                    order_by:i
                }).then(data=>{
                    this.data = data;
                })
                // this.axios.get("https://elm.cangdu.org/shopping/restaurants",{params:{latitude:this.l,longitude:this.o,order_by:i}}).then(data=>{
                //     console.log(data.data);
                //     this.data = data.data;
                // })
                this.iBool = !this.iBool;
                this.itBool = true;
            },
            // 列表  左
            getList(id){
                this.isBool=!this.isBool;
                this.itBool = true;
                this.shopsid=id;
                shopList({
                    latitude:this.l,
                    longitude:this.o,
                    restaurant_category_id:id
                }).then(data=>{
                    this.data = data;
                })
                // this.axios.get("https://elm.cangdu.org/shopping/restaurants",{params:{latitude:this.l,longitude:this.o,restaurant_category_id:id}}).then(data=>{
                //     console.log(data.data);
                    // this.data = data.data;
                // })
            },
            // 配送方式
            deliverys1(v){
                if (this.arr1.indexOf(v.id) == -1) {
                    this.arr1.push(v.id);
                } else {
                    this.arr1.splice(this.arr1.indexOf(v.id),1)
                }
            },
            // 商家属性
            deliverys2(v){
                if (this.arr2.indexOf(v.id) == -1) {
                    this.arr2.push(v.id);
                } else {
                    this.arr2.splice(this.arr2.indexOf(v.id),1)
                }
            },
            // 确定
            define(){
                shopList({
                    latitude:this.l,
                    longitude:this.o,
                    delivery_mode:this.arr1,
                    support_ids:this.arr2
                }).then(data=>{
                    this.data = data;
                })
                // this.axios.get("https://elm.cangdu.org/shopping/restaurants",{params:{latitude:this.l,longitude:this.o,delivery_mode:this.arr1,support_ids:this.arr2}}).then(data=>{
                //     console.log(data.data)
                //     this.data = data.data;
                // });
                this.Bool = true;
                this.itBool = true;
            },
            topOne(){
                this.isBool=!this.isBool;
                this.iBool=true;
                this.Bool=true;
                this.itBool = this.isBool;

            },
            topTwo(){
                this.iBool=!this.iBool;
                this.isBool=true;
                this.Bool=true;
                this.itBool = this.iBool;
            },
            topThree(){
                this.Bool=!this.Bool;
                this.iBool=true;
                this.isBool=true;
                this.itBool = this.Bool;
            }
        },
    }
</script>

<style scoped>
    .ckeck{
        color: #5bc0de;
    }
    #mask{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.2);
        z-index: 1;
    }
    nav{
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        background-color: #3190e8;
        color: #ffffff;
        position: fixed;
        top: 0;
        z-index: 3;
        text-align: center;
        overflow: hidden;
    }
    nav>a{
        color: white;
        margin-left: .3rem;
        margin-top: .3rem;
        font-size: 1.2rem;
        font-weight: 800;
        float: left;
    }
    .main{
        background-color: white;
        position: fixed;
        top: 2rem;
        width: 100%;
        z-index: 5;
    }
    .main>span{
        width: 33%;
        height:2rem;
        font-size: .7rem;
        line-height: 2rem;
        display: inline-block;
        text-align: center;
        border-bottom: 1px solid #eeeeee;
    }
    .main>span:nth-child(2){
        border-left: 1px solid #d4d4d4;
        border-right: 1px solid #d4d4d4;
    }
    .list{
        margin-top: 4rem;
    }
    .lefts{
        width: 50%;
        float: left;
        line-height: 2.1rem;
    }
    .lefts>li{
        height: 2.1rem;
        background-color: #f5f5f5;
    }
    .lefts>li>div>img{
        width: 1.1rem;
        margin-left: .3rem;
        vertical-align: middle;
    }
    .lefts>li>div>span{
        font-size: .6rem;
        margin-left: .5rem;
        vertical-align: middle;
    }
    .lefts>li>div>div{
        float: right;
        margin-right: .5rem;
        font-size: .6rem;
    }
    .lefts .lis{
        background-color: #ffffff;
    }
    .lefts>li>div>div>span{
        color: white;
        background-color: #d4d4d4;
        border-radius: .5rem;
        padding: .1rem .2rem;
        margin-right: .3rem;
    }
    .rights{
        overflow-y: auto; /*根据设置高度添加滚动条*/
        width: 50%;
        height: 18.9rem;
        background-color: white;
        float: left;
    }
    .rights>ul>li{
        height: 2.1rem;
        border-bottom: 1px solid #d4d4d4;
        line-height: 2.1rem;
    }
    .rights>ul .lis2{
        color: #5bc0de;
    }

    .rights>ul>li>span:nth-child(1){
        font-size: .6rem;
        margin-left: .4rem;
    }
    .rights>ul>li>span:nth-child(2){
        font-size: .6rem;
        float: right;
        margin-right: .4rem;
    }

    .list{
        background-color: white;
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

    .sorts>li{
        height: 2.5rem;
        font-size: .8rem;
        padding-left: 1rem;
        line-height: 2.5rem;
    }
    .sorts>li>p{
        border-bottom: 1px solid #d4d4d4;
    }
    .sorts>li>p>i{
        float: right;
        font-size: 1.3rem;
        font-weight: 800;
        margin-top: .6rem;
        margin-right: 1rem;
    }
    .screens>ul{
        overflow: hidden;
    }
    .screens>ul>p{
        font-size: .6rem;
        padding: .5rem;
    }
    .screens>ul>li{
        font-size: .6rem;
        border: 1px solid #d4d4d4;
        width: 4.5rem;
        padding-left: .5rem;
        float: left;
        height: 2rem;
        line-height: 2rem;
        margin: 0 0 .5rem .5rem;
    }
    .screens>ul>li>span:nth-child(1){
        margin-right: .4rem;
        padding: 0 .1rem .05rem .1rem;
        vertical-align: middle;
    }
    .colors{
        color: #5bc0de;
    }
    .screens>ul>li>span:nth-child(3){
        vertical-align: middle;
    }
    .screens>ul>li>i{
        font-size: 1rem;
        font-weight: 900;
        vertical-align: middle;
        margin-right: .32rem;
    }
    .screens>div{
        background-color: #f1f1f1;
    }
    .screens>div>button{
        height: 2rem;
        width: 40%;
        margin: .5rem 5%;
        border: none;
        border-radius: .2rem;
    }
    .screens>div>button:nth-child(1){
        background-color: white;
    }
    .screens>div>button:nth-child(2){
        background-color: #56d176;
        color: white;
    }
</style>