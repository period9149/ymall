<template>
  <div class="UsersList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Users</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Input suffix="ios-search" placeholder="请输入..." style="width: auto; margin-bottom: 10px;" />
        <Table border :columns="columns" :data="users"></Table>
        <Page :total="100" show-elevator align="center" style="margin-top: 10px;"/>
      </Content>
    </Layout>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: 'ID',
            key: 'user_id'
          },
          {
            title: '用户名',
            key: 'user_name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.user_name)
              ]);
            }
          },
          {
            title: '性别',
            key: 'user_sex'
          },
          {
            title: '手机号',
            key: 'user_phone'
          },
          {
            title: '头像',
            key: 'user_avatar',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.user_avatar
                  },
                  style: {
                    width: '60px',
                    height: '60px'
                  }
                })
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, 'View'),
                // h('Button', {
                //   props: {
                //     type: 'primary',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px'
                //   },
                //   on: {
                //     click: () => {
                //       this.update(params.index)
                //     }
                //   }
                // }, 'Update'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
                ]);
            }
          }
        ],
        users: []
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `
            <p class='info'>ID：${this.users[index].user_id}</p>
            <p class='info'>用户名：${this.users[index].user_name}</p>
            <p class='info'>性别：${this.users[index].user_sex}</p>
            <p class='info'>手机号：${this.users[index].user_phone}</p>
            <p class='info'>头像：</p>
            <img src='${this.users[index].user_avatar}' class='infoImg'>
          `
        })
      },
      // update (index) {
      //   this.$Modal.info({
      //     title: '用户信息',
      //     content: `
      //       <p class='info'>ID：${this.users[index].user_id}</p>
      //       <p class='info'>用户名：<Input value='${this.users[index].user_name}'></Input></p>
      //       <p class='info'>性别：<Input value='${this.users[index].user_sex}'></p>
      //       <p class='info'>手机号：<Input value='${this.users[index].user_phone}'></p>
      //       <p class='info'>头像：</p>
      //       <img src='${this.users[index].user_avatar}' class='infoImg'>
      //     `
      //   })
      // },
      remove (index) {
        this.users.splice(index, 1);
      },
      getUsersData(){
        var user = [
          {
            user_id: '10001',
            user_name: 'John Brown',
            user_sex: '男',
            user_phone: '13235758569',
            user_avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2677998198,1166845148&fm=26&gp=0.jpg'
          },
          {
            user_id: '10002',
            user_name: 'kelly Brown',
            user_sex: '女',
            user_phone: '18267559149',
            user_avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1656466399,1422696951&fm=26&gp=0.jpg'
          },
        ]
        this.users = user
      }
    },
    created() {
      this.getUsersData()
    }
  }
</script>
<style>
  .info{
    margin: 20px;
  }
  .infoImg{
    margin-left: 40px;
    height: 100px;
    width: 100px;
  }
</style>
