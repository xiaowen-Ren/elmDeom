/**
 * api接口统一管理
 */
import { get, post } from './http'
// 获取城市
export const apiAddress = p => get('https://elm.cangdu.org/v1/cities', p);
// 获取验证码
export const captchas = p => post('https://elm.cangdu.org/v1/captchas',p);
// 修改城市
export const updateCity = p => get('https://elm.cangdu.org/v1/pois/',p);
// 切换城市
export const groupCitys = p => get('https://elm.cangdu.org/v1/cities/',p);
// 登录
export const login = p => post('https://elm.cangdu.org/v2/login/',p);
// 修改密码
export const updatePassword = p => post('https://elm.cangdu.org/v2/changepassword',p);
// 获取轮播图列表
export const chartList = p => get('https://elm.cangdu.org/v2/index_entry',p);
// 获取商家列表
export const shopList = p => get('https://elm.cangdu.org/shopping/restaurants',p);
// 分类列表（左）
export const sortListLeft = p => get('https://elm.cangdu.org/shopping/v2/restaurant/category',p);
// 筛选配送方式
export const screenList = p => get('https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes',p);
// 筛选商家属性列表
export const attrShopList = p=> get('https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes',p);
// 搜索商家
export const searchShop = p => get('https://elm.cangdu.org/v4/restaurants',p);
// 获取用户信息
export const userMsg = p => get('https://elm.cangdu.org/v1/user',p);
// 获取店铺食品信息
export const foodMsg = p => get('https://elm.cangdu.org/shopping/v2/menu',p);
// 获取店铺信息
export const shopMsg = p => get('https://elm.cangdu.org/shopping/restaurant/'+p);
// 评价
export const s = p => get("https://elm.cangdu.org/ugc/v2/restaurants/" + p + "/ratings/tags");
// 获取评论信息
export const msg = p => get('https://elm.cangdu.org/ugc/v2/restaurants/1/ratings?offset=0&limit=10',p);