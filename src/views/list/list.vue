<template>
    <div id="wrapper">
        <current-loc :curLoc="curLoc"></current-loc>
        <div class="main cle">
            <div class="sidebar">
                <div class="cate-menu" id="cate-menu">
                    <dl>
                        <h1 style="text-align: left;margin-left: 25px;">品牌列表</h1>
                        <template v-for="item in cateMenu">
                            <dt style="text-align: left; margin-left: 15px;">
                                <a @click="changeMenu(item.id)">{{ item.name}}</a>
                            </dt>
                                                   
                        </template>
                    </dl>
                </div>
        
            </div>
            <div class="maincon">
                <!-- <price-range :priceRange="priceRange" @on-change="changePrice"></price-range> -->
                <!-- <list-sort @on-sort="changeSort" :proNum="proNum"></list-sort> -->
                <div class="list-detail">
                    <ul class="cle">
                        <li v-for="item in listData" class="product-item">
                          <router-link :to="'/app/home/productDetail/'+item.id" target="_blank" class="productitem">
                            <div class="product-info">
                              <span class="productimg">
                                <img width="150" height="150" :title="item.productname" :alt="item.productname" :src="item.goodsFrontImage" style="display: block;">
                              </span>
                              <div class="text-info">
                                <h1 class="productname" style="font-size: 18px; width: 500px; height: 80px;">{{item.name}}</h1>

                                <h1 >
                                    <b style="color:#c81623">￥{{item.shopPrice}}元</b>
                                  </h1>
                                <h2 class="salerow">销量：<span class="sales">{{item.soldNum}}</span>件 </h2>
                              </div>
                            </div>
                            
                          </router-link>
                        </li>
                      </ul>
                      
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    // 产品列表
    import productList from './product-list/productList';
    // 左侧列表导航
    import listNav from './list-nav/listNav';;
    // 翻页
    import page from './page/page';
    // 当前位置(这个有点问题)
    import currentLoc from './current-loc/current-loc';

    import { getCategoryByID,getGoodsByBrandId,getCategory, searchGoods,getGoods,getSubCategory ,getCateGoods} from '../../api/api'
    export default {
        data () {
            return {
                curPage: 1, // 页码
                c: '', // 商品种类(品牌或分类)
                listData: [],
                cateMenu: {}, //菜单列表
                isObject:true,
                ordering: '-add_time',
                proNum: 0, //商品数量
                curLoc: {}, //当前位置
                priceRange: [], //价格区间
                pricemin: '', //价格最低
                pricemax: '', //价格最高
                pageType:'list',
                searchWord:'',
                currentCategoryName:'',
                updateMenu:true,
                getCate:{
                    id:0,
                },
                getGoods:{
                    page:1,
                    size:20
                },
                getOne:{
                    id:0
                },
                getGoodReq:{
                    page:1,
                    size:50,
                    id:0
                },
                search:{
                  keyword:'',
                },
            };
        },
        components: {
            'product-list': productList,
            'list-nav': listNav,
            'Page': page,
            'current-loc': currentLoc,

        },
        props: {

        },
        created () {
            console.log("heeeerererere")
            this.getAllData();
        },
        watch: {
            "$route": "getAllData"

        },
        computed: {
            totalPage(){
                return  Math.ceil(this.proNum/12)
            }
        },
        methods: {
            getAllData () {
                console.log(this.$route.params)
                if(this.$route.params.id){
                    this.c = this.$route.params.id;
                    console.log("param.id",this.c)
                    this.updateMenu = true
                    this.getMenu(this.c); // 获取左侧菜单列表
                }else{
                    // this.getMenu(null); // 获取左侧菜单列表
                    console.log("paramsid")
                    this.pageType = 'search'
                    this.searchWord = this.$route.params.keyword;
                }

                // this.getCurLoc(); // 获取当前位置
                this.getListData(); //获取产品列表
            },
            getListData() {
                if(this.pageType=='search'){
                    this.search.keyword=this.searchWord;
                    searchGoods(this.search).then((response)=> {
                    this.listData = response.data.data.list;
                    this.proNum = response.data.data.total;
                  }).catch(function (error) {
                    console.log(error);
                  });
                }else {
                    this.getGoodReq.id=this.c;
                  getCateGoods(this.getGoodReq).then((response)=> {                    
                    this.listData = response.data.data.list;
                    console.log("getCateGood",this.listData);
                    this.proNum = response.data.data.total;
                  }).catch(function (error) {
                    console.log(error);
                  });
                }

            },
            getGoodsByBrand(id) {
                this.getGoodReq.id=id;
                getGoodsByBrandId(this.getGoodReq).then((response)=> {                    
                    this.listData = response.data.data.list;
                    console.log("getGoodsByBrandid",this.listData);
                    this.proNum = response.data.data.total;
                  }).catch(function (error) {
                    console.log(error);
                  });
            },
            getMenu(id) {
                if(id != null){
                    this.getCate.id=id
                    console.log("getMenu",id)
                    getSubCategory(this.getCate).then((response)=> {
                    this.cateMenu = response.data.data.list;
                    console.log("cateMenueeeee",this.cateMenu)
                    this.currentCategoryName = response.data.data.name
                    if(this.updateMenu) {

                        this.curLoc = {
                            name: response.data.name,
                            id: response.data.id
                        }
                        this.updateMenu = false
                    }
                  }).catch(function (error) {
                    console.log(error);
                  });
                }else {
                  getCategory({}).then((response)=> {
                    this.cateMenu = response.data;
                    this.isObject = false
                  }).catch(function (error) {
                    console.log(error);
                  });
                }

            },

            getCurLoc () { // 当前位置
                this.$http.post('/currentLoc', {
                    params: {
                        proType: this.type, //商品类型
                    }
                }).then((response)=> {

                    this.curLoc = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },
           
            changeMenu (id) {
                console.log("changgeMenu",id)
                this.getGoodsByBrand(id);
            },
            pagefn(value){//点击分页
                this.curPage = value.page;
                console.log("curpage",this.curPage)
                this.getListData(curPage)
            }
        }
}
</script>
<style  lang='scss'>
.maincon {
    width: 970px;
    float: right;
}

html {
    background:#fafafa;
    color:#333;
    _background-attachment:fixed
}
html.isPhone {
    min-width:1196px
}
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,select,textarea,th,td {
    margin:0;
    padding:0
}
body,button,input,select,textarea {
    font:12px/1.5 "Microsoft YaHei",Tahoma,Helvetica,Arial,simsun
}
address,cite,dfn,em,var,i {
    font-style:normal
}
ul,ol {
    list-style:none
}
fieldset,img {
    border:0
}
h1 {
    font-size:18px
}
h2 {
    font-size:14px;
    font-weight:bold
}
h3 {
    font-size:14px;
    font-weight:400
}
h4,h5 {
    font-size:12px;
    font-weight:400
}
input,textarea,button,select {
    font-size:12px;
    outline:0;
    resize:none;
    color:#333
}
button {
    cursor:pointer
}
table {
    border-collapse:collapse;
    border-spacing:0
}
.clear {
    clear:both;
    height:0;
    font-size:0;
    line-height:0;
    overflow:hidden
}
.cle:after,.clearfix:after,.clear_f:after,.cle_float:after {
    visibility:hidden;
    display:block;
    font-size:0;
    content:'\20';
    clear:both;
    height:0
}

.fl {
    float:left
}
.fr {
    float:right
}
a {
    text-decoration:none;
    color:#333;
    -webkit-transition:color .2s;
    -moz-transition:color .2s;
    -o-transition:color .2s;
    -ms-transition:color .2s;
    transition:color .2s
}
a:hover {
    color:#c81623
}
a:focus,area:focus {
    outline:0
}
::selection {
    background:#c81623;
    color:#fff
}
canvas {
    -ms-touch-action:double-tap-zoom
}
@font-face {
    font-family:'lizi';
    src:url('http://at.alicdn.com/t/font_1412819191_5742776.eot');
    src:url('http://at.alicdn.com/t/font_1412819191_5742776.eot?#iefix') format('embedded-opentype'),url('http://at.alicdn.com/t/font_1412819191_5742776.woff') format('woff'),url('http://at.alicdn.com/t/font_1412819191_5742776.ttf') format('truetype'),url('http://at.alicdn.com/t/font_1412819191_5742776.svg#iconfont') format('svg')
}
.here{padding:5px 0;color:#bbb}
.here i.iconfont{font-size:14px}
.here h1{display:inline;font-size:12px;color:#333;font-weight:normal}
.sidebar{width:214px;float:left}
.cate-menu{margin-bottom:12px;background-color:#fff}
.cate-menu h3{border:1px solid #ddd}
.cate-menu h3 a{display:block;height:26px;padding:14px 0 12px 12px;background-color:#fff;position:relative}
.cate-menu h3 a:hover{background-color:#fafafa;text-decoration:none}
.cate-menu h3 strong{font-size:18px;color:#333;letter-spacing:3px;font-weight:400}
.cate-menu h3 i{position:absolute;right:10px;top:23px;color:#999;font-size:12px}
.cate-menu dl{border:1px solid #eee;padding:10px 0}
.cate-menu dt{font-size:14px;padding:5px 0 5px 12px;color:#888}
.cate-menu dd a{display:block;padding:7px 0 7px 27px;background-color:#fff}
.cate-menu dd a:hover{background-color:#fafafa;text-decoration:none}
.cate-menu dd a i{color:#bbb;margin-left:5px}
.cate-menu dd.current a,.cate-menu dd.current a:hover{color:#c81623;background-color:#f1f1f1}


html {

    color:#333;
    _background-attachment:fixed
}

body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,select,textarea,th,td {
    margin:0;
    padding:0
}
body,button,input,select,textarea {
    font:12px/1.5 "Microsoft YaHei",Tahoma,Helvetica,Arial,simsun
}
address,cite,dfn,em,var,i {
    font-style:normal
}
ul,ol {
    list-style:none
}
fieldset,img {
    border:0
}
h1 {
    font-size:18px
}
h2 {
    font-size:14px;
    font-weight:bold
}
h3 {
    font-size:14px;
    font-weight:400
}
h4,h5 {
    font-size:12px;
    font-weight:400
}
input,textarea,button,select {
    font-size:12px;
    outline:0;
    resize:none;
    color:#333
}
button {
    cursor:pointer
}
table {
    border-collapse:collapse;
    border-spacing:0
}
.clear {
    clear:both;
    height:0;
    font-size:0;
    line-height:0;
    overflow:hidden
}
.cle:after,.clearfix:after,.clear_f:after,.cle_float:after {
    visibility:hidden;
    display:block;
    font-size:0;
    content:'\20';
    clear:both;
    height:0
}
.cle,.clearfix,.clear_f,.cle_float {
    
}
.fl {
    float:left
}
.fr {
    float:right
}
a {
    text-decoration:none;
    color:#333;
    -webkit-transition:color .2s;
    -moz-transition:color .2s;
    -o-transition:color .2s;
    -ms-transition:color .2s;
    transition:color .2s
}
a:hover {
    color:#c81623
}
a:focus,area:focus {
    outline:0
}
::selection {
    background:#c81623;
    color:#fff
}
canvas {
    -ms-touch-action:double-tap-zoom
}


a.productitem {
    display:block;
}
a.productitem span {
    padding:0 10px
}
a.productitem span.productimg {
    display:block;
    /*background:url(images/loading-16.gif) center center no-repeat;*/
    margin-bottom:10px;
    padding:0
}
a.productitem span.productimg img {
    vertical-align:top;
    display:block
}
a.productitem span.nalaprice {
    color:#c81623;
    font-size:14px;
    display:block
}
a.productitem span.productname {
    display:block;
    height:35px;
    line-height:16px;
    overflow:hidden;
    color:#666
}
a.productitem span.description {
    display:block;
    height:16px;
    overflow:hidden;
    color:#999
}
a.productitem span.salerow {
    display:block;

    color:#999
}
a.productitem span.sales {
    color:#c81623;
    padding:0 2px
}
a.productitem span.xszk {
    padding-left:55px;
    /*background:url(images/xsdz-ico.png?0226) 10px center no-repeat*/
}
a.productitem span.price {
    display:none
}
a.productitem:hover {
    text-decoration:none;
    border-color:#c81623
}

.productlist{width:970px;overflow:hidden}
.productlist ul{margin-right:-20px}
.productlist li{width:232px;height:342px;position:relative;float:left;margin:0 14px 14px 0;overflow:hidden;display:inline}
.productlist li a.productitem span.productimg img{width:230px;height:230px}

.product-item {
  display: flex;
}

.productitem {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none; /* 取消链接默认样式 */
}

.product-info {
  display: flex;
}

.text-info {
  margin-left: 10px; /* 调整文字和图片之间的间距 */
}

/* 其他样式保持不变 */


</style>
