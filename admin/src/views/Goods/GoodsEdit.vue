<template>
  <div class="goodsEdit">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Goods</BreadcrumbItem>
        <BreadcrumbItem v-if="addOrUpdate">Add</BreadcrumbItem>
        <BreadcrumbItem v-else>Update</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Form :model="productEdit" :rules="ruleValidate" label-position="left" :label-width="100" style="margin: 10px 20px; width: 30rem">
          <FormItem label="商品名称">
            <Input v-model="productEdit.productTitle" />
          </FormItem>
          <FormItem label="商品类别">
            <Select v-model="productEdit.productCategory" style="width:200px">
              <Option v-for="item in categories" :value="item.categoryId" :key="item.categoryId">{{ item.categoryName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商品成本" prop="productCost">
            <Input v-model="productEdit.productCost" />
          </FormItem>          
          <FormItem label="商品售价" prop="productPrice">
            <Input v-model="productEdit.productPrice" />
          </FormItem>
          <FormItem label="商品图片">
            <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                type="drag"
                action="http://localhost:8081/upload"
                style="display: inline-block; width:50 px; height: 50px;"
                >
                <img v-if="productEdit.productImage" :src="productEdit.productImage" class="avatar" style="height: 50px; width: 50px; ">                 
                <div style="width: 58px;height:58px;line-height: 58px;" v-else>
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>      
          </FormItem>
          <FormItem label="商品详情">
            <Input v-model="productEdit.productDetails" type="textarea"/>
          </FormItem>        
          <FormItem label="商品销量" v-if="!addOrUpdate" prop="productSold">
            <Input v-model="productEdit.productSold"/>
          </FormItem>   
          <FormItem>
            <Button type="primary" @click.native="submitEdit">提交</Button>
            <Button style="margin-left: 8px">返回</Button>
          </FormItem>        
        </Form>          
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    const validateisNumber = (rule, value, callback) => {
      if (isNaN(parseInt(value))) {
        callback(new Error('请输入数字'));
      }else{
        callback();
      }
    };
    return {
      productEdit:{
        productTitle: '',
        productCategory: '',
        productCost: 0,
        productPrice: '',
        productDetails: '',
        productImage: '',
        productSold: 0
      },
      categories: [],
      addOrUpdate: true,
      imgName: '',
      visible: false,
      ruleValidate: {
        productCost: [ { validator: validateisNumber, trigger: 'blur' } ],
        productPrice: [ { validator: validateisNumber, trigger: 'blur' } ],
        productSold: [ { validator: validateisNumber, trigger: 'blur' } ],
      }
    }
  },
  methods: {
    async getAddOrUpdate(){
      this.addOrUpdate = this.$router.currentRoute.name == 'goodsAdd'
      if(!this.addOrUpdate){
        let productId = this.$router.currentRoute.params.id
        const res = await this.$http.get('/products/' + productId)
        this.productEdit = res.data.data
        this.productEdit.productId = productId
      }
    },
    handleSuccess (res) {
      this.productEdit.productImage = process.env.VUE_APP_API_URL + '/' + res
      this.$Message.success('商品图片上传成功！');
    },
    async getCategories(){
      const res = await this.$http.get('/categories/all')
      this.categories = res.data.data
    },
    async submitEdit(){
      const res = await this.$http.post('/products/edit', this.productEdit)
      this.$Message.success(res.data.msg)
      this.$router.push('/goodsList')
    }
  },
  created() {
    this.getAddOrUpdate()
    this.getCategories()
  },
}
</script>
<style>

</style>