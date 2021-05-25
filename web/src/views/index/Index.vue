<template>
  <div class="index">
    <van-nav-bar title="智慧畜牧养殖在线物质平台"/>
    <van-search
      v-model="keywords"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swipes" :key="index">
        <img class="swipe" :src="item.swipeImage">
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item icon="hot" text="热卖"/>
      <van-grid-item icon="youzan-shield" text="招牌"/>
      <van-grid-item icon="gem" text="折扣"/>
      <van-grid-item icon="new-arrival" text="上新"/>
    </van-grid>
    <div class="cardsList px-3">
      <div v-for="(item, index) in products" :key="index" class="card my-2 bg-light" @click="toDetail(item.productId)">
        <img :src="item.productImage" style="width: 100%; height: 180px;">
        <h3 class="ml-2">{{ item.productTitle }}</h3>
        <h4 class="ml-2 text-red">￥{{ item.productPrice * item.productSale / 100 }}</h4>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      keywords: '',
      products: [],
      swipes:[]
    }
  },
  methods: {
    async getProducts(){
      const res = await this.$http.get('/products?currentPage='+ 1)
      this.products = res.data.data.records
    },
    async getSwipes(){
      const res = await this.$http.get('/swipes/all')
      this.swipes = res.data.data
    },
    toDetail(id){
      this.$router.push('/productDetail/' + id)
    },
    async onSearch(){
      this.$router.push('/search?info=' + this.keywords)

    }
  },
  created() {
    this.getProducts()
    this.getSwipes()
  },
}
</script>
<style scoped lang="scss">
  .swipe{
    width: 100%;
    height: 150px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .cardsList{
    display: grid;
    grid-template-columns: repeat(2, 52%);
    .card{
      height: 250px;
      width: 170px;
      border-radius: 10px;
    }
  }
</style>
