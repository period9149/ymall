<template>
  <div class="addressList">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" title="我的收货地址"/>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: []
    };
  },
  methods: {
    onAdd() {
      this.$router.push('/addressAdd')
    },
    onEdit(item, index) {
      this.$router.push('/addressEdit/' + this.list[index].id)
    },
    onClickLeft(){
      this.$router.push('/user')
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
    }
  },
  created() {
    this.getUserAddresses()
  },
};
</script>