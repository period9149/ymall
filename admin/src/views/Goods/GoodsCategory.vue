<template>
  <div class="GoodsCategory">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>GoodsCategory</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Table border :columns="columns" :data="category"></Table>
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
        category: []
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '分类信息',
          content: `
            <p class='info'>ID：${this.category[index].category_id}</p>
            <p class='info'>用户名：${this.category[index].category_name}</p>
          `
        })
      },
      // update (index) {
      //   this.$Modal.info({
      //     title: '分类信息',
      //     content: `
      //       <Form :model="formLeft" label-position="left" :label-width='100">
      //         <FormItem label="ID">
      //             <Input v-model="formLeft.input1" value=""></Input>
      //         </FormItem>
      //         <FormItem label="分类名">
      //             <Input v-model="formLeft.input2" value='${this.category[index].category_name}'></Input>
      //         </FormItem>
      //       </Form>
      //     `
      //   })
      // },
      remove (index) {
        this.category.splice(index, 1);
      },
      getcategoryData(){
        var category = [
          {
            category_id: '20001',
            category_name: '手机'
          }
        ]
        this.category = category
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