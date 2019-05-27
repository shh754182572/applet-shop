<template>
  <div>
    <div class="search">
      <div class="serch-content">
        <div class="search-input">
          <icon type="search" size="16"/>
          <input
            @confirm="saveKeyword"
            @input="keywordSearch"
            v-model="keyword"
            placeholder="请输入关键字"
          >
        </div>
        <button @click="cancelSearch" v-if="keyword" class="cancel">取消</button>
        <div class="search-modal">
          <div :key="item.goods_id" v-for="item in kwList" class="search-item">{{item.goods_name}}</div>
        </div>
      </div>
    </div>
    <div class="history">
      <h4>搜索历史</h4>
      <icon @click='clearKeyword' type="clear" size="16"/>
    </div>
    <div class="history-list">
  <div :key='index' v-for='(item,index) in historyKeyword' class="history-item">
    <navigator :url="'/pages/search_list/main?query='+item">
     {{item}}
    </navigator>
  </div>
</div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
      keyword: "",
      kwList: [],
      timer: null,
      isLoading: false,
      historyKeyword: mpvue.getStorageSync("hkw") || []
    };
  },
  methods: {
    cancelSearch() {
      this.keyword = "";
      this.kwList = [];
    },
    saveKeyword() {
      this.historyKeyword.unshift(this.keyword);
      this.historyKeyword =[...new Set(this.historyKeyword)]
      mpvue.setStorageSync("hkw", this.historyKeyword);
      mpvue.navigateTo({
        url:'/pages/search_list/main?query='+this.keyword
      })
    },
    clearKeyword(){
        mpvue.clearStorageSync();
        this.historyKeyword = []
    },
    keywordSearch() {
      let that = this;
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      setTimeout(async function() {
        let res = await request("goods/qsearch", "get", {
          query: that.keyword
        });
        that.kwList = res.data.message;
        that.isLoading = false;
      }, 1000);
    }
    // keywordSearch() {

    //     let that = this
    //     clearTimeout(that.timer)
    //     this.timer = setTimeout(async function(){
    //         let res = await request("goods/qsearch", "get", {
    //             query: that.keyword
    //         });
    //         this.kwList = res.data.message;
    //     },1000)

    // }
  }
};
</script>

<style scoped lang='scss'>
@import "main.scss";
</style>
