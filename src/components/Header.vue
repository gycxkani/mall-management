<template>
  <div class="header">
    <span class="logo"> 商城后台管理系统 </span>
    <el-icon class="icon">
      <Fold />
    </el-icon>
    <div class="f_right">
      <el-tooltip
        class="box-item"
        :enterable="false"
        effect="dark"
        content="刷新"
        placement="bottom"
      >
        <el-icon class="icon">
          <Refresh @click="refreshHandle" />
        </el-icon>
      </el-tooltip>

      <el-tooltip
        v-if="!isFullscreen"
        class="box-item"
        :enterable="false"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <el-icon class="icon">
          <FullScreen @click="toggle" />
        </el-icon>
      </el-tooltip>

      <el-tooltip
        v-else
        class="box-item"
        :enterable="false"
        effect="dark"
        content="退出全屏"
        placement="bottom"
      >
        <el-icon class="icon">
          <SwitchButton @click="toggle" />
        </el-icon>
      </el-tooltip>

      <el-dropdown>
        <span>
          <el-avatar :size="30" :src="$store.state.userInfo.avatar" />
          {{ $store.state.userInfo.username }}
          <el-icon class="el-icon--right" style="margin-left: 10px">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {
  FullScreen,
  Refresh,
  ArrowDown,
  Fold,
  SwitchButton,
} from "@element-plus/icons-vue";

//全屏方法
import { useFullscreen } from "@vueuse/core";
const { isFullscreen, toggle } = useFullscreen();

//页面刷新方法
const refreshHandle = () => {
  location.reload();
};


</script>

<style lang="less" scoped>
.header {
  height: 100%;
  display: flex;
  color: #fff;
  align-items: center;

  .f_right {
    margin-left: auto;
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 20px;

    .el-dropdown {
      margin-left: 20px;
      color: #fff;
      cursor: pointer;

      span {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }
      }
    }
  }

  .logo {
    font-size: 18px;
    padding-right: 16px;
  }

  .icon {
    width: 30px;
    height: 100%;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
  }

  .icon:hover {
    background: #065327;
  }
}
</style>
