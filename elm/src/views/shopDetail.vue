<template>
    <div class="shopDetail">
        <nav>
            <i class="el-icon-arrow-left" @click="backRoute"></i>
            <span>商家详情</span>
        </nav>
        <div class="main">
            <div class="main_act">
                <p>活动与属性</p>
                <ul>
                    <li v-for="pro in shopData.activities">
                        <span>{{pro.icon_name}}</span>
                        <span>{{pro.description}}</span>
                    </li>
                </ul>
                <ul>
                    <li v-for="pro in shopData.supports">
                        <span>{{pro.icon_name}}</span>
                        <span>{{pro.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="main_safe">
                <p>食品监督安全公示<span>企业认证详情<i class="el-icon-arrow-right"></i></span></p>
                <div>
                    <div></div>
                    <div>
                        <p>监督检查结果：良好</p>
                        <p>检查日期</p>
                    </div>
                </div>
            </div>
            <div class="main_mag">
                <h4>商家信息</h4>
                <p>{{shopData.name}}</p>
                <p>地址：{{shopData.address}}</p>
                <!--<p>营业时间：[{{shopData.opening_hours[0]}}]</p>-->
                <p>营业执照<i class="el-icon-arrow-right"></i></p>
                <p>餐饮服务许可证<i class="el-icon-arrow-right"></i></p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex"
    import {shopMsg} from "../request/api";

    export default {
        name: "shopDetail",
        data(){
            return{
                id:"",
                shopData:[]
            }
        },
        methods:{
            ...mapMutations(["backRoute"])
        },
        created(){
            console.log(this.$route.query.id)
            this.id = this.$route.query.id
            shopMsg(this.id).then(data=>{
                this.shopData = data;
            })
            // this.axios.get("https://elm.cangdu.org/shopping/restaurant/" + this.id).then(data=>{
            //     console.log(data.data)
            //     this.shopData = data.data;
            // })
        }
    }
</script>

<style scoped>
    nav{
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        background-color: #5bc0de;
        color: #ffffff;
        position: fixed;
        top: 0;
        z-index: 3;
        overflow: hidden;
    }
    nav>i{
        color: white;
        height: 100%;
        margin-left: .3rem;
        font-size: 1.5rem;
        font-weight: 800;
    }
    nav>span{
        margin-left: 5.5rem;
    }
    .main{
        padding-top: 2.5rem;
    }
    .main>div{
        background-color: white;
    }
    .main>div>p{
        font-size: .9rem;
        margin: 0 0 .6rem .4rem;
        padding-top: .4rem;
    }
    .main>div>ul>li{
        font-size: .65rem;
        padding: .5rem 0 .5rem .2rem;
        line-height: 1.1rem;
    }
    .main>div>ul>li>span:nth-child(1){
        background-color: #5bc0de;
        color: white;
        padding: 0 .1rem;
        margin-right: .5rem;
        border-radius: .1rem;
    }
    .main_safe{
        margin-top: .6rem;
    }
    .main_safe>p>span{
        float: right;
        color: #999999;
        margin-right: 1rem;
    }
    .main_safe>div{
        overflow: hidden;
        padding: 1rem 0;
    }
    .main_safe>div>div:nth-child(1){
        float: left;
        width: 3rem;
        height: 3rem;
        background-color: rgb(126, 211, 33);
        border-radius: 50%;
    }
    .main_safe>div>div:nth-child(2){
        float: left;
        margin-top: .8rem;
        margin-left: .6rem;
        font-size: .8rem;
    }
    .main_safe>div>div:nth-child(2)>p:nth-child(2){
        margin-top: .5rem;
    }
    .main_mag{
        margin-top: .6rem;
    }
    .main_mag>h4{
        padding: 1rem 0 1rem .4rem;
        border-bottom: 1px solid #f1f1f1;
    }
    .main>.main_mag>p{
        font-size: .8rem;
        color: #999999;
        padding: .5rem 0;
        border-bottom: 1px solid #f5f5f5;
    }
    .main>.main_mag>p>i{
        float: right;
        margin-right: 1rem;
    }
</style>