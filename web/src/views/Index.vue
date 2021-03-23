<template>
  <div class="index">
    <van-nav-bar title="YMALL电子商城"/>
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item icon="photo-o" text="精选" />
      <van-grid-item icon="photo-o" text="招牌" />
      <van-grid-item icon="photo-o" text="折扣" />
      <van-grid-item icon="photo-o" text="上新" />
    </van-grid>
    <van-swipe-cell>
      <van-card
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-swipe-cell>
    <van-swipe-cell>
      <van-card
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-swipe-cell>
    <van-swipe-cell>
      <van-card
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-swipe-cell>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
      value: ''
    }
  },
}
</script>
<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .goods-card {
    margin: 0;
    background-color: @white;
  }
</style>
