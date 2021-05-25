<template>
  <div>    
    <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="my-3 d-flex ai-center bg-light" style="height: 80px">
      <van-icon name="friends-o" size="40" class="ml-2"/>
      <div class="flex-1 ml-2">
        <p>
          <span class="mr-3">{{ addressDetail.addressReceiver }}</span>
          <span>{{ addressDetail.addressPhone }}</span>
        </p>
        <p>
          {{ addressDetail.addressProvince + addressDetail.addressCity + addressDetail.addressCounty + addressDetail.addressDetail}}
        </p>
      </div>
      <van-popup v-model="show" position="bottom">
        <van-address-list
          v-model="addressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
        />
      </van-popup>
      <van-icon name="arrow" size="30" class="mr-2" @click="showAddressList"/>
    </div>
    <van-card
      class="my-2"
      :price="model.modelPrice"
      :desc="model.modelContent"
      :title="product.productTitle"
      :thumb="product.productImage"
    >
      <template #footer>
        <van-stepper v-model="count" theme="round" button-size="22" />
      </template>
    </van-card>
    <van-submit-bar :price="pay" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      product: {},
      model: {},
      count: 1,
      addressId: '',
      addressDetail: '',
      show: false,
      list: []
    }
  },
  computed:{
    pay(){
      return this.model.modelPrice * this.count * 100
    }
  },
  watch:{
    async addressId(val){
      this.addressDetail = await this.getAddressDetail(val)
    }
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    onSubmit(){
      this.$toast.success('购买成功')
      this.$router.push('/productDetail/' + this.product.productId)
    },
    async getProductInfo(id){
      const res = await this.$http.get('/products/' + id)
      return res.data.data
    },
    async getModelInfo(id){
      const res = await this.$http.get('/models/' + id)
      return res.data.data
    },
    async getInfo(){
      const query = this.$router.currentRoute.query
      this.product = await this.getProductInfo(query.product)
      this.model = await this.getModelInfo(query.model)
      this.count = query.count
    },
    async getAddressDetail(id){
      const res = await this.$http.get('/addresses/'+ id)
      return res.data.data
    },
    async getDefaultAddress(){
      const userId = this.$store.getters.getUser.userId
      const res = await this.$http.get('/getDefaultAddress/' + userId)
      this.addressId = res.data.data[0].address_id
      this.addressDetail = await this.getAddressDetail(this.addressId)
    },
    showAddressList(){
      this.show = true
    },
    async getUserAddresses(){
      let userId = this.$store.getters.getUser.userId
      const res = await this.$http.get('/searchAddressByUserId?userId=' + userId)
      let temp = res.data.data
      let list = []
      for(var i in temp){
        var obj = {
          id: temp[i].address_id,
          name: temp[i].address_receiver,
          tel: temp[i].address_phone,
          address: temp[i].address_province + temp[i].address_city + temp[i].address_county + temp[i].address_detail,
          isDefault: temp[i].address_isDefault == 1 ? true : false
        }
        list.push(obj)
      }
      this.list = list
    },
    onAdd() {
      this.$router.push('/addressAdd')
    },
  },
  created(){
    this.getInfo()
    this.getDefaultAddress()
    this.getUserAddresses()
  }
}
</script>
<style lang="">
  
</style>