<template>
  <div class="UsersList">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>用户列表</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <Input suffix="ios-search" v-model="info" search @on-change="search" placeholder="请输入..." style="width: auto; margin-bottom: 10px;" />
        <Table border :columns="columns" :data="users"></Table>
        <Page :total="total" :current="page" :page-size="pageSize" @on-change="getUsersData" align="center" style="margin-top: 10px;"/>
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
            key: 'userId'
          },
          {
            title: '用户名',
            key: 'userName',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.userName)
              ]);
            }
          },
          {
            title: '性别',
            key: 'userSex'
          },
          {
            title: '手机号',
            key: 'userPhone'
          },
          {
            title: '头像',
            key: 'userAvatar',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.userAvatar
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
                }, '详情'),
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
                }, '删除')
                ]);
            }
          }
        ],
        users: [],
        page: 1,
        pageSize: 10,
        total: 0,
        info: ''
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `
            <p class='info'>ID：${this.users[index].userId}</p>
            <p class='info'>用户名：${this.users[index].userName}</p>
            <p class='info'>性别：${this.users[index].userSex}</p>
            <p class='info'>手机号：${this.users[index].userPhone}</p>
            <p class='info'>头像：</p>
            <img src='${this.users[index].userAvatar}' class='infoImg'>
            <p class='info'>用户类别：${this.users[index].userAdmin}</p>
          `
        })
      },
      async remove (index) {
        await this.$http.post('/users/delete', { "userId" : this.users[index].userId })
        this.getUsersData(this.page)
        this.$Message.success('删除成功！');
      },
      async getUsersData(page){
        const res = await this.$http.get('/users?currentPage='+ page)
        const users = res.data.data.records
        users.map(user => {
          user.userSex = user.userSex == 1 ? '男' : '女'
          user.userAdmin = user.userAdmin == 1 ? '系统管理员' : '普通用户'
        })
        this.users = users
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      },
      async search(){
        const res = await this.$http.get('/searchUser?info='+ this.info)
        const users = res.data.data.records
        users.map(user => {
          user.userSex = user.userSex == 1 ? '男' : '女'
          user.userAdmin = user.userAdmin == 1 ? '系统管理员' : '普通用户'
        })
        this.users = users
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
      }
    },
    created() {
      this.getUsersData(1)
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
