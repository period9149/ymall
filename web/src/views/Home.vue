<template>
  <div class="home">
    <div style="overflow-y: scroll">
      <router-view></router-view>
    </div>
    <div style="position: fixed; bottom: 0; height: 5rem;">
      <van-tabbar v-model="active">
        <van-tabbar-item replace to="/" icon="goods-collect-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/categories" icon="qr">分类</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="contact">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      active: 0
    }
  },
}
</script>
<style>
  .home::after{
    content : '';
    height : 50px; 
    display :block;
  }
</style>
