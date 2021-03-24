<template>
  <div class="addressEdit">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" title="编辑收货地址"/>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :area-placeholder="addressInfo.province + '/' + addressInfo.city + '/' + addressInfo.county"
      @save="onSave"
    />
  </div>
</template>
<script>
import { areaList } from '../../assets/areaList.js'

export default {
  data() {
    return {
      areaList: areaList,
      searchResult: [],
      addressInfo:{}
    };
  },
  methods: {
    onSave(content) {
      var userId = this.$store.getters.getUser.userId
      var address = {
        addressId: content.id,
        addressUser: userId,
        addressReceiver: content.name,
        addressProvince: content.province,
        addressCity: content.city,
        addressCounty: content.county,
        addressDetail: content.addressDetail,
        addressCode: content.postalCode, 
        addressIsdefault: content.isDefault == true ? 1 : 0
      }
      this.$http.post('/addresses/edit', address)
      this.$toast.success('修改成功！')
      this.$router.push('/addressList/' + userId)
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    async initAddressInfo(){
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
  },
  created() {
    this.initAddressInfo()
  },
};
</script>