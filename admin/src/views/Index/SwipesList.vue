<template>
  <div class="UsersList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>轮播管理</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Table border :columns="columns" :data="swipes"></Table>
      </Content>
    </Layout>
    <Modal v-model="modal" title="修改轮播图" @on-ok="save">
      <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          type="drag"
          action="http://localhost:8081/upload"
          style="display: inline-block; width: 300px; height: 120px; margin-left: 92.5px; margin-top: 5px;"
          >
          <img v-if="swipeEdit.swipeImage" :src="swipeEdit.swipeImage" class="avatar" style="height: 120px; width: 300px; ">                 
          <div style="width: 300px; height: 120px; line-height: 58px;" v-else>
            <Icon type="ios-camera" size="20"></Icon>
          </div>
      </Upload>
    </Modal>    
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: 'ID',
            key: 'swipeId'
          },
          {
            title: '轮播图预览',
            key: 'swipeImage',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.swipeImage
                  },
                  style: {
                    width: '300px',
                    height: '120px',
                    marginTop: '5px'
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
                    type: 'primary',
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
        swipes: [],
        modal: false,
        swipeEdit:{
          swipeId: '',
          swipeImage: ''
        }
      }
    },
    methods: {
      async getSwipesData(){
        const res = await this.$http.get('/swipes/all')
        this.swipes = res.data.data
      },
      async remove (index) {
        console.log(this.swipes[index].swipeId)
        await this.$http.post('/swipes/delete', { "swipeId" : this.swipes[index].swipeId })
        this.getSwipesData()
        this.$Message.success('删除成功！');
      },
      show(index){
        this.modal = true
        this.swipeEdit.swipeId = this.swipes[index].swipeId
        this.swipeEdit.swipeImage = this.swipes[index].swipeImage
      },
      handleSuccess (res) {
        this.swipeEdit.swipeImage = process.env.VUE_APP_API_URL + '/' + res
        this.$Message.success('图片上传成功！');
      },
      async save(){
        const res = await this.$http.post('/swipes/edit', this.swipeEdit)
        this.$Message.success(res.data.msg)
        this.getSwipesData()
      }
    },
    created() {
      this.getSwipesData()
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

