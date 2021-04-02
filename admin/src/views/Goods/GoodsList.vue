<template>
  <div class="GoodsList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>商品列表</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <div style="margin-bottom: 10px;">
          <Button type="primary" icon="md-add" to="goodsAdd">添加商品</Button>
          <Input suffix="ios-search" v-model="info" @on-change="search" search placeholder="请输入..." style="width: auto; margin-bottom: 10px; position: absolute; right: 50px;" />
        </div>
        <Table border :columns="columns" :data="goods"></Table>
        <Page :total="total" :current="page" :page-size="pageSize" @on-change="getGoodsData" show-elevator align="center" style="margin-top: 10px;"/>
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
            title: 'ID',
            key: 'productId'
          },
          {
            title: '商品名称',
            key: 'productTitle',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.productTitle)
              ]);
            }
          },
          {
            title: '商品类别',
            key: 'productCategory'
          },
          {
            title: '商品价格',
            key: 'productPrice'
          },
          {
            title: '商品图片',
            key: 'productImage',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.productImage
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
                }, '修改'),
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
                }, '删除')
                ]);
            }
          }
        ],
        goods: [], // 商品列表
        total: 1,
        page: 1,
        pageSize: 1,
        info: ''
      }
    },
    methods: {
      show (index) {
        // 根据id去找相应信息
        this.updateGoods = this.goods[index]
        this.$Modal.info({
          title: '商品信息',
          content: `
            <p class='info'>ID：${this.updateGoods.productId}</p>
            <p class='info'>商品名称：${this.updateGoods.productTitle}</p>
            <p class='info'>商品类别：${this.updateGoods.productCategory}</p>
            <p class='info'>商品成本：${this.updateGoods.productCost}</p>
            <p class='info'>商品售价：${this.updateGoods.productPrice}</p>
            <p class='info'>商品折扣：${this.updateGoods.productSale}%</p>
            <p class='info'>商品图片：</p>
            <img src='${this.updateGoods.productImage}' class='infoImg'>
            <p class='info'>商品详情：${this.updateGoods.productDetails}</p>
            <p class='info'>注意事项：${this.updateGoods.productAttention}</p>
            <p class='info'>使用说明：${this.updateGoods.productInstructions}</p>
            <p class='info'>商品销量：${this.updateGoods.productSold}</p>
          `,
          width: '700'
        })
      },
      update (index) {
        const id = this.goods[index].productId
        this.$router.push('/goodsUpdate/'+ id)
      },
      async remove (index) {
        await this.$http.post('/products/delete', { "productId" : this.goods[index].productId })
        this.getGoodsData(this.page)
        this.$Message.success('删除成功！');
      },
      async getCategoryName(id){
        const res = await this.$http.get('/categories/' + id)
        return res.data.data.categoryName
      },
      async getGoodsData(page){
        const res = await this.$http.get('/products?currentPage='+ page)
        const goods = res.data.data.records
        for(var i in goods) 
          goods[i].productCategory = await this.getCategoryName(goods[i].productCategory)       
        this.page = page
        this.goods = goods
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      },
      async search(){
        const res = await this.$http.get('/searchProduct?info=' + this.info)
        const goods = res.data.data.records
        for(var i in goods) 
          goods[i].productCategory = await this.getCategoryName(goods[i].productCategory)       
        this.goods = goods
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      }
    },
    created() {
      this.getGoodsData(1)
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
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
