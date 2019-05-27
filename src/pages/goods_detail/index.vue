<template>
  <div>
    <swiper indicator-dots>
      <swiper-item v-for="(item, index) in detail.pics" :key="index">
        <image :src="item.pics_big_url" class="slide-image" mode="aspectFill"/>
      </swiper-item>
    </swiper>

    <div class="goods-info" >
      <div class="goods-price">
        ￥ {{detail.goods_price}}
      </div>
      <div class="goods-title">
        <h4>{{detail.goods_name}}</h4>
        <div class="goods-star">
          <span class="iconfont icon-shoucang"></span>
          <p>分享</p>
          <button open-type='share' class="share-btn">分享</button>
        </div>
      </div>
    </div>

    <div class="goods-detail">
      <div class="goods-detail-title">
        商品详情
      </div>
      <div v-html='detail.goods_introduce'></div>
    </div>

    <div class="footer">
      <button class="contact"></button>
      <div class="footer-left">
        <span class="iconfont icon-kefu"></span>
        <p>联系客服</p>
      </div>
      <navigator url='/pages/cart/main' open-type="switchTab" class="footer-left">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </navigator>
      <div @click='addCart' class="footer-right">
        加入购物车
      </div>
      <div @click='toBuy' class="footer-right">
        立即购买
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
      goodsId: null,
      detail: {}
    };
  },
  methods: {
    async loadData() {
      let res = await request("goods/detail", "get", {
        goods_id: this.goodsId
      });
      this.detail = res.data.message;
      // console.log(this.detail)
    },
    addCart(){
        let cart = mpvue.getStorageSync('mycart') || {}
        this.detail.checked = false
        this.detail.num = 1
        cart[this.detail.goods_id] = this.detail
        mpvue.setStorageSync('mycart',cart)
        mpvue.showToast({
            title:'添加成功',
            icon:'success'
        })
    },
    toBuy(){
        this.addCart()
        mpvue.switchTab({
            url:'/pages/cart/main'
        })
    }
  },
  onLoad(param) {
    this.goodsId = param.goodsId;
    this.loadData();
  }
};
</script>

<style  scoped lang='scss'>
@import "main.scss";
</style>
