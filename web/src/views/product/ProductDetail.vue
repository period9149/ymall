<template>
  <div class="productDetail bg-white">
    <van-nav-bar
      title="商品详情"
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
      <van-goods-action-button type="warning" text="加入购物车" @click="openCard"/>
      <van-goods-action-button type="danger" text="立即购买" @click="openCard"/>
    </van-goods-action>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @add-cart="onAddCartClicked"
      @buy-clicked="onBuyClicked"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      current: 0,
      productInfo: {},
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '规格', // skuKeyName：规格类目名称
            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [],
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: '2', // 默认价格（单位元）
        stock_num: 999, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: 'https://img01.yzcdn.cn/2.jpg'
      },
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
      const res1 = await this.$http.get('/searchModelsByProductId?productId=' + this.productInfo.productId)
      const models = res1.data.data
      for(var i in models){
        var obj1 = {
          id: models[i].model_id,
          name: models[i].model_content
        }
        this.sku.tree[0].v.push(obj1)
        var obj2 = {
          id: models[i].model_id,
          s1: models[i].model_id,
          price: models[i].model_price * 100,
          stock_num: 999
        }
        this.sku.list.push(obj2)
      }
      this.sku.price = this.productInfo.productPrice 
    },
    openCard(){
      this.show = true
    },
    async onAddCartClicked(data){
      var cart = {
        "cartUser": this.$store.getters.getUser.userId,
        "cartProduct": this.productInfo.productId,
        "cartModel": data.selectedSkuComb.id,
        "cartCount": data.selectedNum
      }
      await this.$http.post('/cart/add', cart)
      this.$toast.success('添加成功！')
    },
    onBuyClicked(data){
      this.$router.push('/productBuy?product=' + this.productInfo.productId + '&model=' + data.selectedSkuComb.id + '&count=' + data.selectedNum)
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