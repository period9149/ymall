<template>
  <div class="addressEdit">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" title="编辑收货地址"/>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      :show-delete="!addOrUpdate"
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import { areaList } from '../../assets/areaList.js'

export default {
  data() {
    return {
      userid: '',
      areaList: areaList,
      searchResult: [],
      addressInfo: {},
      addOrUpdate: true
    };
  },
  methods: {
    onSave(content) {
      var address = {
        addressId: content.id,
        addressUser: this.userId,
        addressReceiver: content.name,
        addressPhone: content.tel,
        addressProvince: content.province,
        addressCity: content.city,
        addressCounty: content.county,
        addressDetail: content.addressDetail,
        addressCode: content.postalCode, 
        addressIsdefault: content.isDefault == true ? 1 : 0
      }
      this.$http.post('/addresses/edit', address)
      if(this.addOrUpdate == true){
        this.$toast.success('添加成功！')
      }else{
        this.$toast.success('修改成功！')
      }
      this.$router.push('/addressList/' + this.userId)
    },
    async onDelete() {
      await this.$http.post('/addresses/delete', { "addressId" : this.addressInfo.id })
      this.$toast.success('删除成功！')
      this.$router.push('/addressList/' + this.userId)
    },
    onClickLeft(){
      this.$router.push('/addressList/' + this.userId)
    },
    async initAddressInfo(){
      const path = this.$router.currentRoute.name
      // 如果是修改 那就把数据加载出来
      if(path == 'AddressEdit'){
        this.addOrUpdate = false
        const res = await this.$http.get('/addresses/' + this.$router.currentRoute.params.id)
        const temp = res.data.data
        const addressInfo = {
          id: temp.addressId,
          name: temp.addressReceiver,
          tel: temp.addressPhone,
          province: temp.addressProvince,
          city: temp.addressCity,
          county: temp.addressCounty,
          addressDetail: temp.addressDetail,
          areaCode: '',
          postalCode: temp.addressCode
        }
        for(var j in areaList.city_list){
          var cityCode = ''
          if(areaList.city_list[j] == addressInfo.city){
            cityCode = j
            break
          }
        }
        for(var i in areaList.county_list){
          if(areaList.county_list[i] == addressInfo.county){
            if(cityCode.substring(0, 4) == i.substring(0, 4)){
              addressInfo.areaCode = i
              break
            }
          } 
        }
        this.addressInfo = addressInfo
      } 
    }
  },
  created() {
    this.initAddressInfo()
    this.userId = this.$store.getters.getUser.userId
  },
};
</script>