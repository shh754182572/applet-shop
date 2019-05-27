<template>
  <div>
    <!-- 搜索 -->
    <search-bar></search-bar>

    <!-- 轮播图 -->
    <swiper indicator-dots="indicator">
      <swiper-item v-for="(item,index) in imgUrls" :key="index">
        <image :src="item" class="slide-image"/>
      </swiper-item>
    </swiper>

    <!-- 菜单 -->
    <div class="menu">
      <img :key="index" v-for="(item,index) in menus" :src="item.image_src"/>
    </div>

    <!-- 楼梯导航 -->
    <div class="floors" v-for="(item,index) in getImgs" :key="index">
      <div class="floor_title">
        <img :src="item.floor_title.image_src"/>
      </div>
      <div class="content">
        <div class="left">
          <img :src="item.leftImg">
        </div>
        <div class="right">
          <img :src="i.image_src" alt v-for="(i,id) in item.product_list" :key="id"/>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <div @click="toTop" v-if="isShow" class="toTop">
      ︿
      <p>顶部</p>
    </div>
  </div>
</template>

<script>
import Search from "../../components/search";

import Request from "../../utils/request.js";
export default {
  data() {
    return {
      isShow: false,
      indicator: true,
      imgUrls: [
        // "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
        // "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640",
        // "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
      ],
      menus: [],
      floors: [],
    };
  },

  methods: {
    toTop() {
      mpvue.pageScrollTo({
        scrollTop: 0
      })
    },
    async initData(){
      let swiperRes = await Request("home/swiperdata");
      let imgs = swiperRes.data.message.map(item => {
        return item.image_src;
      });
      this.imgUrls = imgs;

      let menusRes = await Request("home/catitems");
      this.menus = menusRes.data.message;

      let floorsRes = await Request("home/floordata");
      this.floors = floorsRes.data.message;
    }
  },
  components: {
    "search-bar": Search
  },
  created() {
    // let that = this;

    // let swiperRes = await Request("home/swiperdata");
    // let imgs = swiperRes.data.message.map(item => {
    //   return item.image_src;
    // });
    // this.imgUrls = imgs;
    // Request('home/swiperdata')
    // .then(res=>{
    //   let imgs = res.data.message.map(item => {
    //       return item.image_src;
    //     });
    //     this.imgUrls = imgs;
    // })
    // mpvue.request({
    //   url: "https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata",
    //   success: function(res) {
    //     // console.log(res)
    //     that.imgUrls = res.data.message;
    //     let imgs = res.data.message.map(item => {
    //       return item.image_src;
    //     });
    //     that.imgUrls = imgs;
    //   }
    // });

    // let menusRes = await Request("home/catitems");
    // this.menus = menusRes.data.message;
    // Request('home/catitems')
    // .then(res=>{
    //   this.menus = res.data.message;
    // })
    // mpvue.request({
    //   url: "https://www.zhengzhicheng.cn/api/public/v1/home/catitems",
    //   success: function(res) {
    //     console.log(res);

    //     that.menus = res.data.message;
    //     console.log(that.menus)
    //   }
    // });

    // let floorsRes = await Request("home/floordata");
    // this.floors = floorsRes.data.message;
    
    this.initData()
  },
  computed: {
    getImgs() {
      return this.floors.map(item => {
        let imgs = item.product_list.filter((img, index) => {
          return index > 0;
        });
        item.leftImg = item.product_list[0].image_src;
        item.product_list = imgs;
        return item;
      });
    },

    
  },
  onPageScroll(event) {
      this.isShow = event.scrollTop > 50;
    },
  onPullDownRefresh(){
    this.initData();
  }
};
</script>

<style scoped lang='scss'>
  @import 'main.scss'
</style>
