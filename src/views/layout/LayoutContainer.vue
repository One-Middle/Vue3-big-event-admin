<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores'
import router from '@/router'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

const onCommand = async (command) => {
  console.log('onCommand')
  if (command === 'logout') {
    console.log('退出登录')
    await ElMessageBox.confirm('你确认退出大事件吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.setUser({})
    userStore.setToken({})
    router.push('/login')
  } else {
    console.log(command)
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <!-- <div>manager</div> -->
  <el-container class="layout-containner">
    <el-aside width="200px" class="el-aside">
      <div class="el-aside_icon"></div>
      <el-menu
        :default-active="$route.path"
        router
        class="el-menu"
        background-color="#232323"
        text-color="#fff"
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manager">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="">
        <div>
          黑马程序员：<strong>{{ userStore.user.nickname }}</strong>
        </div>
        <!-- 头像下拉选项 -->
        <el-dropdown @command="onCommand">
          <el-avatar :src="userStore.user.avatar || avatar" />
          <el-icon><CaretBottom /></el-icon>
          <template #dropdown>
            <el-dropdown-item command="profile" :icon="User"
              >基本资料</el-dropdown-item
            >
            <el-dropdown-item command="avatar" :icon="Crop"
              >更换头像</el-dropdown-item
            >
            <el-dropdown-item command="password" :icon="EditPen"
              >重置密码</el-dropdown-item
            >
            <el-dropdown-item command="logout" :icon="SwitchButton"
              >退出登录</el-dropdown-item
            >
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2025 Created by cyz</el-footer>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.layout-containner {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &_icon {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    display: flex;
    background-color: white;
    height: 50px;
    align-items: center;
    justify-content: space-between;
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
