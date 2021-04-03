<template>
  <div class="productDetail bg-white">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <img :src="productInfo.productImage" class="photo">
    <h2 class="m-3">{{ productInfo.productTitle }}</h2>
    <div class="d-flex mb-2">
      <div class="flex-1">
        <span class="ml-3 fs-l text-red">￥{{ productRealPrice }}</span>
        <s class="ml-2">￥{{ productInfo.productPrice }}</s>
        <van-tag type="danger" v-if="productInfo.productSale < 98" class="ml-2">特价</van-tag>
      </div>
      <div>
        <span class="mr-3">已售: {{ productInfo.productSold }}</span>
      </div>
    </div>
    <van-cell title="48小时内发货" icon="checked" />
    <van-cell title="7天无理由退换" icon="checked" />
    <van-cell title="商品简介" size="large" :label="productInfo.productDetails" />
    <van-cell title="注意事项" size="large" :label="productInfo.productAttention" />
    <van-cell title="使用说明" size="large" :label="productInfo.productInstructions" />
    <van-goods-action>
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart"/>
      <van-goods-action-button type="danger" text="立即购买" />
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
    },
    async addToCart(){
      this.$toast.success('添加成功！')
    }
  },
  computed: {
    productRealPrice(){
      return this.productInfo.productPrice * this.productInfo.productSale / 100
    }
  },
  created() {
    this.getProductInfo()
  },
}
</script>
<style>
  .photo{
    width: 100%;
    height: 360px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .productDetail::after{
    content : '';
    height : 50px; 
    display :block;
  }
</style>