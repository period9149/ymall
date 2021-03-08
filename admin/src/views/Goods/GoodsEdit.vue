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
        <Form :model="productEdit" label-position="left" :label-width="100" style="margin: 10px 20px; width: 30rem">
          <FormItem label="商品名称">
            <Input v-model="productEdit.productTitle" />
          </FormItem>
          <FormItem label="商品类别">
            <Input v-model="productEdit.productCategory" />
          </FormItem>
          <FormItem label="商品成本">
            <Input v-model="productEdit.productCost" />
          </FormItem>          
          <FormItem label="商品售价">
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
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>      
          </FormItem>
          <FormItem label="商品详情">
            <Input v-model="productEdit.productDetails" type="textarea"/>
          </FormItem>        
          <FormItem label="商品销量">
            <Input v-model="productEdit.productSold"/>
          </FormItem>   
          <FormItem>
            <Button type="primary">提交</Button>
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
    return {
      productEdit:{
        productTitle: '',
        productCategory: '',
        productCost: '',
        productPrice: '',
        productDetails: '',
        productImage: '',
        productSold: ''
      },
      addOrUpdate: true,
      imgName: '',
      visible: false,
    }
  },
  methods: {
    async getAddOrUpdate(){
      this.addOrUpdate = this.$router.currentRoute.name == 'goodsAdd'
      if(!this.addOrUpdate){
        let productId = this.$router.currentRoute.params.id
        const res = await this.$http.get('/products/' + productId)
        this.productEdit = res.data.data
      }
    },
    handleSuccess (res) {
      this.productEdit.productImage = res
      console.log(this.productEdit)
    },
  },
  created() {
    this.getAddOrUpdate()
  },
}
</script>
<style>

</style>