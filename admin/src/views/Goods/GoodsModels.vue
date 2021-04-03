<template>
  <div class="goodsModels">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem to="/goodsList">商品列表</BreadcrumbItem>
        <BreadcrumbItem :to="prev">修改商品</BreadcrumbItem>
        <BreadcrumbItem>商品型号</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Button type="primary" icon="md-add" @click="add" style="margin: 8px 0;">添加型号</Button>
        <Table border :columns="columns" :data="models"></Table>
      </Content>
    </Layout>
    <Modal
      v-model="updateShow"
      title="修改型号"
      @on-ok="submitUpdate">
      <Form :model="updateModel" label-position="left" :label-width="100" style="margin: 10px 20px;">
        <FormItem label="ID">
          <Input v-model="updateModel.modelId" disabled/>
        </FormItem>
        <FormItem label="型号名">
          <Input v-model="updateModel.modelContent" />
        </FormItem>
        <FormItem label="价格">
          <Input v-model="updateModel.modelPrice" />
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="addShow"
      title="添加型号"
      @on-ok="submitAdd">
      <Form :model="addModel" label-position="left" :label-width="100" style="margin: 10px 20px;">
        <FormItem label="型号名">
          <Input v-model="addModel.modelContent" />
        </FormItem>
        <FormItem label="价格">
          <Input v-model="addModel.modelPrice" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
const id = location.hash.split('/')[2]
export default {
  data() {
    return {
      models: [],
      columns: [
          {
            title: 'ID',
            key: 'model_id'
          },
          {
            title: '型号内容',
            key: 'model_content',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.model_content)
              ]);
            }
          },
          {
            title: '价格',
            key: 'model_price'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
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
      updateModel: {
        modelId: '',
        modelContent: '',
        modelPrice: ''
      },
      updateShow: false,
      addModel: {
        modelProduct: id,
        modelContent: '',
        modelPrice: ''
      },
      addShow: false,
      prev: '/goodsUpdate/' + id
    }
  },
  methods: {
    async getModelsByProductId(){
      const res = await this.$http.get('/searchModelsByProductId?productId=' + id)
      this.models = res.data.data
    },
    async submitEdit(modelInfo){
      const res = await this.$http.post('/models/edit', modelInfo)
      this.$Message.success(res.data.msg)
      this.getModelsByProductId()
    },
    update(index){
      this.updateModel = {
        modelId: this.models[index].model_id,
        modelContent: this.models[index].model_content,
        modelPrice: this.models[index].model_price
      }
      this.updateShow = true
    },
    submitUpdate(){
      this.submitEdit(this.updateModel)
    },
    add(){
      this.addShow = true
    },
    submitAdd(){     
      this.submitEdit(this.addModel)
      this.addModel.modelContent = ''
      this.addModel.modelPrice = ''
    },
    async remove(index) {
      await this.$http.post('/models/delete', { "modelId" : this.models[index].model_id }) 
      this.$Message.success('删除成功！')
      this.getModelsByProductId()
    },
  },
  created() {
    this.getModelsByProductId()
  },
}
</script>
