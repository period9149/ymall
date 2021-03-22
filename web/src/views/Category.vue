<template>
  <div class="category">
    <van-nav-bar title="分类"/>
    <van-tree-select height="100vh" :items="items" :main-active-index.sync="active">
      <template #content>
        <van-card
          price="2.00"
          desc="描述信息"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        >
        </van-card> 
      </template>
    </van-tree-select>
  </div>
</template>

<script>

export default {
  name: 'Category',
  data() {
    return {
      active: 0,
      items: [{ text: '分组 1' }, { text: '分组 2' }],
    }
  },
}
</script>