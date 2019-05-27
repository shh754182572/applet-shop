<template>
  <div>
    <!-- 搜索 -->
    <search-bar></search-bar>

    <!-- 菜单 -->
    <div class="content">
      <div class="left">
        <div
          :class="{active:currentId == item.cat_id}"
          @click="changeMenu(item.cat_id)"
          :key="item.cat_id"
          v-for="item in cates"
          class="menu-item"
        >{{item.cat_name}}</div>
      </div>
      <!-- <div class="right">
        <div class="brand-item" v-for='k in rightData' :key='k.cat_id'>
          <div class="brand-title">{{k.cat_name}}</div>
          <div class="brand-list">
            <div class="brand" v-for='(j,i) in k.children' :key='j.cat_id'>
              <img :src="j.cat_icon" alt=""/>
              <p>{{j.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>-->
      <div class="right">
        <!-- 右侧二级分类列表 -->
        <div :key="second.cat_id" v-for="second in rightData" class="brand-item">
          <!-- 二级分类标题 -->
          <div class="brand-title">{{second.cat_name}}</div>
          <!-- 三级分类列表 -->
          <div class="brand-list">
            <!-- 三级分类的条目 -->
            <!-- mpvue的一个bug:必须指定索引，不可以是index  -->
            <div :key="brand.cat_id" v-for="(brand,i) in second.children" class="brand">
              <img :src="brand.cat_icon" mode="aspectFill">
              <p>{{brand.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../../components/search";
import Request from "../../utils/request.js";
export default {
  data() {
    return {
      cates: [],
      currentId: 1
    };
  },
  methods: {
    async cateData() {
      let cateRes = await Request("categories");
      // console.log(cateRes)
      this.cates = cateRes.data.message;
    },
    changeMenu(id) {
      this.currentId = id;
    }
  },
  created() {
    this.cateData();
  },
  computed: {
    rightData() {
      let ret = this.cates.filter(item => {
        return item.cat_id == this.currentId;
      });
      let rd = ret[0].children;
      return rd;
    }
  },
  components: {
    "search-bar": Search
  }
};
</script>

<style scoped lang="scss">
@import "main.scss";
</style>
