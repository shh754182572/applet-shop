<template>
  <div>
    <div class="search">
      <div class="search-input">
        <icon type="search" size="16" color="#999"/>
        {{keyword}}
      </div>
    </div>

    <div class="tabs">
      <div
        @click="changeTab(index)"
        :class="{active: currentIndex === index}"
        :key="index"
        v-for="(item, index) in tabNames"
        class="tab-item"
      >{{item}}</div>
    </div>

    <div class="goods-list">
      <navigator class="goods-item" :url="'/pages/goods_detail/main?goodsId=' + item.goods_id"  :key='item.goods_id' v-for='item in list'>
        <img :src="item.goods_small_logo" mode="aspectFill">
        <div class="goods-right">
          <h4>{{item.goods_name}}</h4>
          <div class="price">
            <span>￥</span>
            {{item.goods_price}}
          </div>
        </div>
      </navigator>
    </div>
    <div class="more" v-if='hasMore'>
      没有更多数据了
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
      currentIndex: 0,
      tabNames: ["综合", "销量", "价格"],
      keyword: "",
      list: [],
      pagenum:1,
      pagesize:5,
      total:0,
      hasMore:false,
      isLoading:false
    };
  },
  methods: {
    changeTab(index) {
      this.currentIndex = index;
    },
    async loadData() {
        if(this.hasMore){
            return;
        }
        if(this.isLoading){
            return;
        }
        this.isLoading=true
      let res = await request("goods/search", "get", {
        query: this.keyword,
        pagenum:this.pagenum,
        pagesize:this.pagesize
      });
    //   this.list = res.data.message.goods;
      this.list = [...this.list,...res.data.message.goods];
      this.pagenum =res.data.message.pagenum
      this.total =res.data.message.total
      if(this.list.length>=this.total){
          this.hasMore =true
      }
      this.pagenum =parseInt(this.pagenum)+1
      this.isLoading = false
    }
  },
  onLoad(param) {
    // console.log(param);
    this.keyword = param.query;
    this.loadData();
  },
  onShow () {
    // 初始化列表数据
    this.list = [];
    this.hasMore = false;
    this.pagenum = 1;
    this.loadData();
  },
  onReachBottom(){
      this.loadData()
  }
};
</script>

<style  scoped lang='scss'>
@import "main.scss";
</style>
