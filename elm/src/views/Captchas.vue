<template>
    <!--
        订单
    -->
    <div class="captchas">
        <header>
            <i class="el-icon-arrow-left" @click="backRoute"></i>
            <span>订单列表</span>
            <!--<router-link to="/msite" class="el-icon-s-custom"></router-link>-->
        </header>
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
                <i class="el-icon-document colcors"></i>
                <p  class="colcors">订单</p>
            </router-link>
            <router-link :to="{path:'/profile',query:{lat:lon}}">
                <i class="el-icon-s-custom"></i>
                <p>我的</p>
            </router-link>
        </footer>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    export default {
        name: "Captchas",
        data(){
            return{
                lon:""
            }
        },
        methods:{
            ...mapMutations(["backRoute"])
        },
        created(){
            this.lon = this.$route.query.lat;
        }
    }
</script>

<style scoped>
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