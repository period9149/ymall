<template>
  <div class="GoodsList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Goods</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <div style="margin-bottom: 10px;">
          <Button type="primary" icon="md-add">添加商品</Button>
          <Input suffix="ios-search" placeholder="请输入..." style="width: auto; margin-bottom: 10px; position: absolute; right: 50px;" />
        </div>
        <Table border :columns="columns" :data="goods"></Table>
        <Page :total="100" show-elevator align="center" style="margin-top: 10px;"/>
      </Content>
      <Modal
        v-model="modal"
        title="修改商品"
        @on-ok="submitUpdate">
        <Form :model="subGoods" label-position="left" :label-width="100" style="margin: 10px 20px;">
          <FormItem label="ID">
            <Input v-model="subGoods.product_id" disabled/>
          </FormItem>
          <FormItem label="商品名称">
            <Input v-model="subGoods.product_title" />
          </FormItem>
          <FormItem label="商品类别">
            <Input v-model="subGoods.product_category" />
          </FormItem>
          <FormItem label="商品价格">
            <Input v-model="subGoods.product_price" />
          </FormItem>
          <FormItem label="商品图片">
            <Input v-model="subGoods.product_image" />
          </FormItem>
          <FormItem label="商品详情">
            <Input v-model="subGoods.product_details" type="textarea"/>
          </FormItem>
          <FormItem label="商品销量">
            <Input v-model="subGoods.product_sold"/>
          </FormItem>                   
        </Form>
      </Modal>
    </Layout>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: 'ID',
            key: 'product_id'
          },
          {
            title: '商品名称',
            key: 'product_title',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.product_title)
              ]);
            }
          },
          {
            title: '商品类别',
            key: 'product_category'
          },
          {
            title: '商品价格',
            key: 'product_price'
          },
          {
            title: '商品图片',
            key: 'product_image',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.product_image
                  },
                  style: {
                    width: '60px',
                    height: '60px'
                  }
                })
              ]);
            }
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
                }, 'Update'),
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
        goods: [],
        subGoods:{},
        modal: false
      }
    },
    methods: {
      show (index) {
        // 根据id去找相应信息
        this.subGoods = this.goods[index]
        this.$Modal.info({
          title: '商品信息',
          content: `
            <p class='info'>ID：${this.subGoods.product_id}</p>
            <p class='info'>商品名称：${this.subGoods.product_title}</p>
            <p class='info'>商品类别：${this.subGoods.product_category}</p>
            <p class='info'>商品价格：${this.subGoods.product_price}</p>
            <p class='info'>商品图片：</p>
            <img src='${this.subGoods.product_image}' class='infoImg'>
            <p class='info'>商品详情：${this.subGoods.product_details}</p>
            <p class='info'>商品销量：${this.subGoods.product_sold}</p>
          `
        })
      },
      update (index) {
        this.subGoods = this.goods[index]
        this.modal = true
      },
      remove (index) {
        this.goods.splice(index, 1);
      },
      getUsersData(){
        var goods = [
          {
            product_id: '30001',
            product_title: 'iPhone 7',
            product_category: '手机',
            product_price: '4000',
            product_image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1531422177,3663112520&fm=26&gp=0.jpg',
            product_details: '测试用数据',
            product_sold: '测试用数据'
          },
          {
            product_id: '30002',
            product_title: 'MacBook Pro 13英寸',
            product_category: '电脑',
            product_price: '10000',
            product_image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607267487956&di=a9064e0cedafb0ffa64e5a4e5da7fe41&imgtype=0&src=http%3A%2F%2F2.zol-img.com.cn%2Fproduct%2F200_640x2000%2F156%2FceqGYae3II.jpg',
            product_details: '测试用数据',
            product_sold: '测试用数据'
          }
        ]
        this.goods = goods
      }
    },
    created() {
      this.getUsersData()
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