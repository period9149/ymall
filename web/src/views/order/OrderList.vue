<template>
  <div class="orderList">
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="activeName" @click="getOrders()">
      <van-tab title="全部" name="a" class="my-2">
        <van-card
          v-for="(item, index) in orders"
          :key="index"
          :price="item.order_pay" 
          :desc="item.orderModel"
          :title="item.orderProduct"
          :thumb="item.orderImage"
        >
          <template #footer>
            <van-button size="small" @click="toDetail(item.order_id)">查看详情</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待支付" name="b">
        <van-card
          v-for="(item, index) in orders"
          :key="index"
          :price="item.order_pay" 
          :desc="item.orderModel"
          :title="item.orderProduct"
          :thumb="item.orderImage"
        >
          <template #footer>
            <van-button size="small" @click="toDetail(item.order_id)">查看详情</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待收货" name="c">
        <van-card
          v-for="(item, index) in orders"
          :key="index"
          :price="item.order_pay" 
          :desc="item.orderModel"
          :title="item.orderProduct"
          :thumb="item.orderImage"
        >
          <template #footer>
            <van-button size="small" @click="toDetail(item.order_id)">查看详情</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="已收货" name="d">
        <van-card
          v-for="(item, index) in orders"
          :key="index"
          :price="item.order_pay" 
          :desc="item.orderModel"
          :title="item.orderProduct"
          :thumb="item.orderImage"
        >
          <template #footer>
            <van-button size="small" @click="toDetail(item.order_id)">查看详情</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

export default {
  name: 'OrderList',
  data() {
    return {
      activeName: 'b',
      orders: []
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push('/user')
    },
    getType(){
      this.activeName = this.$router.currentRoute.params.type
    },
    async getProductName(id){
      const res = await this.$http.get('/products/' + id)
      return res.data.data.productTitle
    },
    async getProductImage(id){
      const res = await this.$http.get('/products/' + id)
      return res.data.data.productImage
    },
    async getModelName(id){
      const res = await this.$http.get('/models/' + id)
      return res.data.data.modelContent
    },
    async getOrders(){
      if(this.activeName == 'a' || this.activeName == 'b' || this.activeName == 'd'){
        var obj = {
          'a': '',
          'b': 0,
          'd': 3
        }
        const res = await this.$http.get('/searchOrderByStatus?status=' + obj[this.activeName])
        const orders = res.data.data
        for(var i in orders){
          orders[i].orderProduct = await this.getProductName(orders[i].order_product)
          orders[i].orderModel = await this.getModelName(orders[i].order_model)
          orders[i].orderImage = await this.getProductImage(orders[i].order_product)
        }
        this.orders = orders
      }else{
        const res1 = await this.$http.get('/searchOrderByStatus?status=1')
        const res2 = await this.$http.get('/searchOrderByStatus?status=2')
        const orders = [...res1.data.data, ...res2.data.data]
        for(var j in orders){
          orders[j].orderProduct = await this.getProductName(orders[j].order_product)
          orders[j].orderModel = await this.getModelName(orders[j].order_model)
          orders[j].orderImage = await this.getProductImage(orders[j].order_product)
        }
        this.orders = orders
      }
    },
    toDetail(id){
      this.$router.push('/orderDetails/' + id)
    }
  },
  created() {
    this.getType()
    this.getOrders()
  },
}
</script>
<style>

</style>