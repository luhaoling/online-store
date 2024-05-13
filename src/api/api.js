import axios from 'axios';


let host = 'http://shop.projectsedu.com';
let goodsUrl = "http://127.0.0.1:8084"
let orderUrl = "http://127.0.0.1:8082"
let userUrl = "http://127.0.0.1:8081"


// let host = 'http://127.0.0.1:8000';

//上传文件
export const upload = (url,params) => { return axios.post(url,params) }
//获取商品类别信息
export const queryCategorygoods = params => { return axios.get(`${host}/indexgoods/`) }

// //获取首页中的新品
// export const newGoods = params => { return axios.get(`${host}/newgoods/`) }

//获取轮播图
export const bannerGoods = params => { return axios.post(`${goodsUrl}/banner/list`,params) }

//获取商品类别信息
export const getCategory = params => {
  if('id' in params){
    return axios.post(`${goodsUrl}/category/list`);
  }
  else {
    return axios.post(`${goodsUrl}/categorys/getSubCategory`, params);
  }
};


export const getCategorybyID = params => {return axios.post(`${goodsUrl}/category/getSubCategory`,params)}

export const getCategorys = params => {return axios.post(`${goodsUrl}/category/list`,params)}

//获取热门搜索关键词
export const getHotSearch = params => { return axios.get(`${host}/hotsearchs`) }

export const getSubCategory =params=>{return axios.post(`${goodsUrl}/categoryBrands/getSubCategoryBrand`,  params ) }

//获取验证码
export function getCaptcha(params) {
  return axios.get(userUrl+'/v1/base/captcha')
}
//获取商品列表
export const getGoods = params => { return axios.post(`${goodsUrl}/goods/list`,  params ) }

export const searchGoods = params => { return axios.post(`${goodsUrl}/goods/search`,  params ) }

export const getGoodsByBrandId = params => { return axios.post(`${goodsUrl}/goods/getByBrandID`,  params ) }

export const getBrands = params => { return axios.post(`${goodsUrl}/brands/all` ) }

export const getCateGoods=params => { return axios.post(`${goodsUrl}/goods/getCateGoods`,  params ) }

//获取商品新品
export const getNew = params => { return axios.post(`${goodsUrl}/goods/new` ) }
export const getHot = params => { return axios.post(`${goodsUrl}/goods/hot` ) }

//商品详情
export const getGoodsDetail = goodId => { return axios.post(`${goodsUrl}/goods/getGoods`,goodId) }

//获取购物车商品
export const getShopCarts = params => { return axios.post(`${orderUrl}/shopCart/list`) }
// 添加商品到购物车
export const addShopCart = params => { return axios.post(`${orderUrl}/shopCart/add`, params) }
//更新购物车商品信息
export const updateShopCart =  params => { return axios.post(`${orderUrl}/shopCart/update` ,params) }
//删除某个商品的购物记录
export const deleteShopCart = params => { return axios.post(`${orderUrl}/shopCart/delete/`,params) }

export const clearShopCart =params=> { return axios.post(`${orderUrl}/shopCart/clear/`) }


//收藏
export const addFav = params => { return axios.post(`${userOpUrl}/v1/userfavs`, params) }

//取消收藏
export const delFav = goodsId => { return axios.delete(`${userOpUrl}/v1/userfavs/`+goodsId) }

export const getAllFavs = () => { return axios.get(`${userOpUrl}/v1/userfavs`) }

//判断是否收藏getAllFavs
export const getFav = goodsId => { return axios.get(`${userOpUrl}/v1/userfavs/`+goodsId) }

//登录
export const login = params => {
  return axios.post(`${userUrl}/user/login`, params)
}

//注册

export const register = parmas => { return axios.post(`${userUrl}/user/register`, parmas) }

//短信
export const getMessage = parmas => { return axios.post(`${userUrl}/v1/base/send_sms`, parmas) }


//获取用户信息
export const getUserDetail = () => { return axios.post(`${userUrl}/user/getUser`) }

//修改用户信息
export const updateUserInfo = params => { return axios.post(`${userUrl}/user/update`, params) }


//获取订单
export const getOrders = params => { return axios.post(`${orderUrl}/order/list`) }
//删除订单
export const delOrder = params => { return axios.post(`${orderUrl}/order/cancelOrder`,params) }
//添加订单
export const createOrder = params => {return axios.post(`${orderUrl}/order/add`, params)}
//获取订单详情
export const getOrderDetail = params => {return axios.post(`${orderUrl}/order/getGoods`,params)}

export const getReceive =params=> {return axios.post(`${orderUrl}/order/receiveInfo`,params)}


//获取留言
export const getMessages = () => {return axios.get(`${userOpUrl}/v1/message`)}

//添加留言
export const addMessage = params => {return axios.post(`${userOpUrl}/v1/message`, params)}

//删除留言
export const delMessages = messageId => {return axios.delete(`${userOpUrl}/v1/message/`+messageId)}

//添加收货地址
export const addAddress = params => {return axios.post(`${userOpUrl}/v1/address`, params)}

//删除收货地址
export const delAddress = addressId => {return axios.delete(`${userOpUrl}/v1/address/`+addressId)}

//修改收货地址
export const updateAddress = (addressId, params) => {return axios.patch(`${userOpUrl}/v1/address/`+addressId, params)}

//获取收货地址
export const getAddress = () => {return axios.get(`${userOpUrl}/v1/address`)}
