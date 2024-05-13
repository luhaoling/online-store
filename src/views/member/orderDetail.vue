<template>
    <div class="my_nala_centre ilizi_centre">
        <div class="ilizi cle">
            <div class="box">
                <div class="box_1">
                    <div class="userCenterBox boxCenterList clearfix" style="_height:1%;">
                        <h5><span>订单详情</span></h5>
                        <div class="blank"></div>
                        <table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd">
                            <tbody>
                                <tr>
                                    <td width="15%" align="right" bgcolor="#ffffff">订单号：</td>
                                    <td align="left" bgcolor="#ffffff">{{orderInfo.orderSn}}
                                        <!-- <a href="http://sx.youxueshop.com/user.php?act=message_list&amp;order_id=778" class="f6">[发送/查看商家留言]</a> -->
                                    </td>
                                </tr>
                                <tr>
                                    <td width="15%" align="right" bgcolor="#ffffff">下单日期</td>
                                    <td align="left" bgcolor="#ffffff">{{formatDate(orderInfo.addTime)}}
                                        <!-- <a href="http://sx.youxueshop.com/user.php?act=message_list&amp;order_id=778" class="f6">[发送/查看商家留言]</a> -->
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <table></table>
                    <div class="blank"></div>
                    <h5>
                        <span>商品列表</span>
                    </h5>
                    <div class="blank"></div>
                    <table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd">
                        <tbody>
                            <tr>
                                <th width="22%" align="center" bgcolor="#ffffff">商品图片</th>
                                <th width="30%" align="center" bgcolor="#ffffff">商品名称</th>
                                <!--<th>市场价</th>-->
                                <th width="19%" align="center" bgcolor="#ffffff">商品价格</th>
                                <th width="9%" align="center" bgcolor="#ffffff">购买数量</th>
                                <th width="20%" align="center" bgcolor="#ffffff">小计</th>
                            </tr>
                            <tr v-for="item in orderInfo.goods">
                                <td align="center" bgcolor="#ffffff">
                                    <div>
                                
                                    <img :src="item.goodsImage" alt="" style="height: 80px">
                                
                                </div>
                                </td>

                                <td bgcolor="#ffffff">
                                    <router-link  :to="'/app/home/productDetail/'+item.goods" class="f6">{{item.goodsName}}</router-link>
                                    <!-- <a href="" target="_blank" class="f6">{{item.name}}</a> -->
                                </td>
                                <td align="center" bgcolor="#ffffff">￥{{item.goodsPrice}}元</td>
                                <td align="center" bgcolor="#ffffff">{{item.nums}}</td>
                                <td align="center" bgcolor="#ffffff">￥{{item.goodsPrice*item.nums}}元</td>
                            </tr>
                            <tr>
                                <td colspan="8" bgcolor="#ffffff" align="right">
                                    商品总价: ￥{{totalPrice}}元
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="blank"></div>
                    <div class="blank"></div>
                    <h5><span>收货人信息</span></h5>
                    <div class="blank"></div>
                    <form name="formAddress" id="formAddress">
                        <table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd">
                            <tbody>
                            <tr>
                                <td width="15%" align="right" bgcolor="#ffffff">收货人姓名： </td>
                                <td width="35%" align="left" bgcolor="#ffffff"><input name="consignee" type="text" class="inputBg" v-model="receiveData.signerName" size="25">
                                </td>
                                <td width="15%" align="right" bgcolor="#ffffff">收货地址： </td>
                                <td width="35%" align="left" bgcolor="#ffffff"><input name="email" type="text" class="inputBg" v-model="receiveData.address" size="25">
                                </td>
                            </tr>

                            <tr>
                                <td align="right" bgcolor="#ffffff">电话： </td>
                                <td align="left" bgcolor="#ffffff"><input name="address" type="text" class="inputBg" v-model="receiveData.singerMobile" size="25"></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="blank"></div>
            </div>
        </div>
    </div>
</div>

</div>
</template>
<script>
  import { getOrderDetail,getReceive } from '../../api/api'
  export default {
        data () {
            return {
                orderId: '',
                orderInfo: {
                    // orderStatus: '已完成',
                    // payStatus: '未付款',
                    // deliveryStatus: '未发货'
                },
                proList: [
                    {
                        id: 123,
                        name: '新鲜水果甜蜜香脆单果约800克',
                        attr: '重量:1000克[50] 外观:红色 款式:时尚款 ',
                        price: '12',
                        num: 2,
                        total: '24'
                    }
                ],
                receiveData: {},
                totalPrice: 123,
                freightPrice: 23, //运费
                getOne:{
                    orderID:'',
                },
                getOrderInfoReq:{
                    orderID:0,
                }
            };
        },
        components: {


        },
        props: {

        },
        created () {
            this.orderId = this.$route.params.orderId;
            
            this.getOrderInfo();
            this.getReceiveByOrderId();
            
        },
        watch: {

        },
        computed: {
            payPrice() {
                return this.totalPrice + this.freightPrice;
            }
        },
        methods: {
            formatDate(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
            getReceiveByOrderId () { //通过orderid找收货人信息
                this.getOrderInfoReq.orderID=this.orderId;
                getReceive(this.getOrderInfoReq).then((response)=>{
                    this.receiveData = response.data.data;
                    console.log("response",this.receiveData);
                }).catch(function (error) {
                    console.log(error);
                });

            },

            getOrderInfo () { //获取订单信息
                this.getOne.orderID=this.orderId
                console.log("reqqqqqqqqqq",this.getOne.orderID)
              getOrderDetail(this.getOne).then((response)=> {
                    this.orderInfo = response.data.data;
                    console.log("bobby")
                    console.log("orderInfo",this.orderInfo)
                  console.log(this.orderInfo.goods[0].price)
                    var totalPrice = 0
                    response.data.data.goods.forEach(function(entry) {
                      totalPrice += entry.nums*entry.goodsPrice
                    });
                    this.totalPrice = totalPrice

                }).catch(function (error) {
                    console.log(error);
                });

            },
            
    
        }
    }
</script>
<style>

.my_nala_centre {
    float: right;
    width: 970px;
    background-color: #fff;
}

.ilizi_centre {
    background:0
}

.ilizi {
    border:1px solid #e4e4e4;
    padding:16px 18px;
    margin-bottom:10px;
    background:#fff
}
.ilizi .face,.iface .face {
    display:block;
    float:left;
    width:100px;
    height:100px;
    position:relative
}
.ilizi .edit_face,.iface .edit_face {
    position:absolute;
    height:20px;
    line-height:20px;
    width:100px;
    display:block;
    background:rgba(0,0,0,0.5);
    text-align:center;
    color:#fff;
    left:1px;
    bottom:-1px;
    _bottom:0;
    filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#77000000',endColorstr='#77000000');
    visibility:hidden;
    margin:0
}
.ilizi .face img,.iface .face img {
    width:100px;
    height:100px;
    border:1px solid #e4e4e4
}
.ilizi .ilizi_info {
    width:800px;
    float:right;
    height:100px
}


</style>

