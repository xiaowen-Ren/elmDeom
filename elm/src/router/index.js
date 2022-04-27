import Vue from 'vue'
import VueRouter from 'vue-router'
// 抛出异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    {
      path:"/",
        redirect:"/home"
    },
    {
      path:"/home",
        component:()=>import("../views/Home")
    },
    {
        path:"/login",
        component:()=>import("../views/Login")
    },
    {
        path:"/forget",
        component:()=>import("../views/Forget")
    },
    {
        path:"/city",
        component:()=>import("../views/City")
    },
    {
        path:"/msite",
        component:()=>import("../views/Msite"),
        mane:"m"
    },
    {
        path:"/discover",
        component:()=>import("../views/Discover")
    },
    {
        path:"/captchas",
        component:()=>import("../views/Captchas")
    },
    {
        path:"/profile",
        component:()=>import("../views/Profile"),
        children: [
            {
                path:"info",
                component:()=>import("../views/Info")
            }
        ]
    },
    {
        path:"/foot",
        component:()=>import("../views/Foot")
    },
    {
        path:"/shop",
        component:()=>import("../views/Shop"),
        children:[
            {
                path:"", // 设置二级路由默认
                redirect:"shopList"
            },
            {
                path:"shopList",
                component:()=>import("../views/shopList")
            },
            {
                path:"evaluate",
                component:()=>import("../views/Evaluate")
            },

        ]
    },
    {
        path:"/shopDetail",
        component:()=>import("../views/shopDetail")
    },
    {
        path:"/foodDetail",
        component:()=>import("../views/FoodDetail")
    },
    {
        path:"/confirmOrder",
        component:()=>import("../views/ConfirmOrder")
    }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
let paths = [];
router.afterEach((to,from)=>{
    paths.push(from.path)
    localStorage.path = JSON.stringify(paths);
})
export default router
