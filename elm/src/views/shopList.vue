<template>
    <div class="shopList">
<!--选规格遮罩层----------------------------------------->
        <div class="big-mask" v-if="!itBool">
            <div>
                <p>{{foods.name}}<i class="el-icon-close" @click="itBool=true"></i></p>
                <p>规格</p>
                <div>
                    <span v-for="v in foods.specfoods" :class="{'big-mask-span':def==v.food_id}" @click="def=v.food_id,maskPrice=v.price" >{{v.specs_name}}</span>
                </div>
                <p>￥{{maskPrice}}<button @click="addFood(foods)">加入购物车</button></p>
            </div>
        </div>
        <div class="shopList_left">
<!--左侧列表----------------------------------------------------->
            <ul class="list_left">
                <li v-for="(shop,i) in footData" :class="{'colors':msg==shop.name}" @click="liList(shop)">
                    <div class="subscript" v-if="nums(shop)==undefined?false:true">{{nums(shop)}}</div>
                    <a :href="'#one'+i">{{shop.name}}</a>
                </li>
            </ul>
        </div>
<!--右侧列表----------------------------------------------------->
        <div class="shopList_right">
            <ul>
                <li v-for="(pro,i) in footData">
<!--标题-------------------------------------------------------->
                    <h3 :id= "'one'+i">{{pro.name}}<span>{{pro.description}}</span><i class="el-icon-more" @click="iBool=!iBool"></i></h3>
                    <p v-if="!iBool" class="small_mask">
                        {{pro.name}}
                        <span>{{pro.description}}</span>
                        <span></span>
                    </p>
<!--食品-------------------------------------------------------->
                    <div v-for="(v,index) in pro.foods" @click="foodDet(v)" class="foods">
                        <img :src="'https://elm.cangdu.org/img/' + v.image_path">
                        <div>
                            <p>
                                {{v.name}}
                                <span :class="zi[index].icon_name=='新'?className1:className2">{{zi[index].icon_name}}</span>
                            </p>
                            <p>{{v.description}}</p>
                            <p><span>月售{{v.month_sales}}份</span><span>好评率{{v.satisfy_rate}}%</span></p>
                            <p :class="v.activity?p1:className3">{{v.activity?v.activity.image_text:''}}</p>
                            <div>
                                {{v.specfoods[0].price}}
                                <span v-if="v.specfoods.length>1?true:false">起</span>
<!--加减商品--------------------------------------------------->
                                <div class="shop_car">
                                    <span :class="numCom1(pro,v)" @click.stop="delFoods(v)" ></span>
                                    <span :class="numCom2(pro,v)">{{localMSg(pro,v)}}</span>
                                    <span @click.stop="addFoods(v,pro,$event)" :class="v.specfoods.length>1?'shop_car_three':'el-icon-circle-plus shop_car_three2'">{{v.specfoods.length>1?'选规格':''}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
<!--底部购物车----------------------------------------------->
        <div class="shop_car_botton" @click="showCar">
            <i :class="i1">{{msg2}}<span id="span0" v-if="total==0?false:true">{{total}}</span></i>
            <div>
                <p>￥{{prices}}{{totals}}</p>
                <p>配送费￥{{shopData.float_delivery_fee}}</p>
            </div>
            <div @click.stop="prices>=shopData.float_minimum_order_amount?$router.push('/confirmOrder'):''" :class="{'div':prices>=shopData.float_minimum_order_amount}">{{prices-0-shopData.float_minimum_order_amount<0?('还差￥'+(shopData.float_minimum_order_amount-prices).toFixed(1)+'起送'):'去支付'}}</div>
        </div>
<!--底部购物车详情---------------------------------------->
        <div class="buyCar" v-if="!ibool">
            <p @click="ibool=true"></p>
            <div>
                <P>购物车<i class="el-icon-delete" @click="allClear">清空</i></P>
                <ul class="buyCar_list">
                    <li v-for="v in foodOld">
                        <div v-for="(val1,key1,i1) in v" v-if="key1==shopData.id?true:false">
                            <div v-for="(val2,key2,i2) in val1">
                                <div v-for="(val3,key3,i3) in val2">
                                    <div v-for="(val4,key4,i4) in val3">
                                        <span>{{val4.name}}</span>
                                        <div>
                                            <i class="el-icon-remove-outline" @click="cut(key1,key2,key3,key4)"></i>
                                            <span>{{val4.num}}</span>
                                            <i class="el-icon-circle-plus" @click="plus(key1,key2,key3,key4)"></i>
                                        </div>
                                        <span>￥{{val4.price}}</span>
                                        <p>{{val4.specs}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
<!--食品详情--------------------------------------------------->
        <div class="foodDetail" v-if="!mBool">
            <div>
                <i @click="mBool=true" class="el-icon-arrow-left"></i>
                <span>{{foodDetd.name}}</span>
            </div>
            <img :src="'https://elm.cangdu.org/img/' + foodDetd.image_path">
            <p>{{foodDetd.description}}</p>
            <p>{{foodDetd.name}}</p>
            <div>
                <span>评分</span>
                <el-rate
                        v-model="value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                </el-rate>
            </div>
            <p>月售{{foodDetd.month_sales}}单，售价{{foodDetd.specfoods[0].price}}{{foodDetd.specfoods.length>1?"起":""}}</p>
            <p>评论数 {{foodDetd.rating_count}} 好评率{{foodDetd.satisfy_rate}}</p>
        </div>
        <p id="p0" v-if="!p0">多规格商品只能去购物车删除哦</p>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import Vue from "vue"
    import {foodMsg,shopMsg} from "../request/api";

    export default {
        name: "shopList",
        data(){
            return{
                // 选规格初始价格
                maskPrice:0,
                id:"",
                lon:"",
                shopData:{},
                footData:[],
                msg:"",
                classColor:"",
                zi:[],
                className:"",
                className1:"span",
                className2:"span2",
                className3:"span3",
                p1:"p1",
                shopCarOne:"shop_car_one",
                shopCarTwo:"shop_car_two",
                // itemId:[],
                shopNum:0,
                links:1,
                foods:{},
                def:"默认",
                foodOld:[],
                foodNew:[],
                num:0,
                prices:0,
                bool:true,
                isBool:true,
                iBool:true,
                itBool:true,
                ibool:true,
                mBool:true,
                p0:true,
                foodDetd:{},
                value:0,
                i1:"el-icon-shopping-cart-2",
                obj:{},
                // 获取商品分类
                pro:{},
                arr:[],
                total:0,
                kindNumOld:{},
                kindNumNew:{}
            }
        },
        created(){
            this.id = this.$route.query.id
            this.lon = this.$route.query.lat
            // 获取店铺食品信息
            foodMsg({
                restaurant_id:this.id
            }).then(data=>{
                this.footData = data;
                this.msg = data[0].name;
                this.footData.forEach(v=>{
                    v.foods.forEach((i,n)=>{
                        i.shopNum = this.shopNum
                    })
                })
                data.forEach(v=>{
                    v.foods.forEach(n=>{
                        if (n.attributes.length == 0 || n.attributes[0] == null) {
                            this.zi.push({icon_name:""})
                        } else {
                            this.zi.push(n.attributes[0])
                        }
                    })
                })
            })
            // this.axios.get("https://elm.cangdu.org/shopping/v2/menu",{params:{restaurant_id:this.id}}).then(data=>{
                // console.log("店铺商品信息：",data.data);
                // this.footData = data.data;
                // this.msg = data.data[0].name;
                // this.footData.forEach(v=>{
                //     v.foods.forEach((i,n)=>{
                //         i.shopNum = this.shopNum
                //     })
                // })
                // data.data.forEach(v=>{
                //     v.foods.forEach(n=>{
                //         if (n.attributes.length == 0 || n.attributes[0] == null) {
                //             this.zi.push({icon_name:""})
                //         } else {
                //             this.zi.push(n.attributes[0])
                //         }
                //     })
                // })
            // });
            // 获取店铺信息
            shopMsg(this.id).then(data=>{
                this.shopData = data;
            })
            // this.axios.get("https://elm.cangdu.org/shopping/restaurant/" + this.id).then(data=>{
            //     this.shopData = data.data;
            //     console.log("店铺信息：",data.data)
            // });
            if (localStorage.carFood) {
                this.foodOld = JSON.parse(localStorage.carFood);
            }
            if (localStorage.kindNum) {
                this.kindNumOld = JSON.parse(localStorage.kindNum);
            }
        },
        methods:{
            ...mapMutations(["func"]),
            // 切换锚点
            liList(i){
                this.msg = i.name;
            },
            // 选规格添加商品
            addFood(v){
                if (localStorage.carFood) {
                    this.foodOld = JSON.parse(localStorage.carFood);
                }
                this.itBool=true;
                // 打包费
                let packing_fee = 0;
                // 价格
                let price = 0;
                // 数量
                let num = 1;
                // 规格id
                let sku_id = "";
                // 规格
                let specs = "";
                // 存量
                let stock = 0;
                // 食品名称
                let name = "";
                // 规格id
                let id = ""
                v.specfoods.forEach(v=>{
                    if (this.def == v.food_id) {
                        name = v.name;
                        specs = v.specs_name;
                        packing_fee = v.packing_fee;
                        sku_id = v.sku_id;
                        price = v.price;
                        stock = v.stock;
                        id = v.food_id
                    }
                });

                // 店铺id
                this.obj[this.shopData.id] = {
                    // 食品分类id
                    [this.pro.id]:{
                        // 食品id
                        [v.item_id]:{
                            // 规格id
                            [id]:{
                                id,name,num,packing_fee,price,sku_id,specs,stock
                            }
                        }
                    }
                }
                let arr = []
                // 如果购物车没有东西
                if (this.foodOld.length == 0) {
                    this.foodOld.push(this.obj);
                } else {
                    this.foodOld.forEach(v=>{
                        for (let key in v) {
                            arr.push(key);
                        }
                    })
                    // 判断是否有相同的店铺
                    if (arr.indexOf(Object.keys(this.obj)[0]) == -1) {
                        this.foodOld.push(this.obj);
                    } else {
                        this.foodOld.forEach(n=>{
                            // 判断店铺相同时
                            if (Object.keys(n)[0] == Object.keys(this.obj)[0]) {
                                // 判断是否存在相同商品分类
                                if (n[this.shopData.id][this.pro.id] == undefined) {
                                    // 添加
                                    n[this.shopData.id][this.pro.id] = this.obj[this.shopData.id][this.pro.id]
                                } else {
                                    // 判断是否存在相同商品
                                    if (n[this.shopData.id][this.pro.id][v.item_id] == undefined) {
                                        // 添加
                                        n[this.shopData.id][this.pro.id][v.item_id] = this.obj[this.shopData.id][this.pro.id][v.item_id];
                                    } else {
                                        // 判断是否存在相同规格商品
                                        if (n[this.shopData.id][this.pro.id][v.item_id][id] == undefined) {
                                            // 添加
                                            n[this.shopData.id][this.pro.id][v.item_id][id] = this.obj[this.shopData.id][this.pro.id][v.item_id][id];
                                        } else {
                                            n[this.shopData.id][this.pro.id][v.item_id][id].num++;
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
                // 商品分类角标
                this.kindNumNew = this.kindNumOld;
                if (this.kindNumNew[this.pro.id] == undefined) {
                    this.kindNumNew[this.pro.id] = 1;
                } else {
                    this.kindNumNew[this.pro.id]++;
                }
                localStorage.carFood = JSON.stringify(this.foodOld);
                localStorage.kindNum = JSON.stringify(this.kindNumNew);
            },
            // 添加商品
            addFoods(v,pro,event){
                let left = event.pageX;
                let top=  event.pageY;

                let bar = document.createElement('div');
                bar.style.position = 'absolute'
                bar.style.left = (left) + 'px'
                bar.innerHTML = '+'
                bar.style.textAlign = "center"
                bar.style.color = '#ffffff'
                bar.style.top = (top) + 'px'
                bar.style.width = '1rem'
                bar.style.height = '1rem'
                bar.style.lineHeight ='1rem'
                bar.style.borderRadius = '50%'
                bar.style.backgroundColor = '#02b6fd'
                bar.style.transition = 'left .6s linear, top .6s cubic-bezier(0.5, -0.5, 1, 1)'

                document.body.appendChild(bar)
// 添加动画属性
                setTimeout(() => {
                    let target = document.querySelector('.el-icon-shopping-cart-2')
                    bar.style.left = 2 + 'rem'
                    bar.style.top = 30 + 'rem'
                }, 0);

                /**
                 * 动画结束后，删除自己
                 */
                bar.ontransitionend = function () {
                    this.remove()
                }


                if (localStorage.carFood) {
                    this.foodOld = JSON.parse(localStorage.carFood);
                }
                this.maskPrice = v.specfoods[0].price;
                this.def = v.specfoods[0].food_id;
                this.pro = pro;
                if (v.specfoods.length == 1) {
                    // 打包费
                    let packing_fee = 0;
                    // 价格
                    let price = 0;
                    // 数量
                    let num = 1;
                    // 规格id
                    let sku_id = "";
                    // 规格
                    let specs = "";
                    // 存量
                    let stock = 0;
                    // 食品名称
                    let name = "";
                    // 规格id
                    let id = ""
                    v.specfoods.forEach(v=>{
                        if (this.def == v.food_id) {
                            name = v.name;
                            specs = v.specs_name;
                            packing_fee = v.packing_fee;
                            sku_id = v.sku_id;
                            price = v.price;
                            stock = v.stock;
                            id = v.food_id
                        }
                    });
                    // 店铺id
                    this.obj[this.shopData.id] = {
                        // 食品分类id
                        [this.pro.id]:{
                            // 食品id
                            [v.item_id]:{
                                // 规格id
                                [id]:{
                                    id,name,packing_fee,price,sku_id,specs,stock
                                }
                            }
                        }
                    }
                    this.obj[this.shopData.id][this.pro.id][v.item_id][id].num = 1;
                    let arr = []
                    if (this.foodOld.length == 0) {
                        this.foodOld.push(this.obj);
                    } else {
                        this.foodOld.forEach(v=>{
                            for (let key in v) {
                                arr.push(key);
                            }
                        })
                        // 判断是否有相同的店铺
                        if (arr.indexOf(Object.keys(this.obj)[0]) == -1) {
                            this.foodOld.push(this.obj);
                        } else {
                            this.foodOld.forEach(n=>{
                                // 判断店铺相同时
                                if (Object.keys(n)[0] == Object.keys(this.obj)[0]) {
                                    // 判断是否存在相同商品分类
                                    if (n[this.shopData.id][this.pro.id] == undefined) {
                                        // 添加
                                        n[this.shopData.id][this.pro.id] = this.obj[this.shopData.id][this.pro.id]
                                    } else {
                                        // 判断是否存在相同商品
                                        if (n[this.shopData.id][this.pro.id][v.item_id] == undefined) {
                                            // 添加
                                            n[this.shopData.id][this.pro.id][v.item_id] = this.obj[this.shopData.id][this.pro.id][v.item_id];
                                        } else {
                                            // 判断是否存在相同规格商品
                                            if (n[this.shopData.id][this.pro.id][v.item_id][id] == undefined) {
                                                // 添加
                                                n[this.shopData.id][this.pro.id][v.item_id][id] = this.obj[this.shopData.id][this.pro.id][v.item_id][id];
                                            } else {
                                                n[this.shopData.id][this.pro.id][v.item_id][id].num++;
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                    this.shopCarOne = "shop_car_one2 el-icon-remove-outline";
                    this.shopCarTwo = "shop_car_two2";
                    this.foods = v;
                    this.foodNew = this.foodOld;
                    // 商品分类角标
                    this.kindNumNew = this.kindNumOld;
                    if (this.kindNumNew[this.pro.id] == undefined) {
                        this.kindNumNew[this.pro.id] = 1;
                    } else {
                        this.kindNumNew[this.pro.id]++;
                    }
                } else {
                    this.foods = v;
                    this.foodNew = this.foodOld;
                    this.itBool = false
                }
                localStorage.carFood = JSON.stringify(this.foodNew);
                localStorage.kindNum = JSON.stringify(this.kindNumNew);
            },
            // 删除商品
            delFoods(v){
                console.log(v);
                console.log(v.specfoods.length);
                if (v.specfoods.length == 1) {
                    this.foodOld = JSON.parse(localStorage.carFood);
                    if (this.shopData) {
                        this.foodOld.forEach(n=>{
                            if (Object.keys(n) == this.shopData.id) {
                                n[this.shopData.id][v.category_id][v.item_id][v.specfoods[0].food_id].num--;
                                if (n[this.shopData.id][v.category_id][v.item_id][v.specfoods[0].food_id].num == 0) {
                                    delete n[this.shopData.id][v.category_id][v.item_id][v.specfoods[0].food_id]
                                }
                            }
                        })
                    }
                } else {
                    this.p0 = false;
                    this.timer = setTimeout(()=>{
                        clearTimeout(this.timer);
                        this.p0 = true;
                    },3000);
                }
                localStorage.carFood = JSON.stringify(this.foodOld);
                // 商品分类角标
                this.kindNumOld[v.category_id]--;
                if (this.kindNumOld[this.pro.id] == 0) {
                    delete this.kindNumOld[this.pro.id]
                }
                localStorage.kindNum = JSON.stringify(this.kindNumOld);
            },
            // 购物车减商品
            cut(key1,key2,key3,key4){
                this.foodOld.forEach(n=>{
                    n[key1][key2][key3][key4].num--;
                    if (n[key1][key2][key3][key4].num == 0) {
                        delete n[key1][key2][key3][key4];
                    }
                });
                localStorage.carFood = JSON.stringify(this.foodOld);
                this.kindNumOld[key2]--;
                if (this.kindNumOld[key2] == 0) {
                    delete this.kindNumOld[key2]
                }
                localStorage.kindNum = JSON.stringify(this.kindNumOld);
            },
            // 购物车加商品
            plus(key1,key2,key3,key4){
                this.foodOld.forEach(n=>{
                    if (Object.keys(n) == key1) {
                        n[key1][key2][key3][key4].num++;
                    }
                });
                localStorage.carFood = JSON.stringify(this.foodOld);
                this.kindNumOld[key2]++;
                localStorage.kindNum = JSON.stringify(this.kindNumOld);
            },
            // 点击食品显示食品详情
            foodDet(v){
                this.mBool = false;
                this.foodDetd = v;
                this.value = v.rating
            },
            // 点击购物车显示详情
            showCar(){
                if (this.prices>=this.shopData.float_minimum_order_amount) {
                    this.ibool = !this.ibool;
                }
                // this.arr = [];
                // if (localStorage.carFood) {
                //     this.foodOld = JSON.parse(localStorage.carFood);
                //     this.foodOld.forEach(s=>{
                //         if (Object.keys(s) == this.shopData.id) {
                //             this.ibool = !this.ibool;
                //             for ( let key1 in this.foodOld) {
                //                 for ( let key2 in this.foodOld[key1]) {
                //                     for ( let key3 in this.foodOld[key1][key2]) {
                //                         for ( let key4 in this.foodOld[key1][key2][key3]) {
                //                             for ( let key5 in this.foodOld[key1][key2][key3][key4]) {
                //                                 this.arr.push(this.foodOld[key1][key2][key3][key4][key5]);
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     })
                // }
                // console.log(this.arr);

            },
            // 清空所有商品
            allClear(){
                localStorage.carFood = [];
                this.foodOld = [];
                this.ibool = true;
            }
        },
        computed:{
            msg2(){
                if (this.shopData.float_minimum_order_amount <= this.prices) {
                    this.i1 = "i2 el-icon-shopping-cart-2"
                } else {
                    this.i1 = "el-icon-shopping-cart-2"
                }
            },
            // 每个食品的数量
            localMSg(){
                let n = 1;
                return function (pro,v) {
                    let l = 0
                    if (this.shopData.id) {
                        this.foodOld.forEach(s => {
                            if (this.shopData.id == Object.keys(s)) {
                                if (s[this.shopData.id][v.category_id] == undefined) {
                                    l = 0
                                } else {
                                    if (s[this.shopData.id][v.category_id][v.item_id] == undefined) {
                                        l = 0
                                    } else {
                                        if (v.specfoods.length == 1) {
                                            if (s[this.shopData.id][v.category_id][v.item_id][v.specfoods[0].food_id] == undefined) {
                                                l = 0
                                            } else {
                                                l = s[this.shopData.id][v.category_id][v.item_id][v.specfoods[0].food_id].num;
                                            }
                                        } else {
                                            v.specfoods.forEach((j,i)=>{
                                                if (s[this.shopData.id][v.category_id][v.item_id][v.specfoods[i].food_id] != undefined) {
                                                    l += s[this.shopData.id][v.category_id][v.item_id][v.specfoods[i].food_id].num;
                                                }
                                            })

                                        }

                                    }
                                }

                            }
                        })
                    }
                    return l;
                }
            },
            numCom1(){
                return (pro,v)=> {
                    if (this.localMSg(pro,v) > 0 && v.specfoods.length > 1) {
                        return 'shop_car_one3 el-icon-remove-outline';
                    } else if (this.localMSg(pro,v) > 0) {
                        return 'shop_car_one2 el-icon-remove-outline';
                    } else {
                        return 'shop_car_one';
                    }
                }
            },
            numCom2(){
                // localMSg(pro,v)>0?'shop_car_one2 el-icon-remove-outline':'shop_car_one'"
                return (pro,v)=> {
                    if (this.localMSg(pro,v) > 0 && v.specfoods.length > 1) {
                        return 'shop_car_two3';
                    } else if (this.localMSg(pro,v) > 0) {
                        return 'shop_car_two2';
                    } else {
                        return 'shop_car_two';
                    }
                }
            },
            // 计算总价
            totals(){
                this.prices = 0;
                this.total = 0;
                this.foodOld.forEach(s=>{
                    if (Object.keys(s) == this.shopData.id) {
                        for ( let key1 in s) {
                            for ( let key2 in s[key1]) {
                                for ( let key3 in s[key1][key2]) {
                                    for ( let key4 in s[key1][key2][key3]) {
                                        this.prices += s[key1][key2][key3][key4].num * s[key1][key2][key3][key4].price;
                                        // console.log(this.prices);
                                        this.total += s[key1][key2][key3][key4].num;
                                    }
                                }
                            }
                        }
                    }
                })
            },
            nums(){
                return (s)=>{
                    if (localStorage.kindNum) {
                        this.kindNum = JSON.parse(localStorage.kindNum);
                        for (let key in this.kindNum) {
                            if (key == s.id) {
                                // console.log(this.kindNum[key])
                                return this.kindNum[key];
                            }
                        }
                    }
                }
            }
        },
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    #span0{
        display: inline-block;
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        background-color: red;
        font-size: .6rem;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        right: -.2rem;
        top: -.2rem;
    }
    .subscript{
        width: .8rem;
        height: .8rem;
        line-height: .6rem;
        text-align: center;
        border-radius: 50%;
        color: white;
        background-color: red;
        position: relative;
        right: -2.8rem;
        top: -.8rem;
    }
    .shopList{
        overflow: hidden;
        height: 22rem;
    }
    .big-mask{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 7;
        background-color: rgba(0,0,0,.2);
    }
    .big-mask>div{
        width: 13rem;
        margin: 11rem auto;
        background-color: white;
        border-radius: .5rem;
    }
    .big-mask>div>p:nth-child(1){
        text-align: center;
        padding-top: .3rem;
    }
    .big-mask>div>p:nth-child(1)>i{
        float: right;
        margin: 0 .3rem 0 0;
        font-size: 1.3rem;
    }
    .big-mask>div>p:nth-child(2){
        font-size: .8rem;
        margin: 2rem 0 .8rem .5rem;
    }
    .big-mask>div>div{
        margin-left: .6rem;
        margin-bottom: 2.5rem;
    }
    .big-mask>div>div>span{
        border: 1px solid #d4d4d4;
        font-size: .8rem;
        border-radius: .2rem;
        margin-right: .5rem;
        padding: .2rem .4rem;
        display: inline-block;
    }
    .big-mask>div>div .big-mask-span{
        border: 1px solid #5bc0de;
    }
    .big-mask>div>p:nth-child(4){
        padding-bottom: 1rem;
        color: #ff6000;
    }
    .big-mask>div>p:nth-child(4)>button{
        float: right;
        color: white;
        background-color: #5bc0de;
        border: none;
        height: 1.5rem;
        margin-right: .5rem;
        padding: 0 .5rem;
        border-radius: .2rem;
    }
    .shopList_left{
        background-color: #f5f5f5;
        float: left;
        overflow-y: auto;
        height: 22rem;
        width: 23%;
    }
    .shopList_right{
        width: 77%;
        float: left;
        height: 22rem;
        overflow-y: auto;
    }
    .list_left>li{
        width: 4rem;
        height: 2rem;
        color: #333333;
        padding: 1rem .3rem 0;
        font-size: .7rem;
        border-top: 1px solid #ffffff;
    }
    .colors{
        background-color: white;
        border-left: 3px solid #5bc0de;
    }
    .shopList_right>ul>li{
        position: relative;
    }
    .shopList_right>ul>li>h3{
        height: 1rem;
        font-size: .9rem;
        padding: .8rem;
        background-color: #eeeeee;
    }
    .shopList_right>ul>li>h3>span{
        font-size: .6rem;
        color: #b0b0b0;
        margin-left: .5rem;
    }
    .shopList_right>ul>li>h3>i{
        float: right;
    }
    .small_mask{
        width: 9rem;
        border-radius: .3rem;
        background-color: black;
        color: #eeeeee;
        font-size: .8rem;
        padding: .5rem 0 .5rem .3rem;
        position: absolute;
        right: .6rem;
        top: 1.8rem;
        z-index: 6;
    }
    .small_mask>span:nth-child(1){
        font-size: .6rem;
    }
    .small_mask>span:nth-child(2){
        width: .6rem;
        height: .6rem;
        display: inline-block;
        background-color: #000000;
        transform: rotateZ(45deg);
        position: absolute;
        right: .6rem;
        top: -.3rem;
    }
    .foods{
        position: relative;
        margin-top: .8rem;
        border-top: .04rem solid #eeeeee;
    }
    .foods>img{
        width: 2.3rem;
        float: left;
        margin-top: .75rem;
    }
    .foods{
        overflow: hidden;
    }
    .foods>div{
        float: left;
        width: 11rem;
        margin-left: .4rem;
        overflow: hidden;
    }
    .foods>div>p:nth-child(1){
        width: 100%;
        font-size: .8rem;
        margin-top: .6rem;
    }
    .span{
        font-size: .7rem;
        position: absolute;
        top: -1.5rem;
        left: -1.5rem;
        background-color: rgb(94, 196, 82);
        color: white;
        width: 3rem;
        height: 3rem;
        text-align: center;
        line-height: 5rem;
        transform: rotateZ(-45deg);
    }
    .span2{
        float: right;
        color: red;
        font-size: .3rem;
        border-radius: .2rem;
        border: .01rem solid red;
    }
    .span3{}
    .foods>div>p:nth-child(2){
        /*float: left;*/
        font-size: .7rem;
        color: #cccccc;
        margin-top: .4rem;
        height: 1rem;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .foods>div>p:nth-child(3){
        font-size: .7rem;
        margin-top: .4rem;
    }
    .p1{
        display: inline-block;
        color: red;
        font-size: .3rem;
        border-radius: .2rem;
        border: .01rem solid red;
    }
    .shop_car{
        float: right;
        margin-bottom: .2rem;
        position: relative;
    }
    .shop_car_one{
        color: #5bc0de;
        position: absolute;
        right: 0;
        bottom: 0;
        display: none;
        transition: all .2s initial;
    }
    .shop_car_one2{
        color: #5bc0de;
        position: absolute;
        right: 2.1rem;
        bottom: 0;
        display: inline;
        transition: all .2s initial;
    }
    .shop_car_one3{
        color: #999999;
        position: absolute;
        right: 3.2rem;
        bottom: -.15rem;
        display: inline;
        transition: all .2s initial;
    }
    .shop_car_two{
        position: absolute;
        right: 0;
        bottom: 0;
        display: none;
        transition: all .2s initial;
    }
    .shop_car_two2{
        position: absolute;
        right: 1.2rem;
        bottom: 0;
        display: inline;
        transition: all .2s initial;
    }
    .shop_car_two3{
        position: absolute;
        right: 2.5rem;
        bottom: -.15rem;
        display: inline;
        transition: all .2s initial;
    }
    .shop_car_three{
        font-size: .6rem;
        background-color: #5bc0de;
        color: white;
        padding: .1rem .2rem;
        border-radius: .2rem;
    }
    .shop_car_three2{
        color: #5bc0de;
    }
    .shop_car_botton{
        height: 2.3rem;
        width: 100%;
        background-color: black;
        position: fixed;
        bottom: 0;
        color: white;
        z-index: 10;
    }
    .shop_car_botton>i{
        color: white;
        border: .15rem solid #5e5e5e;
        padding: .5rem;
        border-radius: 50%;
        background-color: black;
        position: absolute;
        top: 0;
        left: 1rem;
        transform: translateY(-40%);
    }
    .shop_car_botton .i2{
        background-color: #5bc0de;
        border: .15rem solid black;
    }
    .shop_car_botton>div:nth-child(2){
        float: left;
        margin-left: 4rem;
        margin-top: .2rem;
    }
    .shop_car_botton>div:nth-child(2)>p:nth-child(2){
        font-size: .6rem;
        margin-top: .2rem;
    }
    .shop_car_botton>div:nth-child(3){
        float: right;
        height: 2.3rem;
        width: 6rem;
        text-align: center;
        line-height: 2.3rem;
        font-size: .8rem;
        padding: 0 .5rem;
        background-color: #5e5e5e;
    }
    .shop_car_botton .div{
        background-color: #4cd964 !important;
    }
    .buyCar{
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.2);
        z-index: 8;
    }
    .buyCar>div{
        width: 100%;
        background-color: white;
        position: absolute;
        bottom: 2.3rem;
        max-height: 25rem;
    }
    .buyCar>p{
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
    }
    .buyCar>div>p{
        overflow: hidden;
        padding: 0 .5rem;
        font-size: .8rem;
        height: 2rem;
        line-height: 2rem;
        background-color: #eceff1;
    }
    .buyCar>div>p>i{
        float: right;
        line-height: 1.5rem;
    }
    .buyCar_list{
        max-height: 22rem;
        overflow-y: auto;
    }
    .buyCar_list>li{
        margin-top: .8rem;
    }
    .buyCar_list>li>div>div>div>div{
        overflow: hidden;
        height: 2.5rem;
        font-size: .8rem;
    }
    .buyCar_list>li>div>div>div>div>p{
        margin-left: .5rem;
        font-size: .6rem;
        color: #666666;
        margin-top: .1rem;
    }
    .buyCar_list>li>div>div>div>div>span:nth-child(1){
        margin-left: .5rem;
    }
    .buyCar_list>li>div>div>div>div>span:nth-child(3){
        float: right;
        margin-right: 1.5rem;
        color: #f60;
    }
    .buyCar_list>li>div>div>div>div>div{
        float: right;
        font-size: .8rem;
    }
    .buyCar_list>li>div>div>div>div>div>span{
        margin: 0 .5rem;
    }
    .buyCar_list>li>div>div>div>div>div>i{
        color: #3190e8;
        font-size: 1rem;
    }
    .buyCar_list>li>div>div>div>div>div>i:nth-child(3){
        margin-right: .5rem;
    }

    .foodDetail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        background-color: white;
    }
    .foodDetail>div:nth-child(1){
        height: 2rem;
        width: 100%;
        background-color: #5bc0de;
        color: white;
        text-align: center;
        line-height: 2rem;
    }
    .foodDetail>div:nth-child(1)>i{
        float: left;
        font-size: 1.2rem;
        margin-top: .3rem;
    }
    .foodDetail>img{
        width: 100%;

    }
    .foodDetail>p:nth-child(3){
        font-size: .8rem;
        /*margin-left: 1rem;*/
        margin: .5rem 1rem .8rem .5rem;
        color: #999999;
    }
    .foodDetail>p:nth-child(4){
        font-size: .95rem;
        margin-left: .5rem;
    }
    .foodDetail>div:nth-child(5){
        margin: .5rem .5rem .5rem .5rem;
        font-size: .7rem;
        overflow: hidden;
    }
    .foodDetail>div:nth-child(5)>span{
        float: left;
    }
    .foodDetail>div:nth-child(5)>div{
        float: left;
    }
    .foodDetail>p:nth-child(6){
        margin: 0 0 .5rem .5rem;
        font-size: .8rem;
    }
    .foodDetail>p:nth-child(7){
        font-size: .8rem;
        margin-left: .5rem;
    }
    #p0{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        font-size: .8rem;
        background-color: black;
        color: white;
        width: 13rem;
        padding: .6rem 0 .7rem;
        text-align: center;
        border-radius: .4rem;
    }
</style>