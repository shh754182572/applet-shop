<template>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">点击授权</button>
</template>

<script>
import request from '../../utils/request.js'
export default {
    methods: {
    getUserInfo (e) {
      // 获取用户的授权信息
      let {detail} = e.mp;
      // 登录微信平台
      mpvue.login({
        success (res) {
          // 登录自己的后台接口，需要微信的授权数据来登录
          let param = {
            code: res.code,
            encryptedData: detail.encryptedData,
            iv: detail.iv,
            rawData: detail.rawData,
            signature: detail.signature
          };
          // 调用接口登录，并且得到返回的token
          request('users/wxlogin', 'post', param)
            .then(res=>{
              // 登录成功后，获取服务器返回的token
              let token = res.data.message.token;
              // 把token保存在本地缓存
              mpvue.setStorageSync('mytoken', token);
              // 跳回到购物车页面
              mpvue.navigateBack({
                // 表示跳回一个页面
                delta: 1
              });
            })
        }
      });

    }
  }
}
</script>

<style  scoped>
</style>
