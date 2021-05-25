<template>
  <div class="login">
    <div class="signupform">
      <div class="container">
        <div class="agile_info">
          <div class="w3l_form">
            <div class="left_grid_info">
              <h1>欢迎使用</h1>
              <h1>智慧畜牧养殖在线物质平台-后台管理系统</h1>
              <p>登录后可使用商品管理，用户管理，订单管理，大数据调查等功能</p>
              <img src="../../assets/data.jpg" alt="你的网不行" />
            </div>
          </div>
          <div class="w3_info">
            <h2>登录您的管理员账号</h2>
            <p>Enter your details to login.</p>
            <Form>
              <label>用户名</label>
              <div class="input-group">
                <span class="fa fa-envelope" aria-hidden="true"></span>
                <input type="text" placeholder="请输入用户名..." v-model="userData.userName"/>
              </div>
              <label>密码</label>
              <div class="input-group">
                <span class="fa fa-lock" aria-hidden="true"></span>
                <input type="Password" placeholder="请输入密码..." v-model="userData.userPassword"/>
              </div>
              <button class="btn btn-danger btn-block" @click="login()">Login</button>
            </Form>
            <p class="account">
              <a href="#">忘记密码？</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        userName: "",
        userPassword: "",
      },
    };
  },
  methods: {
    async login() {
      try{
        const res = await this.$http.post('login', this.userData)
        if(res.data.data.userAdmin == 0){
          this.$Message.error('你不是系统管理员，请使用管理员账号登录！');
        }else{
          const token = res.headers['authorization']
          this.$store.commit("setToken", token)
          this.$store.commit("setUserInfo", res.data.data)
          //console.log(this.$store.state.token, this.$store.state.userInfo)
          this.$Message.success('登录成功！');
          this.$router.push('/usersList')
        }
        console.log(res)
      }catch(err){
        console.log(err)
      }
    },
  },
};
</script>
<style>
@import url(../../assets/style/style.css);
</style>
