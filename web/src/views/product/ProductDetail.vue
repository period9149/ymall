<template>
  <div class="productDetail">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe @change="onChange" class="my-swipe">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
    </van-swipe>
    <h2 class="m-3">{{ productInfo.productTitle }}</h2>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0,
      productInfo: {}
    }
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    async getProductInfo(){
      const id = this.$router.currentRoute.params.id
      const res = await this.$http.get('/products/' + id)
      this.productInfo = res.data.data
      console.log(this.productInfo)
    }
  },
  created() {
    this.getProductInfo()
  },
}
</script>
<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 250px;
    text-align: center;
    background-color: #39a9ed;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>