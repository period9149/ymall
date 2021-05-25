<template>
  <div class="about">
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-search
      v-model="keywords"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="getResults()"
    />
    <div v-if="this.results.length !== 0">
      <van-card
        v-for="(item, index) in results"
        :key="index"
        :price="item.product_price"
        :title="item.product_title"
        :thumb="item.product_image"
        @click="toDetails(item.product_id)"
      >
      </van-card>
    </div>
    <div v-else>
      <van-empty image="search" description="没有相关商品" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Serach',
  data() {
    return {
      keywords: '',
      results:[]
    }
  },
  methods: {
    toDetails(id){
      this.$router.push('/productDetail/' + id)
    },
    onClickLeft(){
      this.$router.push('/')
    },
    async getResults(){
      const res = await this.$http.get('/searchProduct?info=' + this.keywords)
      this.results = res.data.data
    }
  },
  created() {
    this.keywords = this.$router.currentRoute.query.info
    this.getResults()
  },
}
</script>
