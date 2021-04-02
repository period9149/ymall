<template>
  <div class="user">
    <van-nav-bar title="我的"/>
    <div class="userCard bg-white d-flex ai-center" @click="login">
      <div class="userAvatar ml-3">
        <img v-if="userInfo.userAvatar" :src="userInfo.userAvatar" alt="">
        <img v-else src="https://www.baidu.com/link?url=jm9-nHsGZHBrgnuD0mGm8uEH0jFT98i9dUq_DTvVJ4g6dozBmO-mR9h4tBr5g8wNYQJ8CHA5ggvPpjLh7UNusLkiGrde0yeBL57J4uI-OhGr48RHwtUYIQvQHzubbuXnyLBxGafDof2Bi4bexHp99yjGpCBWxTR7PUQh86tPVX9lfjy8C6Fr1ocH11MBSNR_EdNab0ZGyf2-gS7fIHGeH21fDSdGt27bGHj3ZysNvHw09OpwF1ckrMgC87Xxq9_zAroVsmF4FOlHr8HdXA-CJuQyBCivixeRCziVFZKNaYAPVMCwLHI3Sk2ASFDbYe39xgsqjRmS-mLXcBHSRXA2vO1JDSR3m0856HmOnD5TdLZTY0taA3nnnMGNDCoulB8kvRiNwXiNpD4vrdwER7W8MhKYlrZwsSnwgWLbi5wcyzyr_LljXcy-d5MHdyA40CHmnPZ-ll_34B6-HZrcVHnG0BstgiWIRkO39_87WXzoxa9N4GJ0LA669pEgtmIIPfmmiEXoc0W_y9NUs9IZWKApbcPoBZ1JX7j6NIeVwuNa5cTOvvSpco2MAe9UDxpS50DsHwmFdY6ejMbtdjEDBruAIn9rfZtbMFglXGsyyffT5QG&wd=&eqid=d52b8f570007c4a400000006605883c1" alt="">
      </div>
      <div class="userName fs-xl ml-4"> 
        <span v-if="userInfo.userName">{{ userInfo.userName }}</span>
        <span v-else>请先登录/注册！</span>
      </div>
    </div>
    <van-cell title="我的订单" icon="label" class="mt-2">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="arrow-down" class="icon" />
      </template>
    </van-cell>
    <van-grid>
      <van-grid-item icon="cart-circle-o" text="待支付" />
      <van-grid-item icon="gift-o" text="待收货" />
      <van-grid-item icon="smile-comment-o" text="待评价" />
      <van-grid-item icon="cash-back-record" text="收货/退款" />
    </van-grid>
    <van-cell-group class="mt-2">
      <van-cell title="我的优惠券" icon="gold-coin" to="/coupon">
        <template #right-icon>
          <van-icon name="arrow" class="icon" />
        </template>        
      </van-cell>
      <van-cell title="我的收货地址" icon="vip-card" @click="toAddressList()">
        <template #right-icon>
          <van-icon name="arrow" class="icon" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="mt-2">
      <van-cell title="联系客服" icon="phone"></van-cell>
      <van-cell title="意见反馈" icon="comment-circle"></van-cell>
    </van-cell-group>
    <van-cell-group class="mt-2">
      <van-cell title="退出登录" icon="clear" v-if="this.$store.getters.getToken" @click="logout">
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    login(){
      if(JSON.stringify(this.userInfo) == "{}") this.$router.push('/login')
    },
    logout(){
      this.$store.commit('removeInfo')
      this.userInfo = {}
    },
    getUserData(){
      if(this.$store.getters.getToken){
        this.userInfo = this.$store.getters.getUser
      }
    },
    toAddressList(){
      this.$router.push('/addressList/' + this.userInfo.userId)
    }
  },
  created() {
    this.getUserData()
  },
}
</script>
<style lang="scss">
  .userCard{
    height: 120px;
    width: 100%;
    .userAvatar img{
      height: 75px;
      width: 75px;
    }
  }
  .icon {
    font-size: 16px;
    line-height: inherit;
  }
</style>