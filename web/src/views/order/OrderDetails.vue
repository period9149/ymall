<template>
  <div class="orderList">
    <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-steps :active="active">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <van-card
      class="mb-2"
      :price="order.orderPay"
      :desc="order.orderModel"
      :title="order.orderProductTitle"
      :thumb="order.orderImage"
    >
    </van-card>
    <van-cell :title="'订单编号：' + order.orderId" />
    <van-cell :title="'实付款：￥' + order.orderPay" />
    <van-cell :title="'收货信息：' + order.orderAddress"/> 
  </div>
</template>

<script>

export default {
  name: 'OrderList',
  data() {
    return {
      active: '1',
      order: {}
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push('/orderList/a')
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
    async getAddress(id){
      const res = await this.$http.get('/addresses/' + id)
      const address = res.data.data
      return address.addressProvince + address.addressCity + address.addressCounty + address.addressDetail + ' ' + address.addressReceiver
    },
    async getOrderInfo(){
      const id = this.$router.currentRoute.params.id
      const res = await this.$http.get('/orders/' + id)
      const order = res.data.data
      console.log(order)
      order.orderProductTitle = await this.getProductName(order.orderProduct)
      order.orderModel = await this.getModelName(order.orderModel)
      order.orderImage = await this.getProductImage(order.orderProduct)
      order.orderAddress = await this.getAddress(order.orderAddress)
      this.order = order
      this.active = order.orderStatus
    }
  },
  created() {
    this.getOrderInfo()
  },
}
</script>
<style>

</style>