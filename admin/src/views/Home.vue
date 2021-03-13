<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-menu">
            <div class="layout-logo" style="flex: 1">
              <span>YMALL 后台管理系统</span>
            </div>
            <div>    
              <Poptip trigger="hover" :title=" '你好，' + adminInfo.userName + ' !'">
                <img :src="adminInfo.userAvatar" class="layout-avatar">  
                <div slot="content">
                  <a @click="logout">退出登录</a>
                </div>
              </Poptip>
            </div>          
          </div>
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
              <MenuItem name="2-1" to="/goodsCategory">分类管理</MenuItem>
              <MenuItem name="2-2" to="/goodsList">商品列表</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="md-clipboard"></Icon>
                订单管理
              </template>
              <MenuItem name="3-1" to="/orderList">订单列表</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="md-stats"></Icon>
                统计分析
              </template>
              <MenuItem name="4-1" to="/statistics">用户分布</MenuItem>
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
    data(){
      return{
        adminInfo:{}
      }
    },
    methods:{
      getAdminInfo(){
        this.adminInfo = this.$store.getters.getUser
      },
      async logout(){
        
        this.$store.commit('removeInfo')
        this.$router.push('/login')
      }
    },
    created(){
      this.getAdminInfo()
    }
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
  .layout-menu{
    display: flex; 
    align-items: center;
  }
  .layout-logo{
    flex: 1;
    color:white; 
    font-size: 20px;
  }
  .layout-avatar{
    height: 30px; 
    width: 30px; 
    vertical-align: middle;
  }
</style>

