<template>
    <div class="home">
        <header>
            <span>ele.me</span>
            <span @click="$router.replace('/profile')" v-if="!isBool" class="el-icon-s-custom"></span>
            <router-link v-if="isBool" id="register" to="/login">登录|注册</router-link>
        </header>
        <div class="hot">
            <!--定位城市-->
            <div class="hot_one">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <div class="hot_two">
                <span><router-link :to="{path:'/city',query:{groupCity:guess.id}}" class="city">{{guess.name}}</router-link></span>
                <span class="el-icon-arrow-right"></span>
            </div>
            <!--热门城市-->
            <ul class="hot_hot">
                <p>热门城市</p>
                <li v-for="(city,i) in hot">
                    <router-link :to="{path:'/city',query:{groupCity:city.id}}" class="city">{{city.name}}</router-link>
                </li>
            </ul>
        </div>
        <!--所有城市-->
        <footer>
            <ul v-for="(gro,i) in cityArr">
                <p class="footer_p">
                    <span>{{gro}}</span>
                    <span v-if="gro=='A'">(按字母排序)</span>
                </p>
                <li v-for="c in group[cityArr[i]]">
                    <router-link :to="{path:'/city',query:{groupCity:c.id}}">{{c.name}}</router-link>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    import {apiAddress} from "../request/api";

    export default {
        name: "Home",
        data(){
            return{
                // 定位城市
                guess:[],
                // 热门城市
                hot:[],
                // 所有城市
                group:[],
                // 所有城市字母
                cityArr:[],
                isBool:true,
            }
        },
        created(){
            if (!localStorage.user_id) {
                this.isBool = true;
            } else {
                this.isBool = false;
            }
            // 获取定位城市
            apiAddress({
                type:'guess'
            }).then(data=>{
                // console.log(data);
                this.guess = data;
            })
            // 获取热门城市
            apiAddress({
                type:'hot'
            }).then(data=>{
                this.hot = data;
            });
            // 获取所有城市
            apiAddress({
                type:'group'
            }).then(data=>{
                for (let i in data) {
                    this.cityArr.push(i);
                    this.cityArr.sort();
                }
                this.group = data;
            })
            // 定位城市
            // this.axios.get("https://elm.cangdu.org/v1/cities?type=guess").then(data=>{
            //     this.guess = data.data;
            // });
            // 热门城市
            // this.axios.get("https://elm.cangdu.org/v1/cities?type=hot").then(data=>{
            //     this.hot = data.data;
            // });
            // 所有城市
            // this.axios.get("https://elm.cangdu.org/v1/cities?type=group").then(data=>{
            //     for (let i in data.data) {
            //         this.cityArr.push(i);
            //         this.cityArr.sort();
            //     }
            //     this.group = data.data;
            // });
        },
    }
</script>

<style scoped>
    .home{
        background-color: #f5f5f5;
    }
    ul>li>a{
        width: 100%;
        height: 100%;
        display: inline-block;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
    }
    header{
        height: 2rem;
        font-size: .8rem;
        background-color: blue;
        padding: 0 .5rem;
        color: white;
        line-height: 2rem;
    }
    header>span:nth-child(2){
        float: right;
        margin-top: .6rem;
    }
    #register{
        color: white;
        float: right;
    }
    .hot_one{
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 0 .5rem;
        background-color: white;
    }
    .hot_one>span{
        font-size: .6rem;
        vertical-align: middle;
    }
    .hot_one>span:nth-child(2){
        float: right;
    }
    .hot_two{
        height: 1.0rem;
        background-color: white;
        padding: 0.5rem .5rem;
        border-top: .05px solid #cccccc;
    }
    .hot_two>span:nth-child(1){
        font-size: .8rem;
        color: #3190e8;
        width: 90%;
        height: 100%;
        display: inline-block;
    }
    .hot_two>span:nth-child(1)>a{
        width: 100%;
        display: inline-block;
    }
    .hot_two>span:nth-child(2){
        float: right;
    }
    .hot_hot{
        margin-top: .6rem;
        overflow: hidden;
        background-color: white;
    }
    .hot_hot>p{
        font-size: .6rem;
        padding: .2rem;
    }
    .hot_hot>li{
        float: left;
        width: 25%;
        height: 2rem;
        font-size: .7rem;
        line-height: 2rem;
        border: 1px solid #cccccc;
        box-sizing: border-box;
        text-align: center;
        color: #3190e8;
    }
    footer>ul{
        margin-top: 1rem;
        overflow: hidden;
        background-color: white;
    }
    footer>ul>li{
        float: left;
        width: 25%;
        height: 2rem;
        font-size: .7rem;
        line-height: 2rem;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #cccccc;

        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
        /*box-sizing: border-box;*/
    }
    .footer_p{
        height: 1.5rem;
        padding-left: .5rem;
        line-height: 1.5rem;
    }
    .footer_p>span:nth-child(1){
        font-size: .8rem;
    }
    .footer_p>span:nth-child(2){
        font-size: .6rem;
        color: #444444;
    }
    .city{
        color: blue;
    }
</style>