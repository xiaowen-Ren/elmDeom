<template>
    <div class="evaluate">
        <ul class="eva_top">
            <li>
                <h3>5</h3>
                <p>综合评价</p>
                <p>高于周边商家76.9%</p>
            </li>
            <li>
                <div>
                    <span>服务态度</span>
                    <el-rate
                            v-model="4.7"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="4.7">
                    </el-rate>
                </div>
                <div>
                    <span>菜品评价</span>
                    <el-rate
                            v-model="4.8"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="4.8">
                    </el-rate>
                </div>
                <p>送达时间<span>分钟</span></p>
            </li>
        </ul>
        <div class="eva">
            <p></p>
            <ul class="eva_bottom">
                <li v-for="v in eva" :class="{'discusss':dis==v.name}" @click="dis=v.name">
                    {{v.name}}({{v.count}})
                </li>
            </ul>
            <ul class="eva_people">
                <li v-for="v in msg">
                    <img :src="'https://fuss10.elemecdn.com/'+v.avatar" alt="">
                    <div>
                        <p>{{v.username}}<span>{{v.rated_at}}</span></p>
                        <el-rate
                                v-model="v.rating_star"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="">
                        </el-rate>
                        <img v-for="n in v.item_ratings" :src="'https://fuss10.elemecdn.com/'+n.image_hash" alt="">
                        <br/>
                        <span v-for="n in v.item_ratings">{{n.food_name}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {s,msg} from "../request/api";

    export default {
        name: "Evaluate",
        data(){
            return{
                id:"",
                eva:[],
                msg:[],
                dis:"全部"
            }
        },
        created(){
            console.log(this.$route.query.id)
            this.id = this.$route.query.id
            s(this.id).then(data=>{
                this.eva = data;
            })
            // this.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/" + this.id + "/ratings/tags").then(data=>{
            //     console.log(data.data);
            //     this.eva = data.data;
            // })
            msg().then(data=>{
                console.log(data)
                this.msg = data;
            })
            // this.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/1/ratings?offset=0&limit=10").then(data=>{
            //     console.log(data.data)
            //     this.msg = data.data;
            // })
        },
    }
</script>

<style scoped>
    .eva_top{
        overflow: hidden;
        padding-top: 1rem;
        border-top: 1px solid #8c8c8c;
    }
    .eva_top>li:nth-child(1){
        float: left;
        text-align: center;
        margin-left: 2rem;
    }
    .eva_top>li:nth-child(1)>h3{
        font-size: 1.5rem;
        color: #ff9900;
    }
    .eva_top>li:nth-child(1)>p:nth-child(2){
        font-size: .8rem;
        margin: .3rem 0;
    }
    .eva_top>li:nth-child(1)>p:nth-child(3){
        font-size: .6rem;
        color: #5e5e5e;
    }
    .eva_top>li:nth-child(2){
        float: left;
        margin-left: 1rem;
    }
    .eva_top>li:nth-child(2)>div:nth-child(1)>div,.eva_top>li:nth-child(2)>div:nth-child(1)>span,
    .eva_top>li:nth-child(2)>div:nth-child(2)>div,.eva_top>li:nth-child(2)>div:nth-child(2)>span{
        float: left;
    }
    .eva_top>li:nth-child(2)>div:nth-child(1){
        overflow: hidden;
    }
    .eva_top>li:nth-child(2)>div:nth-child(2){
        overflow: hidden;
        margin: .25rem 0;
    }
    .eva_top>li:nth-child(2)>div:nth-child(1)>div,.eva_top>li:nth-child(2)>div:nth-child(2)>div{
        margin-left: .4rem;
    }
    .eva_top>li:nth-child(2)>div:nth-child(1),.eva_top>li:nth-child(2)>div:nth-child(2),.eva_top>li:nth-child(2)>p{
        font-size: .8rem;
    }
    .eva_top>li:nth-child(2)>p>span{
        color: #8c8c8c;
        font-size: .7rem;
        margin-left: .5rem;
    }
    .eva>p{
        background-color: #eeeeee;
        height: .6rem;
        margin-top: 1rem;
    }
    .eva_bottom{
        overflow: hidden;
        width: 100%;
        margin-top: .8rem;
    }
    .eva_bottom>li{
        float: left;
        font-size: .8rem;
        background-color: #ebf5ff;
        color: #6d7885;
        margin: .2rem 0 .2rem .8rem;
        padding: .4rem .2rem;
        border-radius: .2rem;
    }
    .eva_bottom .discusss{
        float: left;
        font-size: .8rem;
        background-color: #3190e8;
        color: #fff;
        margin: .2rem 0 .2rem .8rem;
        padding: .4rem .2rem;
        border-radius: .2rem;
    }
    .eva_people>li{
        overflow: hidden;
        margin: 1rem 0 1rem .8rem;
    }
    .eva_people>li>img{
        width: 2rem;
        height: 2rem;
        float: left;
    }
    .eva_people>li>div{
        float: left;
        width: 80%;
        margin-left: 1rem;
    }
    .eva_people>li>div>p{
        font-size: .6rem;
    }
    .eva_people>li>div>p>span{
        float: right;
    }
    .eva_people>li>div>img{
        width: 3.5rem;
    }
    .eva_people>li>div>span{
        width: 3rem;
        padding: .2rem .2rem;
        border-radius: .3rem;
        margin: .2rem 0 0 .2rem;
        display: inline-block;
        border: 1px solid #d4d4d4;
        font-size: .8rem;
        color: #999999;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
    }
</style>