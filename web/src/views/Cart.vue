<template>
  <div class="cart">
    <van-nav-bar title="购物车"/>
    <van-swipe-cell>
      <van-card
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      >
        <template #footer>
          <van-stepper v-model="value" theme="round" button-size="22" />
        </template>
      </van-card> 
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
    <!-- <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>  -->
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      checked: false,
      value: 1
    }
  },
  methods:{
    onSubmit(){

    }
  }
}
</script>
<style>
  .goods-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%;
  }
</style>