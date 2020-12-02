<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">YMALL 后台管理系统</div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-contact"></Icon>
                用户管理
              </template>
              <MenuItem name="1-1" to="/usersList">用户列表</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="md-appstore"></Icon>
                商品管理
              </template>
              <MenuItem name="2-1">分类管理</MenuItem>
              <MenuItem name="2-2" to="/goodsList">商品列表</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="md-clipboard"></Icon>
                订单管理
              </template>
              <MenuItem name="3-1" to="/orderList">订单列表</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <router-view/>
        </Layout>
      </Layout>
    </Layout>
    </div>
</template>
<script>
  export default {
      
  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    color:white; 
    font-size: 20px;
  }
</style>

