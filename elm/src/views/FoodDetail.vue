<template>
    <div class="foodDetail">
        <nav>
            <router-link class="el-icon-arrow-left" :to="{path:'/shop/shopList',query:{lat:lon,id:foods.restaurant_id}}"></router-link>
        </nav>
        div
    </div>
</template>

<script>
    export default {
        name: "FoodDetail",
        data(){
            return{
                lon:"",
                foods:{}
            }
        },
        created(){
            this.lon = this.$route.query.lat;
            this.foods = this.$route.query.food
        },
        methods:{

        }
    }
</script>

<style scoped>
    nav{
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        background-color: #3190e8;
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
</style>