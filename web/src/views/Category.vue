<template>
  <div class="category">
    <van-nav-bar title="分类"/>
    <van-tree-select height="100vh" width="20px" 
    :items="categories" :main-active-index.sync="active"
    @click-nav="getProducts">
      <template #content>
        <div class="bg-light d-flex" v-for="(item, index) in products" :key="index" @click="toDetail(item.product_id)">
          <div class="m-2">
            <img :src="item.product_image" alt="" style="width: 70px; height: 70px;">
          </div>
          <div class="flex-1">
            <h3>{{item.product_title}}</h3>
            <div class="mt-3">
              <span class="text-red">￥{{item.product_price}}</span>
              <s class="text ml-2">￥5.01</s>
              <van-icon name="cart" color="red" size="16px" style="float: right" class="mr-3"/>
            </div>
          </div>
        </div>     
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      active: 0,
      categories: [],
      products: []
    }
  },
  methods: {
    async getCategories(){
      const res = await this.$http.get('/categories')
      let temp = res.data.data.records
      let categories = []
      for(var i in temp){
        var obj = {
          id: '',
          text: ''
        }
        obj.id = temp[i].categoryId
        obj.text = temp[i].categoryName
        categories.push(obj)
      }
      this.categories = categories
      this.getProducts()
    },
    async getProducts(){
      var id = this.categories[this.active].id     
      const res = await this.$http.get('/searchProductInCategory?id=' + id)
      this.products = res.data.data
    },
    toDetail(id){
      this.$router.push('/productDetail/' + id)
    }
  },
  created() {
    this.getCategories()
  }
}
</script>