<template>
    <div class="city">
        <i class="el-icon-close" v-if="!iBool" @click="qufan"></i>
        <div class="header">
            <router-link to="home" class="el-icon-arrow-left"></router-link>
            <span @click="$router.replace('/home')">{{groupCity}}</span>
            <router-link to="home">切换城市</router-link>
        </div>
        <div class="main">
            <input @focus="inp" v-model="updateCity" type="text" placeholder="输入学校、商务楼、地址">
            <input @click="clickSub" type="button" value="提交">
        </div>
        <div class="footer" v-if="isBool">
            <p>搜索历史</p>
            <ul  class="list_city">
                <li @click="toMsite(v)" v-for="v in cityArrOld">
                    <p>{{v.name}}</p>
                    <p>{{v.address}}</p>
                </li>
            </ul>
            <button @click="clears">清空所有</button>
        </div>
        <ul v-if="!isBool" class="list_city">
            <li @click="toMsite(c)" v-for="c in listCity">
                <p>{{c.name}}</p>
                <p>{{c.address}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {updateCity,groupCitys} from "../request/api";

    export default {
        name: "City",
        data(){
            return{
                // 城市名称
                groupCity:"",
                // 修改城市名称
                updateCity:"",
                // 请求修改城市列表
                listCity:[],
                isBool:true,
                iBool:true,
                // 历史纪录新
                cityArrNew:[],
                // 历史纪录旧
                cityArrOld:[]
            }
        },
        methods:{
            // 修改城市按钮
            clickSub(){
                if (this.updateCity == "") {
                    return;
                }
                updateCity({
                    city_id:this.groupCity,
                    keyword:this.updateCity
                }).then(data=>{
                    this.listCity = data;
                })
                // this.axios.get("https://elm.cangdu.org/v1/pois/",{params:{city_id:this.groupCity,keyword:this.updateCity}}).then(data=>{
                //     console.log(data)this.$route.query.groupCity
                //     this.listCity = data.data;
                // })
                this.isBool = !this.isBool;
            },
            // 叉号
            qufan(){
                this.iBool = !this.iBool;
                this.isBool = !this.isBool;
                this.updateCity = "";
            },
            // 输入框聚焦事件
            inp(){
                this.iBool = !this.iBool;
            },
            // 把搜索历史做持久化存储，并切换路由
            toMsite(c){
                this.cityArrNew = this.cityArrOld;
                if (this.cityArrNew.indexOf(c) == -1) {
                    this.cityArrNew.push(c);
                }
                localStorage.cityArr = JSON.stringify(this.cityArrNew);
                localStorage.cityChange = c.address
                this.$router.push({path:"/msite",query:{lat:c.geohash}}).catch(()=>{});
            },
            clears(){
                localStorage.cityArr = '';
                this.cityArrNew = [];
                this.cityArrOld = [];
            }
        },
        created(){
            // 请求参数错误
            groupCitys(
                this.$route.query.groupCity
            ).then(data=>{
                console.log(data)
                this.groupCity = data.name
            })
            console.log(this.$route.query.groupCity)
            // let url = "https://elm.cangdu.org/v1/cities/" + this.$route.query.groupCity;
            // this.axios.get(url).then(data=>{
            //     this.groupCity = data.data.name
            // });
            if (localStorage.cityArr) {
                this.cityArrOld = JSON.parse(localStorage.cityArr);
            }
        }
    }
</script>

<style scoped>
    i{
        position: absolute;
        right: 1.7rem;
        top: 3.2rem;
    }
    .header{
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        background-color: blue;
        color: #ffffff;
    }
    .header>a:nth-child(1){
        float: left;
        color: #ffffff;
        font-size: 1.3rem;
        margin-top: .3rem;
    }
    .header>a:nth-child(3){
        float: right;
        color: #ffffff;
        font-size: .8rem;
        margin-right: .5rem;
    }
    .main,.footer{
        margin-top: .5rem;
        background-color: white;
    }
    .main>input{
        width: 89%;
        height: 2rem;
        margin: .2rem 1rem;
        font-size: .8rem;
        border-radius: .2rem;
        box-sizing: border-box;
    }
    .main>input:nth-child(1){
        padding-left: .5rem;
        border: 1px solid #cccccc;
    }
    .main>input:nth-child(2){
        background-color: blue;
        color: white;
    }
    .footer>p{
        background-color: #cccccc;
        font-size: .8rem;
    }
    .footer>button{
        width: 100%;
        height: 2rem;
        border: none;
        outline: none;
        background-color: white;
        border-top: 1px solid #cccccc;
    }
    .list_city>li{
        height: 3rem;
        padding: .1rem .5rem;
        border-top: 1px solid #444444;
        background-color: white;
    }
    .list_city>li>p:nth-child(1){
        font-size: .7rem;
        margin: .5rem 0;
    }
    .list_city>li>p:nth-child(2){
        font-size: .6rem;
        margin: .3rem 0;
        color: #8c8c8c;
    }
</style>