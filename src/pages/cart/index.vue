<template>
  <div>
    <div class="cart-top" v-if="address">
      <div class="receive">
        <div class="name">收货人: {{address.userName}}</div>
        <div class="phonen-number">{{address.telNumber}}</div>
      </div>
      <div class="address">收货地址: {{detailAddress}}</div>
      <img src="../../../static/images/cart_border@2x.png" class="address-bar" mode="aspectFill">
    </div>
    <!-- 新增收货人信息 -->
    <div @click="getAddress" class="add_addresss" v-else>
      <text>新增收货人</text>
      <span></span>
    </div>

    <div class="list-title">优购生活馆</div>
    <!-- 商品列表信息 -->
    <div class="ware-list">
      <div class="ware-item" v-for="item in cartList" :key="item.goods_id">
        <!-- 左侧按钮checkbox -->
        <div class="choice-button">
          <icon
            @click="selectItem(item.goods_id)"
            :color="item.checked?'red':'#eee'"
            type="success"
            size="18"
          />
        </div>
        <!-- 右侧商品信息 -->
        <div class="ware-content">
          <!-- 左侧图片 -->
          <navigator class="ware-image">
            <img :src="item.goods_small_logo" mode="aspectFill">
          </navigator>
          <!-- 右侧商品信息 -->
          <div class="ware-info">
            <!-- 商品名称 -->
            <navigator class="ware-title">{{item.goods_name}}</navigator>
            <!-- 商品价格和数量变更 -->
            <div class="ware-info-btm">
              <!-- 商品价格 -->
              <div class="ware-price">
                <span>￥</span>
                {{item.goods_price}}
              </div>
              <!-- 数量变更 -->
              <div class="calculate">
                <div class="rect" @click="subHandle(item.goods_id)">-</div>
                <div class="number">{{item.num}}</div>
                <div class="rect" @click="item.num+=1">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cart-total">
      <!-- 左侧CheckBox -->
      <div class="total-button">
        <icon @click="selectAll" :color="isAll?'red':'#eee'" type="success" size="18"/>全选
      </div>
      <!-- 中间的价格 -->
      <div class="total-center">
        <div class="total-price">
          合计：
          <text class="colorRed">
            <text>￥{{totalPrice}}</text>
          </text>
        </div>
        <div class="price-tips">包含运费</div>
      </div>
      <!-- 右侧结算按钮 -->
      <div @click='topay' class="accounts">结算</div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
      address: "",
      product: {}
    };
  },
  computed: {
    totalPrice (){
        let sum = 0
        for(let key in this.product){
            let p = this.product[key]
            if(p.checked){
                sum += p.goods_price * p.num
            }
        }
        return sum
    },
    isAll(){
        let flag=true
        for(let key in this.product){
            let p = this.product[key]
            flag = flag && p.checked
        }
        return flag
    },
    detailAddress() {
      let { provinceName, cityName, countyName, detailInfo } = this.address;
      return `${provinceName}${cityName}${countyName}${detailInfo}`;
    },
    cartList() {
      let list = [];
      for (let key in this.product) {
        let product = this.product[key];
        list.push(product);
      }
      return list;
    }
  },
  methods: {
    topay(){
        let total = this.totalPrice
        if(total == 0){
            mpvue.showToast({
                title:'请选择商品',
                icon:'success'
            })
            return;
        }
        let token = mpvue.getStorageSync('token')
        if(!token){
            mpvue.navigateTo({
                url:'/pages/auth/main'
            })
        }
    },
    subHandle(id){
        let p = this.product[id]
        if(p.num >1){
            p.num -=1
        }else{
            this.$delete(this.product,id)
        }
    },  
     // subHandle (id) {
    //   // 实现商品减一操作
    //   let p = this.products[id];
    //   if(p.num > 1) {
    //     p.num -= 1;
    //   } else {
    //     // 删除该元素：把原有数据复制一份，但是排除当前id
    //     let result = {};
    //     for(let key in this.products) {
    //       let p = this.products[key];
    //       // 排除当前商品
    //       if(id != p.goods_id) {
    //         result[key] = this.products[key];
    //       }
    //     }
    //     this.products = result;
    //   }
    // },
    // subHandle(id){
    //     let flag = false
    //     for(let key in this.product){
    //         let p = this.product[key]
    //         if(p.num>1){
    //             p.num -=1
    //         }else if(p.num == 1){
    //             flag = true
    //         }
    //         break
    //     }
    //     let result = {}
    //     for(let key in this.product){
    //         let p = this.product[key]
    //         if(id!=p.goods_id && flag){
    //             result[key] = this.product[key]
    //         }
    //     }
    //     this.product =result
    // },
    selectAll(){
        let flag = this.isAll
        for(let key in this.product){
            let p = this.product[key]
            p.checked = !flag
        }
    },
    selectItem(id) {
      for (let key in this.product) {
        if (id == key) {
          let p = this.product[key];
          p.checked = !p.checked;
          break;
        }
      }
    },
    getAddress() {
      let that = this;
      mpvue.chooseAddress({
        success(res) {
          that.address = res;
          console.log(res);
        }
      });
    }
  },
  onShow() {
    this.product = mpvue.getStorageSync("mycart");
  },
  onHide(){
    mpvue.setStorageSync('mycart',this.product)
  }
};
</script>

<style  scoped lang='scss'>
@import "main.scss";
</style>
