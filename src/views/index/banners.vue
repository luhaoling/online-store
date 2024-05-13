<template>
  <div class="banner-warp w-max ct bgwh mb30 ovh border-eee" >
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in banners" :key="item.goods">
        <router-link :to="'/app/home/productDetail/'+item.url" target = _blank> <img :src="item.image" width="1200px" height="700px" alt="" /></router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>


<style>
  .banner-warp{
    height:700px;
  }


</style>





<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {bannerGoods} from '../../api/api'

  export default {
    components: {
      swiper,
      swiperSlide,

    },
    data() {

      return {

        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
        },
        banners:[],
        banner:{
        page:1,
        size:5
      }
      }
    },
    methods:{
      getBanner(){
        bannerGoods(this.banner).then((response)=> {
            console.log("品牌",response.data.data.list)
            //跳转到首页页response.body面
            this.banners = response.data.data.list
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created(){
      this.getBanner();
    }

  }

</script>
