<template>
  <div class="goodsEdit">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>订单列表</BreadcrumbItem>
        <BreadcrumbItem>修改订单信息</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Form :model="orderEdit" label-position="left" :label-width="100" style="margin: 10px 20px; width: 30rem">
          <FormItem label="收货地址">
            <Input v-model="orderEdit.orderAddress" />
          </FormItem>
          <FormItem label="订单状态">
            <Select v-model="orderEdit.orderStatus" style="width:200px">
              <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>    
          <FormItem label="快递单号" v-if="orderEdit.orderStatus == 2">
            <Input v-model="orderEdit.orderExpress" />
          </FormItem>          
          <FormItem>
            <Button type="primary" @click.native="submitEdit">提交</Button>
            <Button style="margin-left: 8px" @click="$router.push('/orderList')">返回</Button>
          </FormItem>    
        </Form>          
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderEdit:{
        orderId: '',
        orderUser: '',
        orderAddress: '',
        orderStatus: '',
        orderProduct: '',
        orderModel: '',
        orderCount: '',
        orderExpress:''
      },
      status:[
        { label: '未付款', value: 0 },
        { label: '未发货', value: 1 },
        { label: '已发货', value: 2 },
        { label: '已签收', value: 3 },
      ] 
    }
  },
  methods: {
    async getOrderInfo(){
      // user不修改了
      let orderId = this.$router.currentRoute.params.id
      const res = await this.$http.get('/orders/' + orderId)
      this.orderEdit = res.data.data  

    },
    async submitEdit(){
      const res = await this.$http.post('/orders/edit', this.orderEdit)
      this.$Message.success(res.data.msg)
      this.$router.push('/orderList')
    }
  },
  created() {
    this.getOrderInfo()
  },
}
</script>
<style>

</style>