<template>
  <div class="coupon">
    <van-nav-bar title="优惠券" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-coupon-list
      class="mt-2"
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      :show-close-button="false"
      @change="onChange"
      @exchange="onExchange"
    />
  </div>
</template>
<script>
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};
export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      console.log(code)
      this.coupons.push(coupon);
    },
    onClickLeft(){
      this.$router.push('/user')
    },
  }, 
}
</script>

