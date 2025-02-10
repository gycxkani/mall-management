<template>
  <div>{{ $store.state.userInfo.username }}</div>
  <div>
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRoute();
const store = useStore();
// 退出登录方法
const logout = async () => {
  const res = await ElMessageBox.confirm("确定退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).catch((err) => {
    return err;
  });
  console.log(res);
  if (res == "confirm") {
    // 清空本地存储
    window.sessionStorage.removeItem("token");
    // 清空vuex中的用户信息
    store.commit("setUserInfo", {});
    // 跳转到登录页
    router.push({ path: "/login" });
  }
};
</script>

<style lang="less" scoped>

</style>
