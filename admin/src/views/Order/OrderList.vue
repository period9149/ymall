<template>
  <div class="OrderList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Order</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Input suffix="ios-search" placeholder="请输入..." style="width: auto; margin-bottom: 10px;" />
        <Table border :columns="columns" :data="orders"></Table>
        <Page :total="100" show-elevator align="center" style="margin-top: 10px;"/>
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
            key: 'order_id'
          },
          {
            title: '用户名',
            key: 'order_user',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.order_user)
              ]);
            }
          },
          {
            title: '商品名称',
            key: 'order_product'
          },
          {
            title: '商品型号',
            key: 'order_model'
          },
          {
            title: '收货地址',
            key: 'order_address'
          },
          {
            title: '订单状态',
            key: 'order_status'
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
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
                ]);
            }
          }
        ],
        orders: []
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '订单信息',
          content: `
            <p class='info'>订单编号：${this.orders[index].order_id}</p>
            <p class='info'>用户名：${this.orders[index].order_user}</p>
            <p class='info'>商品名称：${this.orders[index].order_product}</p>
            <p class='info'>商品型号：${this.orders[index].order_model}</p>
            <p class='info'>收货地址：${this.orders[index].order_address}</p>
            <p class='info'>订单状态：${this.orders[index].order_status}</p>
            
          `
        })
      },
      remove (index) {
        this.orders.splice(index, 1);
      },
      getOrdersData(){
        var order = [
          {
            order_id: '40001',
            order_user: '灯光也暗了丶',
            order_product: 'iPhone 7',
            order_model: '黑色 128G',
            order_address: '湖北省武汉市华中农业大学',
            order_status: '已发货'
          },
          {
            order_id: '40002',
            order_user: '灯光也暗了丶',
            order_product: 'MacBook Pro',
            order_model: '银色 256G',
            order_address: '湖北省武汉市华中农业大学',
            order_status: '未发货'            
          },
        ]
        this.orders = order
      }
    },
    created() {
      this.getOrdersData()
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

