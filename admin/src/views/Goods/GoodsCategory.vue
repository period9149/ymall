<template>
  <div class="GoodsCategory">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>商品分类列表</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <div style="margin-bottom: 10px;">
          <Button type="primary" icon="md-add" @click="add">添加分类</Button>
          <Input suffix="ios-search" v-model="info" search @on-change="search" placeholder="请输入..." style="width: auto; margin-bottom: 10px; position: absolute; right: 50px;" />
        </div>
        <Table border :columns="columns" :data="categories"></Table>
        <Page :total="total" :current="page" :page-size="pageSize" @on-change="getCategoryData" show-elevator align="center" style="margin-top: 10px;"/>
        <Modal
          v-model="updateModal"
          title="修改商品分类"
          @on-ok="submitUpdate">
          <Form :model="updateCategory" label-position="left" :label-width="100" style="margin: 10px 20px;">
            <FormItem label="ID">
              <Input v-model="updateCategory.categoryId" disabled/>
            </FormItem>
            <FormItem label="商品分类名">
              <Input v-model="updateCategory.categoryName" />
            </FormItem>
          </Form>
        </Modal>
        <Modal
          v-model="addModal"
          title="增加商品分类"
          @on-ok="submitAdd">
          <Form :model="addCategory" label-position="left" :label-width="100" style="margin: 10px 20px;">
            <FormItem label="商品分类名">
              <Input v-model="addCategory.categoryName" />
            </FormItem>
          </Form>
        </Modal>        
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
            key: 'categoryId'
          },
          {
            title: '商品分类名',
            key: 'categoryName'
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
        categories: [],
        updateCategory: {
          categoryId: '',
          categoryName: ''
        },
        addCategory:{
          categoryName: ''
        },
        updateModal: false,
        addModal: false,
        page: 1,
        pageSize: 10,
        total: 0,
        info: ''
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '分类信息',
          content: `
            <p class='info'>ID：${this.categories[index].categoryId}</p>
            <p class='info'>商品分类名：${this.categories[index].categoryName}</p>
          `
        })
      },
      update (index) {
        this.updateCategory = this.categories[index]
        this.updateModal = true 
      },
      add (){
        this.addModal = true
      },
      async submitUpdate () {
        await this.$http.post('/categories/edit', this.updateCategory)
        this.getCategoryData(this.page)
        this.$Message.success('修改成功！');
      },
      async submitAdd(){
        await this.$http.post('/categories/edit', this.addCategory)
        this.getCategoryData(this.page)
        this.$Message.success('添加成功！');
      },
      async remove(index) {
        await this.$http.post('/categories/delete', { "categoryId" : this.categories[index].categoryId })
        this.getCategoryData(this.page)
        this.$Message.success('删除成功！');
      },
      async getCategoryData(page){
        const res = await this.$http.get('/categories?currentPage='+ page)
        const categories = res.data.data.records
        this.page = page
        this.categories = categories
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      },
      async search(){
        const res = await this.$http.get('/searchCategory?info='+ this.info)
        const categories = res.data.data.records
        this.categories = categories
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      }
    },
    created() {
      this.getCategoryData(1)
    }
  }
</script>
<style>
  .info{
    margin: 20px;
  }
</style>