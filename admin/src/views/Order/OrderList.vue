<template>
  <div class="OrderList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>订单列表</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Input suffix="ios-search" v-model="info" search @on-change="search" placeholder="请输入..." style="width: auto; margin-bottom: 10px;" />
        <Table border :columns="columns" :data="orders"></Table>
        <Page :total="total" :current="page" :page-size="pageSize" @on-change="getOrdersData" show-elevator align="center" style="margin-top: 10px;"/>
      </Content>
    </Layout>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: '订单编号',
            key: 'orderId'
          },
          {
            title: '用户名',
            key: 'orderUser',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.orderUser)
              ]);
            }
          },
          {
            title: '商品名称',
            key: 'orderProduct'
          },
          {
            title: '商品型号',
            key: 'orderModel'
          },
          {
            title: '订单状态',
            key: 'orderStatus'
          },          
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.index)
                    }
                  }
                }, '修改')
                ]);
            }
          }
        ],
        orders: [],
        page: 1,
        total: 5,
        pageSize: 5,
        info: ''
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '订单信息',
          content: `
            <p class='info'>订单编号：${this.orders[index].orderId}</p>
            <p class='info'>用户名：${this.orders[index].orderUser}</p>
            <p class='info'>商品名称：${this.orders[index].orderProduct}</p>
            <p class='info'>商品型号：${this.orders[index].orderModel}</p>
            <p class='info'>商品数量：${this.orders[index].orderCount}</p>
            <p class='info'>收货地址：${this.orders[index].orderAddress}</p>
            <p class='info'>订单状态：${this.orders[index].orderStatus}</p>
          `
        })
      },
      update (index) {
        const id = this.orders[index].orderId
        this.$router.push('/orderUpdate/'+ id)
      },
      async getUserName(id){
        const res = await this.$http.get('/users/' + id)
        return res.data.data.userName
      },
      async getProductName(id){
        const res = await this.$http.get('/products/' + id)
        return res.data.data.productTitle
      },
      async getModelName(id){
        const res = await this.$http.get('/models/' + id)
        return res.data.data.modelContent
      },
      async getAddressName(id){
        const res = await this.$http.get('/addresses/' + id)
        const address = res.data.data
        return address.addressDetail
      },
      async getOrdersData(page){
        const res = await this.$http.get('/orders?currentPage='+ page)
        const orders = res.data.data.records 
        let orderStatus = {
          '0': '未付款',
          '1': '未发货',
          '2': '运输中',
          '3': '已收货'
        }  
        for(var i in orders) {
          orders[i].orderUser = await this.getUserName(orders[i].orderUser)
          orders[i].orderProduct = await this.getProductName(orders[i].orderProduct)
          orders[i].orderModel = await this.getModelName(orders[i].orderModel)
          orders[i].orderAddress = await this.getAddressName(orders[i].orderAddress)
          orders[i].orderStatus = orderStatus[`${orders[i].orderStatus}`]
        }   
        this.page = page
        this.orders = orders
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      },
      async search(){
        const res = await this.$http.get('/searchOrder?info='+ this.info)
        const orders = res.data.data.records
        let orderStatus = {
          '0': '未付款',
          '1': '未发货',
          '2': '运输中',
          '3': '已收货'
        }  
        for(var i in orders) {
          orders[i].orderUser = await this.getUserName(orders[i].orderUser)
          orders[i].orderProduct = await this.getProductName(orders[i].orderProduct)
          orders[i].orderModel = await this.getModelName(orders[i].orderModel)
          orders[i].orderAddress = await this.getAddressName(orders[i].orderAddress)
          orders[i].orderStatus = orderStatus[`${orders[i].orderStatus}`]
        }   
        this.orders = orders
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      }
    },
    created() {
      this.getOrdersData(1)
    }
  }
</script>
<style>
  .info{
    margin: 20px;
  }
  .infoImg{
    margin-left: 40px;
    height: 100px;
    width: 100px;
  }
</style>

