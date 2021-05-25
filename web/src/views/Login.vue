<template>
  <div class="login">
    <van-nav-bar
      title="智慧畜牧养殖在线物质平台"
      left-arrow
      @click-left="onClickLeft"
      class="mb-2"
    />
    <van-tabs v-model="active">
      <van-tab title="登录" name="a">
        <van-form @submit="login">
          <van-field
            v-model="loginInfo.userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginInfo.userPassword"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="注册" name="b">
        <van-form @submit="onSubmit" class="mt-3">
          <van-field
            v-model="signUpInfo.userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="signUpInfo.userPassword"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="signUpInfo.userPhone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
          />
          <van-field name="radio" label="单选框">
            <template #input>
              <van-radio-group v-model="signUpInfo.userSex" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="uploader" label="头像">
            <template #input>
              <van-uploader v-model="avatars" max-count="1"/>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="signUp">注册</van-button>
          </div>
        </van-form>        
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 'a',
      loginInfo: {
        userName: '',
        userPassword: ''
      },
      signUpInfo:{
        userName: '',
        userPassword: '',
        userPhone: '',
        userSex: 1,
        userAvatar: '',
      },
      avatars: []
    }
  },
  methods: {
    async login(){
      try{
        const res = await this.$http.post('login', this.loginInfo)
        const token = res.headers.authorization
        this.$store.commit("setToken", token)
        this.$store.commit("setUserInfo", res.data.data)
        this.$toast.success('登录成功！');
        this.$router.push('/user') 
      }catch(err){
        console.log(err)
      }
    },
    signUp(){
      console.log(this.avatars)
    },
    onSubmit() {
      console.log(this.signUpInfo)
    },
    onClickLeft(){
      this.$router.push('/user')
    }
  },
}
</script>
