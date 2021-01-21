<template>
  <div class="login">
    <div class="signupform">
      <div class="container">
        <!-- main content -->
        <div class="agile_info">
          <div class="w3l_form">
            <div class="left_grid_info">
              <h1>欢迎使用</h1>
              <h1>YMALL后台管理系统</h1>
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
                <input
                  type="text"
                  placeholder="请输入用户名..."
                  v-model="userData.user_name"
                />
              </div>
              <label>密码</label>
              <div class="input-group">
                <span class="fa fa-lock" aria-hidden="true"></span>
                <input
                  type="Password"
                  placeholder="请输入密码..."
                  v-model="userData.user_password"
                />
              </div>
              <div class="login-check">
                <label class="checkbox">
                  <input type="checkbox" name="checkbox" checked="" /><i> </i>
                  记住密码
                </label>
              </div>
              <button class="btn btn-danger btn-block" @click="login()">
                Login
              </button>
            </Form>
            <p class="account">
              <a href="#">忘记密码？</a>
            </p>
          </div>
        </div>
        <!-- //main content -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        user_name: "",
        user_password: "",
      },
    };
  },
  methods: {
    login() {
      console.log(this.userData);
    },
  },
};
</script>
<style>
@import url(../../assets/style/style.css);
</style>
