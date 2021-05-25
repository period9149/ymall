<template>
  <div class="cart">
    <van-nav-bar title="购物车"/>
    <van-swipe-cell>
      <van-card
        v-for="(item, index) in cart"
        :key="index"
        :price="item.cart_price"
        :desc="item.cart_model_content"
        :title="item.cart_title"
        :thumb="item.cart_image"
      >
        <template #footer>
          <van-stepper v-model="item.cart_count" theme="round" button-size="22" />
        </template>
      </van-card> 
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
    <!-- <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>  -->
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      checked: false,
      value: 1,
      cart: {}
    }
  },
  methods:{
    onSubmit(){

    },
    async getCart(){
      const res = await this.$http.get('/searchCartsByUserId?userId=' + this.$store.getters.getUser.userId)
      const cart = res.data.data
      for(var i in cart){
        const res1 = await this.$http.get('/products/' + cart[i].cart_product)
        cart[i].cart_image = res1.data.data.productImage
        cart[i].cart_title = res1.data.data.productTitle
        const res2 = await this.$http.get('/models/' + cart[i].cart_model)
        cart[i].cart_price = res2.data.data.modelPrice
        cart[i].cart_model_content = res2.data.data.modelContent
      }
      this.cart = cart
    }
  },
  created() {
    this.getCart()
  },
}
</script>
<style>
  .goods-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%;
  }
</style>