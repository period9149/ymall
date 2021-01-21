<template>
  <div class="GoodsList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Goods</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <div style="margin-bottom: 10px;">
          <Button type="primary" icon="md-add" @click="add">添加商品</Button>
          <Input suffix="ios-search" placeholder="请输入..." style="width: auto; margin-bottom: 10px; position: absolute; right: 50px;" />
        </div>
        <Table border :columns="columns" :data="goods"></Table>
        <Page :total="100" show-elevator align="center" style="margin-top: 10px;"/>
      </Content>
      <!-- 修改商品 开始 -->
      <Modal
        v-model="updateModal"
        title="修改商品"
        @on-ok="submitUpdate">
        <Form :model="updateGoods" label-position="left" :label-width="100" style="margin: 10px 20px;">
          <FormItem label="ID">
            <Input v-model="updateGoods.product_id" disabled/>
          </FormItem>
          <FormItem label="商品名称">
            <Input v-model="updateGoods.product_title" />
          </FormItem>
          <FormItem label="商品类别">
            <Input v-model="updateGoods.product_category" />
          </FormItem>
          <FormItem label="商品成本">
            <Input v-model="updateGoods.product_cost" />
          </FormItem>          
          <FormItem label="商品售价">
            <Input v-model="updateGoods.product_price" />
          </FormItem>
          <FormItem label="商品图片">
            <div class="demo-upload-list" v-for="item in uploadList" :key="item.name">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block; width: 58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>            
          </FormItem>          
          <FormItem label="商品详情">
            <Input v-model="updateGoods.product_details" type="textarea"/>
          </FormItem>
          <FormItem label="商品销量">
            <Input v-model="updateGoods.product_sold"/>
          </FormItem>                   
        </Form>
      </Modal>
      <!-- 修改商品 结束 -->
      <!-- 增加商品 开始 -->
      <Modal
        v-model="addModal"
        title="添加商品"
        @on-ok="submitAdd">
        <Form :model="addGoods" label-position="left" :label-width="100" style="margin: 10px 20px;">
          <FormItem label="商品名称">
            <Input v-model="addGoods.product_title" />
          </FormItem>
          <FormItem label="商品类别">
            <Input v-model="addGoods.product_category" />
          </FormItem>
          <FormItem label="商品成本">
            <Input v-model="addGoods.product_cost" />
          </FormItem>          
          <FormItem label="商品售价">
            <Input v-model="addGoods.product_price" />
          </FormItem>
          <FormItem label="商品图片">
            <div class="demo-upload-list" v-for="item in uploadList" :key="item.name">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block; width: 58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>         
          </FormItem>          
          <FormItem label="商品详情">
            <Input v-model="addGoods.product_details" type="textarea"/>
          </FormItem>
          <FormItem label="商品销量">
            <Input v-model="addGoods.product_sold"/>
          </FormItem>                   
        </Form>        
      </Modal>
      <!-- 增加商品 结束 -->
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
        goods: [], // 商品列表
        updateGoods:{

        },
        addGoods:{
          product_title: '',
          product_category: '',
          product_cost: '',
          product_price: '',
          product_image: '',
          product_details: '',
          product_sold: ''
        },
        updateModal: false, // 修改商品
        addModal: false, // 添加商品
        defaultList: [
          // {
          //   'name': 'a42bdcc1178e62b4694c830f028db5c0',
          //   'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          // },
          // {
          //   'name': 'bc7521e033abdd1e92222d733590f104',
          //   'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          // }
      ],
        imgName: '',
        visible: false, // 商品图片
        uploadList: [],
      }
    },
    methods: {
      show (index) {
        // 根据id去找相应信息
        this.updateGoods = this.goods[index]
        this.$Modal.info({
          title: '商品信息',
          content: `
            <p class='info'>ID：${this.updateGoods.product_id}</p>
            <p class='info'>商品名称：${this.updateGoods.product_title}</p>
            <p class='info'>商品类别：${this.updateGoods.product_category}</p>
            <p class='info'>商品成本：${this.updateGoods.product_cost}</p>
            <p class='info'>商品售价：${this.updateGoods.product_price}</p>
            <p class='info'>商品图片：</p>
            <img src='${this.updateGoods.product_image}' class='infoImg'>
            <p class='info'>商品详情：${this.updateGoods.product_details}</p>
            <p class='info'>商品销量：${this.updateGoods.product_sold}</p>
          `
        })
      },
      update (index) {
        this.updateGoods = this.goods[index]
        this.updateModal = true
      },
      remove (index) {
        this.goods.splice(index, 1);
      },
      add () {
        this.addModal = true
      },
      getUsersData(){
        var goods = [
          {
            product_id: '30001',
            product_title: 'iPhone 7',
            product_category: '手机',
            product_cost: '3800',
            product_price: '4000',
            product_image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1531422177,3663112520&fm=26&gp=0.jpg',
            product_details: '测试用数据',
            product_sold: '测试用数据'
          },
          {
            product_id: '30002',
            product_title: 'MacBook Pro 13英寸',
            product_category: '电脑',
            product_cost: '9800',
            product_price: '10000',
            product_image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607267487956&di=a9064e0cedafb0ffa64e5a4e5da7fe41&imgtype=0&src=http%3A%2F%2F2.zol-img.com.cn%2Fproduct%2F200_640x2000%2F156%2FceqGYae3II.jpg',
            product_details: '测试用数据',
            product_sold: '测试用数据'
          }
        ]
        this.goods = goods
      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        console.log(res.url)
        // this.updateGoods.product_image = res.url
        file.url = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1531422177,3663112520&fm=26&gp=0.jpg';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 1;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to 1 pictures can be uploaded.'
          });
        }
        return check;
      },
      submitUpdate(){
        console.log(this.updateGoods)
      },
      submitAdd(){
        console.log(this.addGoods)
      }       
    },
    created() {
      this.getUsersData()
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
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