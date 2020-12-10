<template>
  <div class="GoodsCategory">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>GoodsCategory</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <div style="margin-bottom: 10px;">
          <Button type="primary" icon="md-add" @click="add">添加分类</Button>
          <Input suffix="ios-search" placeholder="请输入..." style="width: auto; margin-bottom: 10px; position: absolute; right: 50px;" />
        </div>
        <Table border :columns="columns" :data="categories"></Table>
        <Page :total="100" show-elevator align="center" style="margin-top: 10px;"/>
        <Modal
          v-model="updateModal"
          title="修改商品分类"
          @on-ok="submitUpdate">
          <Form :model="updateCategory" label-position="left" :label-width="100" style="margin: 10px 20px;">
            <FormItem label="ID">
              <Input v-model="updateCategory.category_id" disabled/>
            </FormItem>
            <FormItem label="商品分类名">
              <Input v-model="updateCategory.category_name" />
            </FormItem>
          </Form>
        </Modal>
        <Modal
          v-model="addModal"
          title="增加商品分类"
          @on-ok="submitAdd">
          <Form :model="addCategory" label-position="left" :label-width="100" style="margin: 10px 20px;">
            <FormItem label="商品分类名">
              <Input v-model="addCategory.category_name" />
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
            key: 'category_id'
          },
          {
            title: '商品分类名',
            key: 'category_name'
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
        categories: [],
        updateCategory: {},
        addCategory:{
          category_name: ''
        },
        updateModal: false,
        addModal: false
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '分类信息',
          content: `
            <p class='info'>ID：${this.categories[index].category_id}</p>
            <p class='info'>用户名：${this.categories[index].category_name}</p>
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
      submitUpdate () {
        console.log(this.updateCategory)
      },
      submitAdd(){
        console.log(this.addCategory)
      },
      remove (index) {
        this.categories.splice(index, 1);
      },
      getcategoryData(){
        var categories = [
          {
            category_id: '20001',
            category_name: '手机'
          },
          {
            category_id: '20002',
            category_name: '电脑'
          },          
        ]
        this.categories = categories
      }
    },
    created() {
      this.getcategoryData()
    }
  }
</script>
<style>
  .info{
    margin: 20px;
  }
</style>